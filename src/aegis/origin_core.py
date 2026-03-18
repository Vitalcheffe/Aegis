"""
AEGIS · origin_core.py
Main Orchestrator — 50 Hz control loop

Pipeline per tick:
  SensorFrames (N)
    → M1 SpectralFusion    → List[FusedTarget]
    → M2 MultiTargetUKF    → refined FusedTargets (with UKF state)
    → M3 ElasticNet        → formation commands Dict[id → Vec3]
    → M4 EnergyBudget      → per-drone energy decisions
    → Safety ProximityLock → weapon lock/unlock per drone
    → HumanLoopGate        → final authorisation
    → DroneCommands (N)

Design principle: this file contains ZERO business logic.
It only wires modules together. All logic lives in the sub-modules.
Total code here is intentionally short.

Author  : Vitalcheffe
Version : 1.0.0
"""
from __future__ import annotations
import time, logging, threading
from typing import Dict, List, Optional, Tuple
from aegis.oc_types import (
    SensorFrame, FusedTarget, DroneState, DroneCommand, InterceptOrder,
    SwarmStatus, Vec3, DroneRole, BoosterState, EnergyDecision,
    TargetClass, NetState, PayloadMode, ThreatProfile,
    V_PATROL_MS, V_SPRINT_MS, DRONE_E_USABLE, MESH_QUORUM_RATIO,
    WORTH_ASK, AEGIS_VERSION, PROTOCOL_VERSION,
)
from aegis.fusion.spectral_fusion import SpectralFusion
from aegis.ukf.intercept_ukf      import MultiTargetUKF
from aegis.swarm.elastic_net       import ElasticNet
from aegis.energy.budget_manager   import EnergyBudgetManager, TargetWorthEngine
from aegis.safety.proximity_lock   import ProximityLock, HumanLoopGate, ADSBSpoofDetector

log = logging.getLogger("aegis.core")


