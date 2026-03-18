"""
aegis/core.py
=============
AegisCore — Main Orchestrator

Runs the nested control loops and wires all modules together.

Loop architecture:
  50 Hz (20ms) — sensor fusion + UKF + safety evaluation
  10 Hz (100ms)— swarm formation + intercept assignment
   1 Hz (1s)   — status broadcast + housekeeping

Entry point:
  core = AegisCore(drone_ids)
  core.ingest(frames)        # call at 50 Hz with fresh SensorFrames
  commands = core.step()     # get DroneCommands for all drones
"""

from __future__ import annotations
import time
import logging
from typing import Dict, List, Optional
import numpy as np

from .oc_types import (
    Vec3, SensorFrame, FusedTarget, DroneState, DroneCommand,
    InterceptOrder, SwarmStatus, ProximityLockState,
    DroneRole, DroneHealth, BoosterState, NetState,
    EnergyDecision, LockReason, SensorStatus,
    V_PATROL_MS, DRONE_E_USABLE, E_RTB_WH, E_CHUTE_WH,
    AEGIS_VERSION, generate_drone_ids,
)
from .fusion.spectral_fusion import SpectralFusion
from .ukf.intercept_ukf import MultiTargetUKF
from .swarm.elastic_net import ElasticNet
from .energy.budget_manager import EnergyBudgetManager
from .safety.proximity_lock import ProximityLock, HumanLoopGate, TargetWorthEngine

log = logging.getLogger(__name__)


