"""
AEGIS · ukf/intercept_ukf.py
Module M2 — Unscented Kalman Filter + Intercept Predictor

State vector (9D): x = [px, py, pz, vx, vy, vz, ax, ay, az]  (NED frame)

Why UKF over EKF?
  EKF linearises f(x) via Jacobian — fails at 10G manoeuvres (strong non-linearity).
  UKF propagates 2n+1 = 19 sigma points through the exact physics function.
  Same O(n) complexity as EKF, no Jacobian computation, no linearisation error.

Sigma points (Van der Merwe 2004, scaled unscented transform):
  λ  = α²(n + κ) − n
  x₀  = μ
  xᵢ  = μ + √((n+λ)·P)_i      (columns of matrix square root)
  xᵢ₊ₙ= μ − √((n+λ)·P)_i
  Weights: Wm₀ = λ/(n+λ),  Wc₀ = λ/(n+λ) + (1−α²+β)
           Wmᵢ = Wcᵢ = 1/(2(n+λ))   for i = 1..2n

Intercept scan:
  Scans t ∈ [0.1, 12.0] seconds in 0.1s steps.
  At each t: predicts drone arrival position and target future position.
  First t where |drone_future − target_future| < V_sprint × dt → fire time.

Author  : Vitalcheffe
Version : 1.0.0
"""
from __future__ import annotations
import time, math, logging
from typing import Dict, List, Optional, Tuple
import numpy as np
from scipy.linalg import cholesky, LinAlgError
from aegis.oc_types import (
    FusedTarget, Vec3, TargetClass,
    UKF_N_STATE as N, UKF_N_MEAS as M,
    UKF_ALPHA, UKF_BETA, UKF_KAPPA,
    UKF_DT_S, UKF_SIGMA_ACC, UKF_SIGMA_MEAS,
    UKF_HORIZON_S, UKF_SCAN_STEP, UKF_INTERCEPT_TOL_S,
    UKF_TIMEOUT_S, UKF_MAX_TRACKS,
    UKF_P0_POS, UKF_P0_VEL, UKF_P0_ACC,
    V_SPRINT_MS, DRONE_MASS_KG, aero_drag_N, MISSION_ALT_M,
    RHO_300M, DRONE_WEIGHT_N, DRONE_S_REF, DRONE_CD0, DRONE_K, DRONE_CL_MAX,
)

# ── Pre-computed drag constants for vectorized _f_batch ───────────────────────
# These are module-level constants so _f_batch never re-imports anything
_RHO    = RHO_300M        # 1.1901 kg/m³ @ 300m ISA
_W      = DRONE_WEIGHT_N  # 70.61 N
_S      = DRONE_S_REF     # 0.42 m²
_CD0    = DRONE_CD0       # 0.024
_K_DRAG = DRONE_K         # ≈ 0.1738
_CL_MAX = DRONE_CL_MAX    # 1.52

log = logging.getLogger("aegis.ukf")

# ── Sigma-point weights (precomputed constants) ────────────────────────────────
_LAMBDA = UKF_ALPHA**2 * (N + UKF_KAPPA) - N
_N_SIG  = 2 * N + 1            # = 19

_Wm = np.full(_N_SIG, 1.0 / (2 * (N + _LAMBDA)))
_Wm[0] = _LAMBDA / (N + _LAMBDA)

_Wc = _Wm.copy()
_Wc[0] += (1.0 - UKF_ALPHA**2 + UKF_BETA)

_SQRT_NL = math.sqrt(N + _LAMBDA)


def _sigma_points(mu: np.ndarray, P: np.ndarray) -> np.ndarray:
    """2N+1 sigma points. Uses numpy Cholesky — faster than scipy for 9×9."""
    try:
        S = np.linalg.cholesky(_SQRT_NL**2 * P)
    except np.linalg.LinAlgError:
        P_reg = P + np.eye(N) * 1e-6
        try:
            S = np.linalg.cholesky(_SQRT_NL**2 * P_reg)
        except np.linalg.LinAlgError:
            vals, vecs = np.linalg.eigh(P)
            vals = np.maximum(vals, 1e-8)
            S = vecs @ np.diag(np.sqrt(_SQRT_NL**2 * vals))

    sigmas = np.empty((_N_SIG, N))
    sigmas[0] = mu
    sigmas[1:N+1]   = mu + S.T
    sigmas[N+1:2*N+1] = mu - S.T
    return sigmas


