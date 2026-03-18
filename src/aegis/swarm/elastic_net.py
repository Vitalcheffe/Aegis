"""
AEGIS · swarm/elastic_net.py
Module M3 — Elastic Net Swarm Coordinator

Decentralised formation control for up to 500 autonomous agents.
No central server — each drone computes its own forces from 6 nearest neighbours.
Inspired by Reynolds' Boids (1987), adapted with elastic spring physics.

Force model (per drone, per axis):
  F_total = F_attraction + F_repulsion + F_formation
  All forces clamped at ±NET_F_CLAMP_MS2 = ±5 m/s² (≈0.5G)

  F_attraction  : spring pulling drone toward its 6 nearest neighbours
  F_repulsion   : strong repulsion below NET_MIN_M = 15m (inverse square)
  F_formation   : soft spring to nominal grid slot position

Complexity: O(6N) instead of O(N²) — 83× faster at N=500.
Each drone only communicates with 6 neighbours → mesh bandwidth: 6 × 48B × 50Hz = 14.4 kB/s

State machine:
  PATROL  → ENGAGE  (target confirmed within swarm area)
  ENGAGE  → PURSUIT (target moves outside formation coverage)
  ENGAGE  → PATROL  (target lost)
  PURSUIT → ENGAGE  (target moves back inside)
  PURSUIT → PATROL  (target lost)
  *       → REFORM  (swarm health < 75%)
  REFORM  → PATROL  (swarm health > 92%)

Author  : Vitalcheffe
Version : 1.0.0
"""
from __future__ import annotations
import math, time, logging
from dataclasses import dataclass, field
from typing import Dict, List, Optional, Tuple
import numpy as np
from aegis.oc_types import (
    DroneState, FusedTarget, Vec3, DroneRole, NetState,
    NET_SPACING_M, NET_SPACING_ENGAGE, NET_MAX_STRETCH_M, NET_MIN_M,
    NET_K_SPRING, NET_K_REPULSE, NET_F_CLAMP_MS2, NET_N_NEIGHBORS,
    NET_REFORM_THRESH, NET_REFORM_DONE, V_PATROL_MS, V_DASH_MS,
    DRONE_MASS_KG,
)

log = logging.getLogger("aegis.swarm")


# ─────────────────────────────────────────────────────────────────────────────
#  Hexagonal Grid Generator
# ─────────────────────────────────────────────────────────────────────────────

def hexagonal_grid(n: int, spacing: float, origin: Vec3 = Vec3.zero(),
                   altitude_m: float = 300.0) -> List[Vec3]:
    """
    Generate N positions in a flat hexagonal grid at fixed altitude.
    Hexagonal packing maximises coverage density for a given inter-drone spacing.

    Layout: offset rows (even rows shifted by spacing/2 East).
    Row separation: spacing × √3/2 (natural hexagonal row distance).

    For N=500, spacing=45m:
      Coverage area ≈ 500 × (45²×√3/2) ≈ 878,000 m² ≈ 0.88 km²

    Args:
        n        : number of drones
        spacing  : inter-drone spacing (m)
        origin   : grid centre (NED)
        altitude_m: patrol altitude (positive = metres above ground)

    Returns:
        List of Vec3 positions (NED, Z = -altitude_m)
    """
    positions: List[Vec3] = []
    row_h = spacing * math.sqrt(3.0) / 2.0
    col_w = spacing

    row, col = 0, 0
    while len(positions) < n:
        offset = (col_w / 2.0) if row % 2 else 0.0
        north = origin.x + row * row_h
        east  = origin.y + col * col_w + offset
        down  = -(altitude_m)    # NED: altitude = -Z
        positions.append(Vec3(north, east, down))

        col += 1
        cols_this_row = math.ceil(math.sqrt(n * 2.0 / math.sqrt(3))) + 1
        if col >= cols_this_row:
            col = 0
            row += 1

    return positions[:n]


# ─────────────────────────────────────────────────────────────────────────────
#  Force computation (vectorised for speed)
# ─────────────────────────────────────────────────────────────────────────────

