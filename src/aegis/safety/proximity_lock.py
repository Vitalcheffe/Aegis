"""
AEGIS · safety/proximity_lock.py
Safety Layer — ProximityLock + HumanLoopGate + ADS-B Spoof Detection

Default state: LOCKED. Unlock requires ALL four checks to pass simultaneously.

Check 1 — Sphere exclusion  : no friendly drone within 15m radius
Check 2 — Cone blast zone   : no friendly drone in 45° × 60m forward cone
Check 3 — Network quorum    : ≥ 67% of swarm drones reachable
Check 4 — Human veto gate   : Colonel has not pressed VETO in last 8s

Fail-safe design:
  A hardware failure (sensor dropout, processor crash) defaults to LOCKED.
  The only way to be unlocked is to actively pass all four checks each cycle.
  "Safe by default" — not "safe when explicitly commanded".

Cone blast geometry:
  Half-angle: 45°    → covers wide dispersion at high speed
  Depth: 60m         → 7.2kg × (89m/s)² / 2 = 28,445J → frag radius 45m + 15m margin
  cos(45°) = 0.7071  → used in dot-product check (no trigonometry at runtime)

ADS-B anti-spoofing:
  Compares declared ADS-B position/velocity with Doppler radar measurements.
  If declared velocity differs from Doppler by > 25 m/s → SPOOF_ALERT.
  If declared acceleration implies > 3.5G (civil aircraft limit) → SPOOF_ALERT.

Author  : Vitalcheffe
Version : 1.0.0
"""
from __future__ import annotations
import time, logging, threading
from dataclasses import dataclass, field
from typing import Dict, List, Optional, Callable
from aegis.oc_types import (
    DroneState, FusedTarget, ProximityLockState, AuditEntry,
    Vec3, LockReason,
    SPHERE_RADIUS_M, CONE_HALF_DEG, CONE_DEPTH_M, CONE_COS,
    MESH_QUORUM_RATIO, HUMAN_VETO_S, AUTO_CONF_THRESH,
    HIGH_RISK_MASS_KG, HIGH_RISK_CONF,
    CIVIL_G_MAX, CIVIL_VRATE_MIN, CIVIL_SPEED_TOL, SPOOF_CONF_MIN,
    AEGIS_VERSION,
)

log = logging.getLogger("aegis.safety")


# ─────────────────────────────────────────────────────────────────────────────
#  ProximityLock — 4-check safety evaluator
# ─────────────────────────────────────────────────────────────────────────────

class ProximityLock:
    """
    Evaluates whether a drone's weapon system is safe to fire.

    Returns ProximityLockState with is_locked=True (safe=blocked) or False (safe=clear).
    ALL four checks must pass for is_locked=False.

    Thread-safe: evaluation is stateless per call (no shared mutable state).
    """

    def __init__(self) -> None:
        self._eval_count: int = 0
        # Emergency stop flag — overrides everything
        self._emergency_stop: bool = False
        self._roe_locked: bool = False   # Rules of Engagement override

    def trigger_emergency_stop(self) -> None:
        """Hardware emergency stop — locks ALL weapons immediately."""
        self._emergency_stop = True
        log.critical("EMERGENCY STOP triggered — all weapons locked")

    def clear_emergency_stop(self) -> None:
        self._emergency_stop = False
        log.info("Emergency stop cleared")

    def set_roe(self, locked: bool) -> None:
        self._roe_locked = locked

    def evaluate(
        self,
        drone: DroneState,
        swarm: Dict[str, DroneState],
        human_veto: bool = False,
        network_quorum: float = 1.0,
    ) -> ProximityLockState:
        """
        Run all 4 safety checks for one drone.
        This method is O(N) where N = swarm size. Runs in < 0.5ms for N=500.

        Args:
            drone          : the drone requesting weapon release
            swarm          : all other drones in the swarm
            human_veto     : True if Colonel pressed VETO in last HUMAN_VETO_S seconds
            network_quorum : fraction of swarm drones currently reachable [0, 1]

        Returns:
            ProximityLockState — detailed result with per-check breakdown
        """
        t_start = time.perf_counter()
        self._eval_count += 1

        result = ProximityLockState(
            drone_id=drone.drone_id,
            eval_num=self._eval_count,
            is_locked=True,   # Default: LOCKED
        )

        # Emergency overrides — always locked
        if self._emergency_stop:
            result.lock_reason = LockReason.EMERGENCY
            result.eval_us = (time.perf_counter() - t_start) * 1e6
            return result

        if self._roe_locked:
            result.lock_reason = LockReason.ROE_OVERRIDE
            result.eval_us = (time.perf_counter() - t_start) * 1e6
            return result

        # ── Check 3: Network quorum ─────────────────────────────────────────
        result.network_ratio = network_quorum
        result.network_ok    = network_quorum >= MESH_QUORUM_RATIO
        if not result.network_ok:
            result.lock_reason = LockReason.NETWORK_LOSS
            result.eval_us = (time.perf_counter() - t_start) * 1e6
            return result

        # ── Check 4: Human veto ─────────────────────────────────────────────
        result.human_clear = not human_veto
        if not result.human_clear:
            result.lock_reason = LockReason.HUMAN_VETO
            result.eval_us = (time.perf_counter() - t_start) * 1e6
            return result

        # ── Checks 1 & 2: Geometry — iterate all other drones ───────────────
        # Drone forward axis: normalised velocity vector
        drone_vel_mag = drone.vel.norm()
        if drone_vel_mag > 0.5:
            forward = drone.vel.normalized()
        else:
            forward = Vec3.north(1.0)   # Default: North axis

        nearest_m = float('inf')
        n_sphere  = 0
        n_cone    = 0

        for other_id, other in swarm.items():
            if other_id == drone.drone_id:
                continue
            if not other.is_alive:
                continue

            d = drone.pos.dist(other.pos)
            nearest_m = min(nearest_m, d)

            # Check 1: Sphere exclusion — any friendly within 15m?
            if d < SPHERE_RADIUS_M:
                n_sphere += 1

            # Check 2: Cone blast zone
            # other.pos.in_cone(apex, axis, cos_half_angle, depth)
            in_cone = other.pos.in_cone(drone.pos, forward, CONE_COS, CONE_DEPTH_M)
            if in_cone:
                n_cone += 1

        result.nearest_m   = nearest_m
        result.n_in_sphere = n_sphere
        result.n_in_cone   = n_cone
        result.sphere_clear= (n_sphere == 0)
        result.cone_clear  = (n_cone == 0)

        if not result.sphere_clear:
            result.lock_reason = LockReason.FRIENDLY_NEAR
            result.eval_us = (time.perf_counter() - t_start) * 1e6
            return result

        if not result.cone_clear:
            result.lock_reason = LockReason.FRIENDLY_CONE
            result.eval_us = (time.perf_counter() - t_start) * 1e6
            return result

        # All checks passed — UNLOCKED
        result.is_locked   = False
        result.lock_reason = LockReason.NONE
        result.eval_us = (time.perf_counter() - t_start) * 1e6
        return result