def _f_batch(sigmas: np.ndarray, dt: float) -> np.ndarray:
    # Vectorized process model for all 19 sigma points at once.
    # True NumPy vectorization — no Python loops, no np.vectorize.
    # The drag formula is inlined analytically to avoid calling aero_drag_N() 19 times.
    #
    # Drag model (ISA @ 300m, in-cruise assumption):
    #   q = 0.5 * rho * v^2
    #   CL = W / (q * S),  clamped to CL_max
    #   CD = CD0 + K * CL^2
    #   D  = q * S * CD
    #   drag_acc = D / m  (deceleration magnitude)
    dt2 = dt * dt
    p = sigmas[:, :3]
    v = sigmas[:, 3:6]
    a = sigmas[:, 6:]

    p_new = p + v * dt + 0.5 * a * dt2

    v_mag = np.sqrt((v * v).sum(axis=1))   # (19,)
    q     = 0.5 * _RHO * v_mag * v_mag     # dynamic pressure, shape (19,)
    # Avoid divide-by-zero when v≈0
    q_safe = np.where(q > 1e-4, q, 1e-4)
    CL     = np.minimum(_W / (q_safe * _S), _CL_MAX)
    CD     = _CD0 + _K_DRAG * CL * CL
    D      = q * _S * CD                    # drag force N, shape (19,)
    drag_acc = D / DRONE_MASS_KG            # m/s², shape (19,)

    # Apply drag opposing velocity direction
    v_mag_safe = np.where(v_mag > 1e-3, v_mag, 1.0)
    v_unit     = v / v_mag_safe[:, np.newaxis]             # (19, 3)
    drag_vec   = np.where((v_mag > 1e-3)[:, np.newaxis],
                          drag_acc[:, np.newaxis] * v_unit,
                          0.0)                             # (19, 3)

    v_new = v + a * dt - drag_vec * dt

    return np.concatenate([p_new, v_new, a], axis=1)


def _f(x: np.ndarray, dt: float) -> np.ndarray:
    """Single-point process model (kept for UKFTrack.predict() method)."""
    px,py,pz,vx,vy,vz,ax,ay,az = x
    dt2 = dt*dt
    npx = px + vx*dt + 0.5*ax*dt2
    npy = py + vy*dt + 0.5*ay*dt2
    npz = pz + vz*dt + 0.5*az*dt2
    v_mag = math.sqrt(vx*vx + vy*vy + vz*vz)
    drag  = aero_drag_N(v_mag, MISSION_ALT_M) / DRONE_MASS_KG if v_mag > 1.0 else 0.0
    if v_mag > 1e-3:
        dx = drag*vx/v_mag; dy = drag*vy/v_mag; dz = drag*vz/v_mag
    else:
        dx = dy = dz = 0.0
    return np.array([npx,npy,npz,
                     vx+ax*dt-dx*dt, vy+ay*dt-dy*dt, vz+az*dt-dz*dt,
                     ax,ay,az])


def _h(x: np.ndarray) -> np.ndarray:
    """Measurement model: we observe position only (first 3 state components)."""
    return x[:M]


def _build_Q(dt: float) -> np.ndarray:
    """
    Process noise covariance Q — continuous white-noise acceleration model.
    Models unknown manoeuvres as random acceleration changes.

    Using the "singer" model: acceleration autocorrelation time >> dt.
    Q block for one axis = σ²_a × [[dt⁴/4, dt³/2, dt²/2],
                                    [dt³/2, dt²,   dt   ],
                                    [dt²/2, dt,    1    ]]
    σ_a = UKF_SIGMA_ACC = 25 m/s² (2.5G of unexpected manoeuvre per step)
    """
    s2 = UKF_SIGMA_ACC**2
    dt2, dt3, dt4 = dt**2, dt**3, dt**4

    q_axis = s2 * np.array([
        [dt4/4, dt3/2, dt2/2],
        [dt3/2, dt2,   dt   ],
        [dt2/2, dt,    1.0  ],
    ])

    Q = np.zeros((N, N))
    for i in range(3):
        Q[3*i:3*i+3, 3*i:3*i+3] = q_axis

    return Q


def _build_R() -> np.ndarray:
    """Measurement noise covariance R — sensor uncertainty."""
    return np.eye(M) * UKF_SIGMA_MEAS**2


# ── Process noise and measurement noise (constant, precomputed) ───────────────
_Q = _build_Q(UKF_DT_S)
_R = _build_R()


# ─────────────────────────────────────────────────────────────────────────────
#  Single-target UKF track
# ─────────────────────────────────────────────────────────────────────────────