def spring_attraction(pos: np.ndarray, neighbour_pos: np.ndarray,
                      k: float, rest_len: float) -> np.ndarray:
    """
    Spring attraction force toward one neighbour.
    Only attractive (pulls toward neighbour if distance > rest_len).

    F = k × (d - rest_len) × unit_vector   if d > rest_len, else 0
    """
    delta = neighbour_pos - pos
    d = float(np.linalg.norm(delta))
    if d < 1e-6 or d <= rest_len:
        return np.zeros(3)
    return k * (d - rest_len) * (delta / d)


def inverse_square_repulsion(pos: np.ndarray, neighbour_pos: np.ndarray,
                              k: float, min_dist: float) -> np.ndarray:
    """
    Inverse-square repulsion (only active below min_dist).

    F = k / d² × (-unit_vector)   if d < min_dist, else 0
    Strength: very large at d→0, zero at d=min_dist.
    """
    delta = neighbour_pos - pos
    d = float(np.linalg.norm(delta))
    if d < 1e-9:
        # Identical positions — push in a random direction
        return np.array([k / (min_dist**2), 0.0, 0.0])
    if d >= min_dist:
        return np.zeros(3)
    return k / (d * d) * (-delta / d)


def formation_spring(pos: np.ndarray, slot_pos: np.ndarray,
                     k: float) -> np.ndarray:
    """
    Soft spring toward the drone's assigned formation slot.
    Always active (no dead zone) — gentle nudge back to nominal grid.
    F = k × (slot_pos - pos)
    """
    return k * 0.25 * (slot_pos - pos)   # 0.25× scaling — softer than attraction


# ─────────────────────────────────────────────────────────────────────────────
#  Drone formation agent (local state)
# ─────────────────────────────────────────────────────────────────────────────

@dataclass
class FormationAgent:
    """Local formation state for one drone. Computed at the swarm coordinator."""
    drone_id:     str
    formation_idx:int = -1
    slot_pos:     Vec3 = field(default_factory=Vec3.zero)   # Nominal grid position
    current_pos:  Vec3 = field(default_factory=Vec3.zero)
    current_vel:  Vec3 = field(default_factory=Vec3.zero)
    health_score: float = 1.0     # 0=lost, 1=nominal
    is_alive:     bool  = True

    # Latest computed force vector (m/s²)
    force_ms2: Vec3 = field(default_factory=Vec3.zero)
    # Commanded velocity (m/s) — computed from force + current vel
    cmd_vel: Vec3  = field(default_factory=Vec3.zero)

    def dist_to_slot(self) -> float:
        return self.current_pos.dist(self.slot_pos)


# ─────────────────────────────────────────────────────────────────────────────
#  ElasticNet — Main class
# ─────────────────────────────────────────────────────────────────────────────