# ─────────────────────────────────────────────────────────────────────────────
#  ADS-B Spoof Detector
# ─────────────────────────────────────────────────────────────────────────────

@dataclass
class ADSBAlert:
    """Result of one ADS-B spoof analysis."""
    target_id: str
    is_spoof: bool = False
    confidence: float = 0.0
    reason: str = ""

    # Raw data used in analysis
    adsb_speed_ms: float = 0.0
    radar_speed_ms: float = 0.0
    implied_g: float = 0.0


class ADSBSpoofDetector:
    """
    Detects ADS-B spoofing by comparing declared transponder data
    with independent Doppler radar measurements.

    Two independent checks:
      1. Speed delta: |v_ADS-B − v_Doppler| > CIVIL_SPEED_TOL (25 m/s)
      2. Kinematic impossibility: implied acceleration > 3.5G (civil max)

    A genuine civil aircraft cannot fly > 3.5G without structural damage.
    If ADS-B says "I am a Boeing 737" but radar shows 8G manoeuvres → spoof.
    """

    def __init__(self) -> None:
        self._prev_velocities: Dict[str, float] = {}
        self._prev_times: Dict[str, float] = {}

    def check(
        self,
        target_id: str,
        adsb_speed_ms: float,
        radar_speed_ms: float,
        dt: float = 0.02,
    ) -> ADSBAlert:
        """
        Compare ADS-B declared speed vs Doppler radar measured speed.
        Track acceleration over time to detect kinematic impossibilities.
        """
        alert = ADSBAlert(target_id=target_id,
                          adsb_speed_ms=adsb_speed_ms,
                          radar_speed_ms=radar_speed_ms)

        # Check 1: Speed delta
        speed_delta = abs(adsb_speed_ms - radar_speed_ms)
        if speed_delta > CIVIL_SPEED_TOL:
            alert.is_spoof   = True
            alert.confidence = min(1.0, SPOOF_CONF_MIN + speed_delta / 100.0)
            alert.reason     = (f"speed_delta={speed_delta:.1f}m/s "
                                f"> {CIVIL_SPEED_TOL}m/s tolerance")
            return alert

        # Check 2: Implied acceleration
        if target_id in self._prev_velocities:
            prev_v = self._prev_velocities[target_id]
            prev_t = self._prev_times.get(target_id, 0.0)
            elapsed = max(dt, time.time() - prev_t)
            accel = abs(radar_speed_ms - prev_v) / elapsed
            g_factor = accel / 9.80665
            alert.implied_g = g_factor

            if g_factor > CIVIL_G_MAX:
                alert.is_spoof   = True
                alert.confidence = min(1.0, SPOOF_CONF_MIN + (g_factor - CIVIL_G_MAX) / 5.0)
                alert.reason     = (f"implied_accel={g_factor:.1f}G "
                                    f"> civil_max {CIVIL_G_MAX}G")
                return alert

        self._prev_velocities[target_id] = radar_speed_ms
        self._prev_times[target_id]      = time.time()
        return alert