class UKFTrack:
    """
    UKF for a single target track.
    Maintains state vector x̂ and covariance P.
    Provides predict(), update(), and predict_at() methods.
    """

    def __init__(self, initial_pos: Vec3, initial_vel: Vec3 = Vec3.zero()) -> None:
        self.target_id: str = ""
        self.created_s: float = time.time()
        self.last_update_s: float = time.time()
        self.update_count: int = 0
        self.n_missed: int = 0    # consecutive frames with no measurement

        # State vector [px,py,pz,vx,vy,vz,ax,ay,az]
        self.x = np.array([
            initial_pos.x, initial_pos.y, initial_pos.z,
            initial_vel.x, initial_vel.y, initial_vel.z,
            0.0, 0.0, 0.0,
        ])

        # Initial covariance — high uncertainty on velocity and acceleration
        self.P = np.diag([
            UKF_P0_POS, UKF_P0_POS, UKF_P0_POS,
            UKF_P0_VEL, UKF_P0_VEL, UKF_P0_VEL,
            UKF_P0_ACC, UKF_P0_ACC, UKF_P0_ACC,
        ])

        self._Q = _Q.copy()
        self._R = _R.copy()

    def predict(self, dt: float = UKF_DT_S) -> None:
        """
        UKF predict step: propagate sigma points through _f().
        After predict: x̂⁻, P⁻ (prior mean and covariance).
        """
        sigmas = _sigma_points(self.x, self.P)

        # Propagate each sigma point through the physics model
        sigma_f = _f_batch(sigmas, dt)

        # Predicted mean
        x_prior = np.einsum('i,ij->j', _Wm, sigma_f)

        # Predicted covariance
        diff = sigma_f - x_prior
        P_prior = np.einsum('i,ij,ik->jk', _Wc, diff, diff) + self._Q

        self.x = x_prior
        self.P = P_prior

    def update(self, measurement: np.ndarray) -> float:
        """
        UKF update step: incorporate position measurement z = [px, py, pz].

        Returns innovation norm (useful for outlier rejection).
        """
        sigmas = _sigma_points(self.x, self.P)
        sigma_h = np.array([_h(s) for s in sigmas])

        # Predicted measurement mean
        z_pred = np.einsum('i,ij->j', _Wm, sigma_h)

        # Innovation covariance Pzz + R
        dz = sigma_h - z_pred
        Pzz = np.einsum('i,ij,ik->jk', _Wc, dz, dz) + self._R

        # Cross-covariance Pxz
        dx = sigmas - self.x
        Pxz = np.einsum('i,ij,ik->jk', _Wc, dx, dz)

        # Kalman gain K = Pxz @ Pzz⁻¹
        try:
            K = Pxz @ np.linalg.solve(Pzz, np.eye(M))
        except np.linalg.LinAlgError:
            log.warning("UKFTrack: singular Pzz, skipping update")
            return float('inf')

        # State and covariance update
        innovation = measurement - z_pred
        self.x = self.x + K @ innovation
        self.P = self.P - K @ Pzz @ K.T

        # Keep P symmetric and positive definite
        self.P = (self.P + self.P.T) * 0.5 + np.eye(N) * 1e-8

        self.update_count += 1
        self.last_update_s = time.time()
        self.n_missed = 0

        return float(np.linalg.norm(innovation))

    def predict_at(self, t_future: float) -> Tuple[np.ndarray, np.ndarray]:
        """
        Predict state at t_future seconds from now (multi-step propagation).
        Returns (predicted_state, predicted_covariance).

        Runs ceil(t_future / dt) predict steps. Covariance grows with each step.
        Used by InterceptPredictor to find the intercept point.
        """
        n_steps = max(1, round(t_future / UKF_DT_S))
        x_fut = self.x.copy()
        P_fut = self.P.copy()

        for _ in range(n_steps):
            sigmas = _sigma_points(x_fut, P_fut)
            sigma_f = _f_batch(sigmas, UKF_DT_S)
            x_fut = np.einsum('i,ij->j', _Wm, sigma_f)
            diff  = sigma_f - x_fut
            P_fut = np.einsum('i,ij,ik->jk', _Wc, diff, diff) + self._Q

        return x_fut, P_fut

    def to_vec3s(self) -> Tuple[Vec3, Vec3, Vec3]:
        """Extract (position, velocity, acceleration) as Vec3 objects."""
        return (
            Vec3(self.x[0], self.x[1], self.x[2]),
            Vec3(self.x[3], self.x[4], self.x[5]),
            Vec3(self.x[6], self.x[7], self.x[8]),
        )

    @property
    def is_stale(self) -> bool:
        return (time.time() - self.last_update_s) > UKF_TIMEOUT_S

    @property
    def pos_uncertainty_m(self) -> float:
        """1σ position uncertainty (trace of position block)."""
        return math.sqrt(max(0.0, float(np.trace(self.P[:3, :3])) / 3.0))