class AegisCore:
    """
    Top-level coordinator for the Aegis swarm.

    Instantiate once per mission. Call step() at 50 Hz.
    """

    def __init__(self, drone_ids: List[str]):
        n = len(drone_ids)
        log.info(f"[Core] AegisCore v{AEGIS_VERSION} init — {n} drones")

        self._ids      = drone_ids
        self._n        = n

        # Module instantiation
        self._fusion   = SpectralFusion(n)
        self._ukf      = MultiTargetUKF()
        self._swarm    = ElasticNet(drone_ids)
        self._energy   = EnergyBudgetManager()
        self._gate     = HumanLoopGate()
        self._lock     = ProximityLock(self._gate)
        self._worth    = TargetWorthEngine()

        # Drone states (keyed by drone_id)
        self._drones: Dict[str, DroneState] = {
            did: DroneState(drone_id=did, formation_idx=i)
            for i, did in enumerate(drone_ids)
        }

        # Targets
        self._targets: List[FusedTarget] = []

        # Loop counters
        self._tick     = 0       # 50 Hz ticks
        self._tick_10  = 0       # 10 Hz ticks
        self._tick_1   = 0       # 1 Hz ticks

        # Pending sensor frames for this tick
        self._pending_frames: List[SensorFrame] = []

        # Stats
        self._intercepts_issued = 0
        self._intercepts_abort  = 0
        self._start_s = time.time()

        log.info(f"[Core] All modules initialized. Ready.")

    # ── public API ─────────────────────────────────────────────────────────────

    def ingest(self, frames: List[SensorFrame]) -> None:
        """Buffer incoming SensorFrames. Call at 50 Hz before step()."""
        self._pending_frames.extend(frames)

        # Update drone states from frames
        for f in frames:
            if f.drone_id in self._drones:
                d = self._drones[f.drone_id]
                # Update nav state
                self._drones[f.drone_id] = DroneState(
                    drone_id       = d.drone_id,
                    formation_idx  = d.formation_idx,
                    role           = d.role,
                    health         = d.health,
                    payload        = d.payload,
                    booster        = d.booster,
                    active_sensors = f.active_sensors,
                    pos            = f.drone_pos,
                    vel            = f.drone_vel,
                    heading_deg    = f.heading_deg,
                    battery_wh     = f.battery_wh,
                    battery_v      = getattr(f, "battery_v", 22.2),
                    assigned_target= d.assigned_target,
                    last_seen_s    = time.time(),
                    rssi_dbm       = f.rssi_dbm,
                    n_peers        = d.n_peers,
                    total_sprints  = d.total_sprints,
                    intercepts_ok  = d.intercepts_ok,
                    mission_start  = d.mission_start,
                )

    def step(self) -> List[DroneCommand]:
        """
        Run one control cycle (call at 50 Hz).
        Returns one DroneCommand per drone.
        """
        t0 = time.perf_counter()
        self._tick += 1
        frames = list(self._pending_frames)
        self._pending_frames.clear()

        drone_list = list(self._drones.values())

        # ── 50 Hz: Fusion + UKF ───────────────────────────────────────────────
        raw_targets = self._fusion.step(frames)
        self._targets = self._ukf.step(raw_targets, drone_list)

        # ── 10 Hz: Formation + Intercept assignment ───────────────────────────
        if self._tick % 5 == 0:
            self._tick_10 += 1
            swarm_cmds = self._swarm.step(drone_list, self._targets)

            # Intercept assignment
            confirmed = [t for t in self._targets if t.is_confirmed]
            network_ratio = self._compute_network_ratio()

            for target in confirmed:
                if target.assigned_drone:
                    continue
                if not target.intercept_pos:
                    continue
                drone = self._drones.get(target.assigned_drone or "")
                if drone is None:
                    # pick best available
                    available = [d for d in drone_list if d.can_intercept and not d.assigned_target]
                    if not available:
                        continue
                    drone = min(available, key=lambda d: d.pos.dist(target.pos))

                # Energy check
                order = InterceptOrder(
                    drone_id   = drone.drone_id,
                    target_id  = target.target_id,
                    aim_pos    = target.intercept_pos,
                    eta_s      = target.intercept_t_s or 5.0,
                    booster_req= True if target.intercept_t_s and target.intercept_t_s < 4.0 else False,
                    abort_batt = E_RTB_WH,
                )
                decision = self._energy.evaluate(drone, order)

                if decision.is_abort():
                    self._intercepts_abort += 1
                    continue

                # Human loop gate (high-risk targets need authorization)
                threat = self._worth.score(target)
                score  = threat
                if score > 60.0:
                    self._gate.request_authorization(
                        order.order_id, drone.drone_id, target,
                        self._energy.score_target(target)
                    )
                    order.human_ok = self._gate.is_cleared(order.order_id)
                else:
                    order.human_ok = True

                # Safety lock
                lock = self._lock.evaluate(drone, drone_list, order.order_id, network_ratio)
                if lock.is_locked:
                    continue

                # Issue order
                order.acknowledged = True
                target.assigned_drone = drone.drone_id
                d = self._drones[drone.drone_id]
                self._drones[drone.drone_id] = DroneState(
                    **{**d.__dict__,
                       "role": DroneRole.SPRINT,
                       "assigned_target": target.target_id}
                )
                self._intercepts_issued += 1

            # Store formation commands
            self._swarm_commands = {c.drone_id: c for c in swarm_cmds}

        # ── 1 Hz: housekeeping ────────────────────────────────────────────────
        if self._tick % 50 == 0:
            self._tick_1 += 1
            self._housekeeping()

        # ── Build final command list ──────────────────────────────────────────
        commands = []
        for did in self._ids:
            drone = self._drones.get(did)
            if drone is None:
                continue

            # Start from formation command
            base = getattr(self, "_swarm_commands", {}).get(did)
            if base is None:
                base = DroneCommand(drone_id=did, role=drone.role,
                                    target_speed=V_PATROL_MS)

            # RTB override
            if self._energy.should_rtb(drone):
                base.initiate_rtb = True
                base.role         = DroneRole.RTB

            # Emergency chute
            if drone.battery_wh <= E_CHUTE_WH + 1.0:
                base.deploy_chute = True

            commands.append(base)

        dt_ms = (time.perf_counter() - t0) * 1000
        if self._tick % 500 == 0:
            confirmed = [t for t in self._targets if t.is_confirmed]
            log.info(f"[Core] tick={self._tick} confirmed={len(confirmed)} "
                     f"intercepts={self._intercepts_issued} dt={dt_ms:.2f}ms")

        return commands

    # ── operator interface ────────────────────────────────────────────────────

    def veto(self, order_id: str, operator: str = "COLONEL") -> bool:
        return self._gate.veto(order_id, operator)

    def explicit_go(self, order_id: str, operator: str = "COLONEL") -> bool:
        return self._gate.explicit_go(order_id, operator)

    def emergency_stop(self) -> None:
        self._gate.emergency_stop()
        self._lock.emergency_stop()

    @property
    def status(self) -> SwarmStatus:
        drone_list = list(self._drones.values())
        alive  = [d for d in drone_list if d.is_alive]
        batts  = [d.battery_pct * 100 for d in alive] if alive else [0]

        return SwarmStatus(
            timestamp_s      = time.time(),
            n_total          = self._n,
            n_patrol         = sum(1 for d in drone_list if d.role == DroneRole.PATROL),
            n_sprint         = sum(1 for d in drone_list if d.role == DroneRole.SPRINT),
            n_rtb            = sum(1 for d in drone_list if d.role == DroneRole.RTB),
            n_lost           = sum(1 for d in drone_list if d.role == DroneRole.LOST),
            n_confirmed      = sum(1 for t in self._targets if t.is_confirmed),
            n_lures          = self._fusion.stats["lures_total"],
            n_bft_rejected   = self._fusion.stats["bft_total"],
            formation_health = self._swarm.health,
            formation_state  = self._swarm.state,
            mean_batt_pct    = float(np.mean(batts)),
            min_batt_pct     = float(np.min(batts)),
            n_ready          = sum(1 for d in drone_list if d.can_intercept),
            net_quorum       = self._compute_network_ratio(),
        )

    @property
    def audit_log(self):
        return self._gate.audit_log

    # ── internal ──────────────────────────────────────────────────────────────

    def _compute_network_ratio(self) -> float:
        now = time.time()
        alive = sum(1 for d in self._drones.values()
                    if (now - d.last_seen_s) < 3.0)
        return alive / max(self._n, 1)

    def _housekeeping(self) -> None:
        """1 Hz cleanup tasks."""
        now = time.time()
        # Mark lost drones
        for did, d in self._drones.items():
            if (now - d.last_seen_s) > 5.0 and d.role != DroneRole.LOST:
                self._drones[did] = DroneState(
                    **{**d.__dict__, "role": DroneRole.LOST,
                       "health": DroneHealth.LOST}
                )
                log.warning(f"[Core] drone {did} marked LOST (no telemetry 5s)")