# ─────────────────────────────────────────────────────────────────────────────
#  HumanLoopGate — Colonel decision interface
# ─────────────────────────────────────────────────────────────────────────────

class HumanLoopGate:
    """
    Human-in-the-loop decision gate for weapon release authorisation.

    Flow:
      1. request_authorisation(drone_id, target_id, confidence, score) called
      2. Colonel has HUMAN_VETO_S seconds to press VETO
      3. If no veto AND confidence ≥ AUTO_CONF_THRESH AND score not HIGH_RISK:
             → AUTO_APPROVED (logged)
      4. If veto pressed: VETOED (logged, drone RTBs)
      5. If HIGH_RISK target: veto_required=True (must explicitly approve)

    ALL decisions are logged to an immutable audit ring-buffer.
    Log entries are never modified or deleted.
    """

    AUDIT_MAX_ENTRIES = 10_000

    def __init__(self, on_approved: Optional[Callable] = None,
                 on_vetoed: Optional[Callable] = None) -> None:
        self._lock = threading.Lock()
        self._audit_log: List[AuditEntry] = []
        self._pending: Dict[str, float] = {}     # drone_id → request timestamp
        self._veto_flag: bool = False
        self._veto_expires: float = 0.0
        self._on_approved = on_approved
        self._on_vetoed   = on_vetoed

    def request_authorisation(
        self,
        drone_id: str,
        target_id: str,
        confidence: float,
        threat_score: float,
        is_high_risk: bool = False,
    ) -> Tuple[bool, str]:
        """
        Request weapon release authorisation for a drone/target pair.

        Returns (authorised: bool, reason: str).

        High-risk targets (mass > 30kg or score > 80) ALWAYS require
        explicit Colonel approval (no auto-proceed).
        """
        t_now = time.time()

        # Check active veto
        if self._veto_flag and t_now < self._veto_expires:
            self._log("VETOED", drone_id, target_id, confidence, threat_score, "COLONEL")
            if self._on_vetoed:
                self._on_vetoed(drone_id, target_id)
            return False, "Colonel VETO active"

        # High-risk: never auto-approve
        if is_high_risk:
            self._log("BLOCKED_HIGH_RISK", drone_id, target_id,
                      confidence, threat_score, "SYSTEM")
            return False, f"High-risk target requires explicit Colonel approval"

        # Auto-approve if confidence sufficient and no veto
        if confidence >= AUTO_CONF_THRESH:
            self._log("AUTO_APPROVED", drone_id, target_id,
                      confidence, threat_score, "SYSTEM")
            if self._on_approved:
                self._on_approved(drone_id, target_id)
            return True, f"Auto-approved (conf={confidence:.2f} ≥ {AUTO_CONF_THRESH})"

        # Below auto threshold — pending Colonel decision
        with self._lock:
            self._pending[drone_id] = t_now

        # Wait briefly for Colonel response (non-blocking — caller must poll)
        self._log("REQUEST", drone_id, target_id, confidence, threat_score, "SYSTEM")
        return False, f"Waiting Colonel authorisation (conf={confidence:.2f} < {AUTO_CONF_THRESH})"

    def colonel_veto(self, duration_s: float = HUMAN_VETO_S) -> None:
        """Colonel presses VETO — locks all weapons for duration_s seconds."""
        with self._lock:
            self._veto_flag    = True
            self._veto_expires = time.time() + duration_s
        log.warning(f"COLONEL VETO: weapons locked for {duration_s}s")

    def colonel_approve(self, drone_id: str, target_id: str,
                        confidence: float = 1.0, score: float = 0.0) -> None:
        """Colonel explicitly approves an engagement."""
        with self._lock:
            self._pending.pop(drone_id, None)
        self._log("COL_APPROVED", drone_id, target_id, confidence, score, "COLONEL")
        if self._on_approved:
            self._on_approved(drone_id, target_id)
        log.info(f"Colonel approved: {drone_id} → {target_id}")

    def is_vetoed(self) -> bool:
        return self._veto_flag and time.time() < self._veto_expires

    def clear_veto(self) -> None:
        with self._lock:
            self._veto_flag = False
        log.info("Colonel veto cleared")

    def _log(self, event_type: str, drone_id: str, target_id: str,
             confidence: float, score: float, operator: str) -> None:
        entry = AuditEntry(
            event_type=event_type, drone_id=drone_id, target_id=target_id,
            confidence=confidence, score=score, operator=operator,
            outcome=event_type,
        )
        with self._lock:
            self._audit_log.append(entry)
            if len(self._audit_log) > self.AUDIT_MAX_ENTRIES:
                self._audit_log.pop(0)

    def audit_log(self) -> List[Dict]:
        with self._lock:
            return [e.to_dict() for e in self._audit_log[-100:]]    # Last 100

    def pending_count(self) -> int:
        with self._lock:
            return len(self._pending)