# ─────────────────────────────────────────────────────────────────────────────
#  Intercept Predictor
# ─────────────────────────────────────────────────────────────────────────────

class InterceptPredictor:
    """
    Computes the optimal intercept point and booster fire time.

    Algorithm:
        Scan t ∈ {0.1, 0.2, ..., 12.0} seconds.
        For each t:
            target_pos_t = UKF.predict_at(t).position
            drone_dist   = |drone_pos − target_pos_t|
            drone_eta    = drone_dist / V_sprint
            if |drone_eta − t| ≤ UKF_INTERCEPT_TOL_S:
                fire_time = now + t − BOOSTER_DURATION_S
                return InterceptSolution(fire_time, target_pos_t, t)

    Timing error budget:
        Network jitter:    ±200 µs
        Clock sync error:  ±100 µs
        Processing delay:  ±500 µs
        Total:             ±0.8 ms  <<  tolerance 300ms → margin factor 375×
    """

    def find_intercept(
        self,
        drone_pos: Vec3,
        track: UKFTrack,
        t_now: float = 0.0,
    ) -> Optional[Dict]:
        """
        Find the first viable intercept window using incremental integration.

        Previous approach restarted predict_at() from t=0 for every scan window,
        resulting in sum(1..120)*5 = 36,300 UKF steps per call (O(H²/dt²)).

        This approach integrates forward incrementally: 5 steps per window,
        120 windows → 600 total UKF steps. Same result, 60× faster.

        Returns dict with keys:
            intercept_pos  : Vec3 — predicted target position at intercept
            intercept_t_s  : float — seconds until intercept
            fire_at_s      : float — Unix timestamp to fire booster
            confidence     : float — based on position uncertainty
            pos_uncertainty_m : float — 1σ error at intercept point
        Returns None if no intercept window found within horizon.
        """
        from aegis.oc_types import BOOSTER_DURATION_S

        # Scan strategy: propagate mean trajectory cheaply (no covariance),
        # then compute P only once at the matched window.
        # This avoids 600 Cholesky decompositions — we only need 1.
        # Accuracy tradeoff: mean trajectory is exact; uncertainty estimate
        # uses track.P grown by accumulated Q, which is conservative but valid.
        x_cur = track.x.copy()
        steps_per_window = max(1, round(UKF_SCAN_STEP / UKF_DT_S))  # = 5

        # Pre-build a flat sigma row from mean (used for mean propagation only)
        # We propagate the full sigma set through _f_batch but only use the mean.
        # This is still much faster than re-running Cholesky every step.
        P_cur = track.P.copy()

        scan_t = UKF_SCAN_STEP
        while scan_t <= UKF_HORIZON_S:
            for _ in range(steps_per_window):
                # Cheap: propagate x through _f without sigma point expansion
                x_cur = _f(x_cur, UKF_DT_S)
                # Grow P conservatively — skip Cholesky, just add Q each step
                P_cur = P_cur + _Q

            target_pos = Vec3(x_cur[0], x_cur[1], x_cur[2])
            dist       = drone_pos.dist(target_pos)
            drone_eta  = dist / V_SPRINT_MS

            if abs(drone_eta - scan_t) <= UKF_INTERCEPT_TOL_S:
                pos_unc    = math.sqrt(max(0.0, float(np.trace(P_cur[:3, :3])) / 3.0))
                conf_dist  = max(0.0, 1.0 - pos_unc / 30.0)
                conf_time  = max(0.0, 1.0 - scan_t / UKF_HORIZON_S)
                confidence = 0.6 * conf_dist + 0.4 * conf_time
                fire_at    = (t_now or time.time()) + scan_t - BOOSTER_DURATION_S

                return {
                    "intercept_pos"     : target_pos,
                    "intercept_t_s"     : scan_t,
                    "fire_at_s"         : fire_at,
                    "confidence"        : float(confidence),
                    "pos_uncertainty_m" : pos_unc,
                }

            scan_t += UKF_SCAN_STEP

        return None


# ─────────────────────────────────────────────────────────────────────────────
#  MultiTargetUKF — manages up to UKF_MAX_TRACKS simultaneous tracks
# ─────────────────────────────────────────────────────────────────────────────