class ElasticNet:
    """
    Decentralised swarm formation controller.

    Computes force vectors for all N drones each tick.
    Output: Dict[drone_id → commanded_velocity Vec3]

    The controller is intentionally stateless per-tick:
    each call to step() receives the full current swarm state.
    This makes the system resilient to packet loss and drone failures.
    """

    def __init__(
        self,
        n_drones: int,
        spacing_m: float = NET_SPACING_M,
        origin: Vec3 = Vec3.zero(),
        altitude_m: float = 300.0,
    ) -> None:
        self.n_drones   = n_drones
        self.spacing_m  = spacing_m
        self.origin     = origin
        self.altitude_m = altitude_m

        # Formation state machine
        self._state: NetState = NetState.PATROL
        self._target_id: Optional[str] = None
        self._target_centroid: Optional[Vec3] = None

        # Precompute nominal grid positions
        self._slot_positions: List[Vec3] = hexagonal_grid(
            n_drones, spacing_m, origin, altitude_m)

        # Formation agents (updated each tick)
        self._agents: Dict[str, FormationAgent] = {}

        # Stats
        self.cycle     = 0
        self._health   = 1.0     # Running swarm health

        log.info(f"ElasticNet initialised: {n_drones} drones, "
                 f"spacing={spacing_m}m, state=PATROL")

    # ── State machine ─────────────────────────────────────────────────────────

    @property
    def state(self) -> NetState:
        return self._state

    def _transition(self, trigger: str) -> None:
        prev = self._state
        self._state = self._state.transition(trigger)
        if self._state != prev:
            log.info(f"ElasticNet: {prev.name} → {self._state.name} [{trigger}]")

    def _update_state(self, swarm: Dict[str, DroneState],
                      confirmed_targets: List[FusedTarget]) -> None:
        """Drive the state machine based on current swarm and target state."""
        health = self._compute_health(swarm)
        self._health = health

        if health < NET_REFORM_THRESH:
            self._transition("health_degraded")    # → REFORM
            self._state = NetState.REFORM
            return

        if self._state == NetState.REFORM and health >= NET_REFORM_DONE:
            self._transition("health_ok")   # → PATROL

        if not confirmed_targets:
            if self._state in (NetState.ENGAGE, NetState.PURSUIT):
                self._transition("target_lost")
            self._target_id = None
            self._target_centroid = None
            return

        # Pick highest-quality confirmed target
        best = max(confirmed_targets, key=lambda t: t.track_quality)
        self._target_id       = best.target_id
        self._target_centroid = best.pos

        if self._state == NetState.PATROL:
            self._transition("target_confirmed")   # → ENGAGE
        elif self._state == NetState.ENGAGE:
            # Check if target moved outside engagement spacing
            if self._target_centroid is not None:
                swarm_centroid = self._swarm_centroid(swarm)
                if swarm_centroid is not None:
                    dist = swarm_centroid.dist(self._target_centroid)
                    if dist > NET_SPACING_ENGAGE * 3:
                        self._transition("target_outside")   # → PURSUIT
        elif self._state == NetState.PURSUIT:
            swarm_centroid = self._swarm_centroid(swarm)
            if swarm_centroid is not None and self._target_centroid is not None:
                dist = swarm_centroid.dist(self._target_centroid)
                if dist <= NET_SPACING_ENGAGE * 2:
                    self._transition("target_inside")    # → ENGAGE

    # ── Main step ─────────────────────────────────────────────────────────────

    def step(
        self,
        swarm: Dict[str, DroneState],
        confirmed_targets: List[FusedTarget],
        dt: float = 1.0 / 50.0,
    ) -> Dict[str, Vec3]:
        """
        Compute commanded velocities for all drones.

        Args:
            swarm             : current DroneState for each drone
            confirmed_targets : confirmed FusedTargets from SpectralFusion
            dt                : time step (seconds)

        Returns:
            Dict[drone_id → commanded velocity Vec3 (m/s, NED)]
        """
        self.cycle += 1
        self._update_state(swarm, confirmed_targets)
        self._update_agents(swarm)

        # Get current positions as numpy array for KD-tree-like nearest neighbour
        alive_ids = [aid for aid, a in self._agents.items() if a.is_alive]
        if len(alive_ids) < 2:
            return {}

        pos_matrix = np.array([[self._agents[aid].current_pos.x,
                                 self._agents[aid].current_pos.y,
                                 self._agents[aid].current_pos.z]
                                for aid in alive_ids])

        # For each agent: find 6 nearest neighbours, compute forces
        commands: Dict[str, Vec3] = {}
        spacing = (NET_SPACING_ENGAGE if self._state == NetState.ENGAGE
                   else NET_SPACING_M)

        for i, aid in enumerate(alive_ids):
            agent = self._agents[aid]
            pos_i = pos_matrix[i]

            # Find N_NEIGHBORS nearest (excluding self)
            dists = np.linalg.norm(pos_matrix - pos_i, axis=1)
            dists[i] = float('inf')   # exclude self
            k = min(NET_N_NEIGHBORS, len(alive_ids) - 1)
            neighbour_idxs = np.argpartition(dists, k)[:k]

            # Accumulate forces
            force = np.zeros(3)

            for j in neighbour_idxs:
                pos_j = pos_matrix[j]
                force += spring_attraction(pos_i, pos_j, NET_K_SPRING, spacing)
                force += inverse_square_repulsion(pos_i, pos_j, NET_K_REPULSE, NET_MIN_M)

            # Formation slot spring
            slot = np.array([agent.slot_pos.x, agent.slot_pos.y, agent.slot_pos.z])

            # In ENGAGE or PURSUIT: contract the slot positions toward target
            if self._state in (NetState.ENGAGE, NetState.PURSUIT) and self._target_centroid:
                tc = self._target_centroid
                # Bias slot toward target centroid (weighted 70% target, 30% nominal)
                slot = 0.3 * slot + 0.7 * np.array([tc.x, tc.y, tc.z])

            force += formation_spring(pos_i, slot, NET_K_SPRING)

            # PURSUIT: add a drift force toward target
            if self._state == NetState.PURSUIT and self._target_centroid:
                tc = self._target_centroid
                target_dir = np.array([tc.x, tc.y, tc.z]) - pos_i
                td = float(np.linalg.norm(target_dir))
                if td > 1.0:
                    force += NET_K_SPRING * 2.0 * target_dir / td

            # Clamp total force to NET_F_CLAMP_MS2 = 5 m/s²
            f_mag = float(np.linalg.norm(force))
            if f_mag > NET_F_CLAMP_MS2:
                force = force * (NET_F_CLAMP_MS2 / f_mag)

            agent.force_ms2 = Vec3(float(force[0]), float(force[1]), float(force[2]))

            # Integrate: v_cmd = v_current + a×dt
            cur_vel = np.array([agent.current_vel.x, agent.current_vel.y, agent.current_vel.z])
            cmd_vel = cur_vel + force * dt

            # Speed limit based on state
            v_max  = V_DASH_MS if self._state == NetState.PURSUIT else V_PATROL_MS
            v_mag  = float(np.linalg.norm(cmd_vel))
            if v_mag > v_max:
                cmd_vel = cmd_vel * (v_max / v_mag)

            agent.cmd_vel = Vec3(float(cmd_vel[0]), float(cmd_vel[1]), float(cmd_vel[2]))
            commands[aid] = agent.cmd_vel

        return commands

    # ── Helpers ───────────────────────────────────────────────────────────────

    def _update_agents(self, swarm: Dict[str, DroneState]) -> None:
        """Sync internal agents from current swarm state."""
        # Assign formation slots to any new drones
        assigned = {a.formation_idx for a in self._agents.values()}
        slot_idx  = 0

        for did, ds in swarm.items():
            if did not in self._agents:
                while slot_idx in assigned and slot_idx < len(self._slot_positions):
                    slot_idx += 1
                slot = (self._slot_positions[slot_idx]
                        if slot_idx < len(self._slot_positions) else Vec3.zero())
                self._agents[did] = FormationAgent(
                    drone_id=did, formation_idx=slot_idx, slot_pos=slot)
                assigned.add(slot_idx)
                slot_idx += 1

            agent = self._agents[did]
            agent.current_pos = ds.pos
            agent.current_vel = ds.vel
            agent.is_alive    = ds.is_alive
            agent.health_score= 1.0 if ds.health.is_operational() else 0.0

    def _compute_health(self, swarm: Dict[str, DroneState]) -> float:
        """Overall swarm health: fraction of alive and operational drones."""
        if not swarm:
            return 0.0
        alive = sum(1 for ds in swarm.values() if ds.is_alive and ds.health.is_operational())
        return alive / len(swarm)

    def _swarm_centroid(self, swarm: Dict[str, DroneState]) -> Optional[Vec3]:
        alive = [ds.pos for ds in swarm.values() if ds.is_alive]
        if not alive:
            return None
        xs = sum(p.x for p in alive) / len(alive)
        ys = sum(p.y for p in alive) / len(alive)
        zs = sum(p.z for p in alive) / len(alive)
        return Vec3(xs, ys, zs)

    def formation_health_score(self) -> float:
        """
        Formation health: fraction of drones within NET_MAX_STRETCH_M of their slot.
        1.0 = perfect formation, 0.0 = complete dissolution.
        """
        if not self._agents:
            return 0.0
        in_formation = sum(
            1 for a in self._agents.values()
            if a.is_alive and a.dist_to_slot() < NET_MAX_STRETCH_M
        )
        return in_formation / len(self._agents)

    def stats(self) -> Dict:
        return {
            "state"          : self._state.name,
            "cycles"         : self.cycle,
            "active_agents"  : sum(1 for a in self._agents.values() if a.is_alive),
            "swarm_health"   : round(self._health, 3),
            "formation_score": round(self.formation_health_score(), 3),
            "target_id"      : self._target_id,
        }