class AegisCore:
    """
    Central orchestrator for the AEGIS swarm intercept system.

    Instantiated once per mission. Runs at 50 Hz via the step() method.
    Thread-safe: step() acquires _lock, all external calls are queued.

    Usage:
        core = AegisCore(n_drones=500, base_pos=Vec3(0,0,0))
        core.start()
        while mission_running:
            frames = collect_sensor_frames()
            cmds   = core.step(frames, swarm_state)
            send_commands(cmds)
        core.stop()
    """

    TICK_HZ = 50
    DT      = 1.0 / TICK_HZ

    def __init__(
        self,
        n_drones:   int   = 500,
        base_pos:   Vec3  = Vec3.zero(),
        altitude_m: float = 300.0,
    ) -> None:
        self.n_drones   = n_drones
        self.base_pos   = base_pos
        self.altitude_m = altitude_m

        # Module instantiation
        self.fusion   = SpectralFusion()
        self.ukf      = MultiTargetUKF()
        self.net      = ElasticNet(n_drones, origin=base_pos, altitude_m=altitude_m)
        self.budget   = EnergyBudgetManager()
        self.worth    = TargetWorthEngine()
        self.lock     = ProximityLock()
        self.gate     = HumanLoopGate(
            on_approved=self._on_approved,
            on_vetoed=self._on_vetoed,
        )
        self.spoof    = ADSBSpoofDetector()

        # Engagement tracking
        self._active_orders: Dict[str, InterceptOrder] = {}  # drone_id → order
        self._approved_pairs: set = set()   # (drone_id, target_id) approved

        # Mission stats
        self._tick = 0
        self._t0   = time.time()
        self._lock = threading.Lock()

        log.info(f"AegisCore v{AEGIS_VERSION} initialised — {n_drones} drones")

    # ─────────────────────────────────────────────────────────────────────────
    #  Main step — called at 50 Hz
    # ─────────────────────────────────────────────────────────────────────────

    def step(
        self,
        frames: List[SensorFrame],
        swarm:  Dict[str, DroneState],
    ) -> Tuple[List[DroneCommand], List[FusedTarget], SwarmStatus]:
        """
        Execute one 20ms control tick.

        Args:
            frames : SensorFrames received since last tick
            swarm  : current DroneState for each agent

        Returns:
            (commands, targets, status)
            commands : List[DroneCommand] — one per drone
            targets  : List[FusedTarget]  — current confirmed threats
            status   : SwarmStatus        — broadcast health snapshot
        """
        with self._lock:
            self._tick += 1
            t_tick = time.time()

            # ── M1: Spectral Fusion ───────────────────────────────────────────
            fused_targets = self.fusion.update(frames)

            # ── M2: UKF Tracking ─────────────────────────────────────────────
            fused_targets = self.ukf.update(fused_targets)

            # ── M3: Formation control ─────────────────────────────────────────
            confirmed = [t for t in fused_targets if t.is_confirmed]
            formation_cmds = self.net.step(swarm, confirmed, self.DT)

            # ── M4 + Safety: Engagement decisions ────────────────────────────
            commands = self._build_commands(swarm, confirmed, formation_cmds)

            # ── Swarm status broadcast ────────────────────────────────────────
            status = self._build_status(swarm, fused_targets, t_tick)

            return commands, fused_targets, status

    # ─────────────────────────────────────────────────────────────────────────
    #  Command builder
    # ─────────────────────────────────────────────────────────────────────────

    def _build_commands(
        self,
        swarm:         Dict[str, DroneState],
        targets:       List[FusedTarget],
        formation_cmds:Dict[str, Vec3],
    ) -> List[DroneCommand]:
        """Build DroneCommand for each drone in the swarm."""
        commands: List[DroneCommand] = []
        network_quorum = self._compute_quorum(swarm)
        is_vetoed      = self.gate.is_vetoed()

        best_target = max(targets, key=lambda t: t.track_quality) if targets else None

        # ── Pre-compute intercept once per target (not once per drone) ─────────
        # Previously: get_intercept() was called for every eligible drone every tick.
        # With incremental UKF integration, that's still O(N × 600 steps) per tick.
        # Now: compute once, cache result, pass to the single best drone.
        intercept_cache: Optional[Dict] = None
        best_drone_id:   Optional[str]  = None

        if best_target and not is_vetoed:
            # Check if this target already has an active interceptor
            already_covered = any(
                o.target_id == best_target.target_id
                for o in self._active_orders.values()
            )
            if not already_covered:
                # Pick the single best candidate BEFORE computing intercept
                best_drone_id = self.budget.pick_best_drone(
                    swarm, best_target.pos, self.base_pos)
                if best_drone_id:
                    intercept_cache = self.ukf.get_intercept(
                        best_target.target_id,
                        swarm[best_drone_id].pos,
                    )

        for did, ds in swarm.items():
            cmd = DroneCommand(drone_id=did, seq_num=self._tick)

            budget_result = self.budget.evaluate(
                ds,
                intercept_dist_m=ds.pos.dist(best_target.pos) if best_target else 500.0,
                rtb_dist_m=ds.pos.dist(self.base_pos),
            )

            if budget_result.decision == EnergyDecision.EMERGENCY_CHUTE:
                cmd.deploy_chute = True
                cmd.role = DroneRole.RECOVERY
                commands.append(cmd)
                continue

            if budget_result.decision == EnergyDecision.INITIATE_RTB:
                cmd.initiate_rtb = True
                cmd.role         = DroneRole.RTB
                cmd.target_pos   = self.base_pos
                cmd.target_speed = V_PATROL_MS
                commands.append(cmd)
                continue

            if did in formation_cmds:
                cmd_vel = formation_cmds[did]
                v_mag   = cmd_vel.norm()
                if v_mag > 0.1:
                    cmd.target_pos   = ds.pos + cmd_vel * 2.0
                    cmd.target_speed = min(v_mag, V_PATROL_MS)

            # ── Engagement: only for the pre-selected best drone ─────────────
            if (did == best_drone_id and
                    intercept_cache is not None and
                    did not in self._active_orders):

                profile      = self.worth.score(best_target, collateral_risk=0.5)
                worth_ok, _  = self.worth.recommend(profile)
                lock_state   = self.lock.evaluate(ds, swarm, is_vetoed, network_quorum)
                approved, _  = self.gate.request_authorisation(
                    drone_id=did,
                    target_id=best_target.target_id,
                    confidence=intercept_cache["confidence"],
                    threat_score=profile.threat_score,
                    is_high_risk=profile.is_high_risk,
                )

                if (worth_ok == EnergyDecision.EXECUTE_INTERCEPT and
                        approved and not lock_state.is_locked):
                    order = self._build_order(did, best_target, intercept_cache)
                    self._active_orders[did] = order
                    cmd.intercept_order  = order
                    cmd.role             = DroneRole.SPRINT
                    cmd.target_pos       = intercept_cache["intercept_pos"]
                    cmd.target_speed     = V_SPRINT_MS
                    cmd.fire_booster     = order.booster_req
                    cmd.booster_at       = order.booster_fire_t
                    log.info(f"Intercept order: {did} → {best_target.target_id}")

            commands.append(cmd)

        return commands

    def _build_order(
        self, drone_id: str, target: FusedTarget, intercept: Dict
    ) -> InterceptOrder:
        """Create an InterceptOrder from UKF intercept solution."""
        from aegis.oc_types import BOOSTER_DURATION_S
        return InterceptOrder(
            drone_id       = drone_id,
            target_id      = target.target_id,
            aim_pos        = intercept["intercept_pos"],
            eta_s          = intercept["intercept_t_s"],
            booster_req    = intercept["intercept_t_s"] < 4.0,
            booster_fire_t = intercept["fire_at_s"],
            target_type    = target.target_type,
            acknowledged   = True,
            human_approved = True,
        )

    def _compute_quorum(self, swarm: Dict[str, DroneState]) -> float:
        if not swarm:
            return 0.0
        reachable = sum(1 for ds in swarm.values() if ds.link_ok)
        return reachable / len(swarm)

    def _build_status(
        self,
        swarm: Dict[str, DroneState],
        targets: List[FusedTarget],
        t: float,
    ) -> SwarmStatus:
        alive  = [ds for ds in swarm.values() if ds.is_alive]
        batts  = [ds.battery_pct for ds in alive] or [0.0]
        fusion_stats = self.fusion.stats()

        return SwarmStatus(
            timestamp_s         = t,
            n_total             = len(swarm),
            n_patrol            = sum(1 for ds in swarm.values() if ds.role == DroneRole.PATROL),
            n_sprint            = sum(1 for ds in swarm.values() if ds.role == DroneRole.SPRINT),
            n_rtb               = sum(1 for ds in swarm.values() if ds.role == DroneRole.RTB),
            n_lost              = sum(1 for ds in swarm.values() if not ds.is_alive),
            n_confirmed_targets = len([t for t in targets if t.is_confirmed]),
            n_lures_total       = fusion_stats.get("lures", 0),
            n_bft_rejected      = fusion_stats.get("bft_rejections", 0),
            formation_health    = self.net.formation_health_score(),
            formation_state     = self.net.state,
            mean_battery_pct    = sum(batts) / len(batts),
            min_battery_pct     = min(batts),
            n_combat_ready      = sum(1 for ds in swarm.values() if ds.can_intercept),
            network_quorum      = self._compute_quorum(swarm),
        )

    # ─────────────────────────────────────────────────────────────────────────
    #  External interfaces
    # ─────────────────────────────────────────────────────────────────────────

    def colonel_veto(self) -> None:
        """Colonel presses the VETO button."""
        self.gate.colonel_veto()

    def colonel_approve(self, drone_id: str, target_id: str) -> None:
        """Colonel explicitly approves a pending engagement."""
        self.gate.colonel_approve(drone_id, target_id)

    def emergency_stop(self) -> None:
        """Hardware E-stop — all weapons locked immediately."""
        self.lock.trigger_emergency_stop()
        log.critical("EMERGENCY STOP")

    def _on_approved(self, drone_id: str, target_id: str) -> None:
        self._approved_pairs.add((drone_id, target_id))

    def _on_vetoed(self, drone_id: str, target_id: str) -> None:
        self._active_orders.pop(drone_id, None)
        self._approved_pairs.discard((drone_id, target_id))

    def stats(self) -> Dict:
        elapsed = time.time() - self._t0
        return {
            "version"       : AEGIS_VERSION,
            "tick"          : self._tick,
            "elapsed_s"     : round(elapsed, 1),
            "ticks_per_s"   : round(self._tick / max(elapsed, 1), 1),
            "active_orders" : len(self._active_orders),
            "fusion"        : self.fusion.stats(),
            "ukf"           : self.ukf.stats(),
            "swarm"         : self.net.stats(),
        }