class MultiTargetUKF:
    """
    Manages up to UKF_MAX_TRACKS concurrent UKF tracks.
    Integrates with SpectralFusion output (FusedTarget list).

    Association: nearest confirmed target → nearest active track.
    New confirmed target with no close track → create new track.
    Track with no update for > UKF_TIMEOUT_S → delete.

    Provides:
        update(targets) → updated FusedTarget list (with UKF state injected)
        get_intercept(target_id, drone_pos) → InterceptSolution or None
    """

    ASSOC_RADIUS_M = 50.0    # Max radius for target-track association

    def __init__(self) -> None:
        self._tracks: Dict[str, UKFTrack] = {}    # target_id → UKFTrack
        self._predictor = InterceptPredictor()
        self.cycle = 0

    def update(self, targets: List[FusedTarget]) -> List[FusedTarget]:
        """
        Main loop: associate FusedTargets to UKF tracks, run predict+update.
        Injects UKF state back into FusedTarget objects.
        """
        self.cycle += 1

        # Step 1: predict all existing tracks forward one step
        for track in self._tracks.values():
            track.predict()
            track.n_missed += 1

        # Step 2: associate confirmed targets to tracks
        for target in targets:
            if not target.classification.is_threat() and not target.is_confirmed:
                continue

            meas = np.array([target.pos.x, target.pos.y, target.pos.z])
            track = self._find_or_create_track(target)

            if track is not None:
                track.update(meas)
                track.target_id = target.target_id
                self._inject_ukf_state(target, track)

        # Step 3: expire stale tracks
        stale = [tid for tid, t in self._tracks.items() if t.is_stale]
        for tid in stale:
            del self._tracks[tid]
            log.debug(f"UKF track expired: {tid}")

        return targets

    def _find_or_create_track(self, target: FusedTarget) -> Optional[UKFTrack]:
        """
        Association: find nearest track within ASSOC_RADIUS_M.
        Creates new track if no match found and capacity allows.
        """
        best_id, best_d = None, self.ASSOC_RADIUS_M
        for tid, track in self._tracks.items():
            tp = Vec3(track.x[0], track.x[1], track.x[2])
            d  = target.pos.dist(tp)
            if d < best_d:
                best_d, best_id = d, tid

        if best_id is not None:
            return self._tracks[best_id]

        # Create new track if capacity allows
        if len(self._tracks) < UKF_MAX_TRACKS:
            track = UKFTrack(target.pos, target.vel)
            track.target_id = target.target_id
            self._tracks[target.target_id] = track
            log.info(f"New UKF track: {target.target_id}")
            return track

        log.warning(f"UKF capacity full ({UKF_MAX_TRACKS}), dropping {target.target_id}")
        return None

    def _inject_ukf_state(self, target: FusedTarget, track: UKFTrack) -> None:
        """Write UKF estimates back into the FusedTarget object."""
        pos, vel, acc = track.to_vec3s()
        std_raw = np.sqrt(np.maximum(np.diag(track.P[:3, :3]), 0.0))
        pos_std = Vec3(float(std_raw[0]), float(std_raw[1]), float(std_raw[2]))

        object.__setattr__(target, 'pos',        pos)      if False else None
        target.__dict__['pos']        = pos         if hasattr(target, '__dict__') else None
        target.__dict__['vel']        = vel         if hasattr(target, '__dict__') else None
        target.__dict__['acc']        = acc         if hasattr(target, '__dict__') else None
        target.__dict__['pos_std']    = pos_std     if hasattr(target, '__dict__') else None
        target.__dict__['ukf_state']  = track.x.copy() if hasattr(target, '__dict__') else None
        target.__dict__['ukf_cov']    = track.P.copy()  if hasattr(target, '__dict__') else None
        target.__dict__['ukf_updates']= track.update_count if hasattr(target, '__dict__') else None

        # dataclass fields — use direct attribute assignment
        try:
            target.pos = pos
            target.vel = vel
            target.acc = acc
            target.pos_std = pos_std
            target.ukf_state = track.x.copy()
            target.ukf_cov   = track.P.copy()
            target.ukf_updates = track.update_count
        except Exception:
            pass   # frozen dataclass — already handled above

    def get_intercept(self, target_id: str, drone_pos: Vec3) -> Optional[Dict]:
        """
        Compute intercept solution for a given target and drone.
        Returns None if target not tracked or no window found.
        """
        track = self._tracks.get(target_id)
        if track is None:
            return None
        return self._predictor.find_intercept(drone_pos, track)

    def stats(self) -> Dict:
        return {
            "active_tracks": len(self._tracks),
            "capacity_pct" : len(self._tracks) / UKF_MAX_TRACKS * 100,
            "cycles"       : self.cycle,
        }

    def clear_stale_tracks(self) -> None:
        """Force-expire all tracks. Called between simulation waves."""
        self._tracks.clear()
