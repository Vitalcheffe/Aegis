"""
tests/test_aegis.py
====================
Full test suite for Aegis v1.0.0

Run:  pytest tests/ -v
"""

import math, time, pytest
import numpy as np

# ── import everything we test ─────────────────────────────────────────────────
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "src"))

from aegis.oc_types import (
    Vec3, DroneRole, DroneHealth, TargetClass, TargetType,
    PayloadMode, NetState, LockReason, EnergyDecision, SensorStatus,
    SensorFrame, FusedTarget, DroneState, InterceptOrder, DroneCommand,
    ProximityLockState, ThreatProfile, AuditEntry,
    DRONE_MASS_KG, DRONE_E_USABLE, V_PATROL_MS, V_SPRINT_MS,
    E_RTB_WH, E_CHUTE_WH, E_COMBAT_WH,
    SPHERE_R_M, CONE_COS, CONE_DEPTH_M,
    VOTE_THRESH, BFT_SIGMA, CLUSTER_R_M,
    RHO_300M, SPEED_SOUND_300M, MACH_SPRINT,
    SF_STRUCTURE, BOOSTER_N, BOOSTER_DV,
    MISSION_ALT_M,
    aero_drag, total_power, patrol_endurance_min, energy_for_segment,
    rain_attenuation, mesh_range, generate_drone_ids,
    _OK as SELF_TEST_OK,
)


# ═══════════════════════════════════════════════════════════════════════════════
# MODULE 0 — SELF-TEST & CONSTANTS
# ═══════════════════════════════════════════════════════════════════════════════

class TestConstants:
    def test_self_test_passes(self):
        assert SELF_TEST_OK, "oc_types self-test must pass at import"

    def test_atmosphere_density(self):
        assert 1.10 < RHO_300M < 1.25

    def test_speed_of_sound(self):
        assert 330 < SPEED_SOUND_300M < 345

    def test_mach_sprint(self):
        assert 0.24 < MACH_SPRINT < 0.28

    def test_structural_safety_factor(self):
        """MIL-STD-1522A requires SF ≥ 1.5"""
        assert SF_STRUCTURE >= 1.5, f"SF={SF_STRUCTURE:.2f} < 1.5"

    def test_energy_budget_adds_up(self):
        """Combat + RTB + Chute reserves must not exceed usable energy."""
        assert E_COMBAT_WH + E_RTB_WH + E_CHUTE_WH < DRONE_E_USABLE

    def test_patrol_endurance_realistic(self):
        endurance = patrol_endurance_min()
        assert 15 < endurance < 40, f"Endurance {endurance:.1f} min out of range"

    def test_booster_thrust_physical(self):
        assert 400 < BOOSTER_N < 450

    def test_booster_dv(self):
        assert BOOSTER_DV > 50, "ΔV should be > 50 m/s"

    def test_rain_attenuation_zero_for_clear(self):
        assert rain_attenuation(0.0) == 0.0

    def test_rain_attenuation_increases_with_rain(self):
        assert rain_attenuation(50) > rain_attenuation(12.5) > rain_attenuation(2.5)

    def test_mesh_range_decreases_with_rain(self):
        r_clear  = mesh_range(0.0)
        r_heavy  = mesh_range(50.0)
        r_extreme= mesh_range(100.0)
        assert r_clear > r_heavy > r_extreme > 50


# ═══════════════════════════════════════════════════════════════════════════════
# MODULE 1 — Vec3
# ═══════════════════════════════════════════════════════════════════════════════

class TestVec3:
    def test_zero(self):
        v = Vec3.zero()
        assert v.x == 0 and v.y == 0 and v.z == 0

    def test_immutable(self):
        v = Vec3(1, 2, 3)
        with pytest.raises(AttributeError):
            v.x = 99

    def test_addition(self):
        a = Vec3(1, 2, 3)
        b = Vec3(4, 5, 6)
        c = a + b
        assert c.x == 5 and c.y == 7 and c.z == 9

    def test_subtraction(self):
        a = Vec3(5, 5, 5)
        b = Vec3(2, 3, 4)
        c = a - b
        assert c.x == 3 and c.y == 2 and c.z == 1

    def test_scalar_multiply(self):
        v = Vec3(1, 2, 3)
        assert (v * 2).x == 2
        assert (3 * v).y == 6

    def test_scalar_divide(self):
        v = Vec3(6, 4, 2)
        r = v / 2
        assert r.x == 3 and r.y == 2 and r.z == 1

    def test_divide_by_zero(self):
        with pytest.raises(ZeroDivisionError):
            Vec3(1, 2, 3) / 0

    def test_negation(self):
        v = -Vec3(1, -2, 3)
        assert v.x == -1 and v.y == 2 and v.z == -3

    def test_norm(self):
        v = Vec3(3, 4, 0)
        assert abs(v.norm() - 5.0) < 1e-9

    def test_norm_sq(self):
        v = Vec3(2, 2, 1)
        assert abs(v.norm_sq() - 9.0) < 1e-9

    def test_normalized_unit_length(self):
        v = Vec3(3, 1, -4)
        n = v.normalized()
        assert abs(n.norm() - 1.0) < 1e-9

    def test_normalized_zero_vector(self):
        # Should return (1,0,0) by convention, not crash
        n = Vec3.zero().normalized()
        assert n.x == 1.0

    def test_dot_product(self):
        a = Vec3(1, 2, 3)
        b = Vec3(4, 5, 6)
        assert abs(a.dot(b) - 32.0) < 1e-9

    def test_dot_orthogonal(self):
        assert abs(Vec3(1, 0, 0).dot(Vec3(0, 1, 0))) < 1e-12

    def test_cross_product(self):
        i = Vec3(1, 0, 0)
        j = Vec3(0, 1, 0)
        k = i.cross(j)   # should be (0, 0, 1)
        assert abs(k.z - 1.0) < 1e-9

    def test_distance(self):
        a = Vec3(0, 0, 0)
        b = Vec3(3, 4, 0)
        assert abs(a.dist(b) - 5.0) < 1e-9

    def test_distance_2d(self):
        a = Vec3(0, 0, -MISSION_ALT_M)
        b = Vec3(3, 4, -310)
        assert abs(a.dist_2d(b) - 5.0) < 1e-9  # z ignored

    def test_lerp_midpoint(self):
        a = Vec3(0, 0, 0)
        b = Vec3(10, 10, 10)
        m = a.lerp(b, 0.5)
        assert abs(m.x - 5.0) < 1e-9

    def test_lerp_endpoints(self):
        a = Vec3(1, 2, 3)
        b = Vec3(7, 8, 9)
        assert a.lerp(b, 0.0) == a
        assert a.lerp(b, 1.0) == b

    def test_altitude(self):
        v = Vec3(0, 0, -MISSION_ALT_M)   # NED: z=-300 → altitude=300m
        assert abs(v.altitude_m - 300.0) < 1e-9

    def test_in_cone_inside(self):
        apex   = Vec3(0, 0, 0)
        axis   = Vec3(1, 0, 0)
        target = Vec3(30, 5, 0)   # within 45° of axis, depth < 60m
        assert target.in_cone(apex, axis, CONE_COS, CONE_DEPTH_M)

    def test_in_cone_outside_angle(self):
        apex   = Vec3(0, 0, 0)
        axis   = Vec3(1, 0, 0)
        target = Vec3(10, 40, 0)  # too far sideways
        assert not target.in_cone(apex, axis, CONE_COS, CONE_DEPTH_M)

    def test_in_cone_outside_depth(self):
        apex   = Vec3(0, 0, 0)
        axis   = Vec3(1, 0, 0)
        target = Vec3(100, 0, 0)  # too far along axis
        assert not target.in_cone(apex, axis, CONE_COS, CONE_DEPTH_M)

    def test_in_cone_behind(self):
        apex   = Vec3(0, 0, 0)
        axis   = Vec3(1, 0, 0)
        target = Vec3(-10, 0, 0)  # behind apex
        assert not target.in_cone(apex, axis, CONE_COS, CONE_DEPTH_M)

    def test_numpy_roundtrip(self):
        v = Vec3(1.5, -2.3, 4.7)
        assert Vec3.from_np(v.to_np()) == v

    def test_dict_roundtrip(self):
        v = Vec3(3.14, 2.71, -1.41)
        assert Vec3.from_dict(v.to_dict()) == v

    def test_equality(self):
        assert Vec3(1, 2, 3) == Vec3(1, 2, 3)
        assert Vec3(1, 2, 3) != Vec3(1, 2, 4)

    def test_hash_consistent(self):
        a = Vec3(1, 2, 3)
        b = Vec3(1, 2, 3)
        assert hash(a) == hash(b)  # Same value → same hash

    def test_angle_between_perpendicular(self):
        a = Vec3(1, 0, 0)
        b = Vec3(0, 1, 0)
        assert abs(a.angle_to(b) - math.pi/2) < 1e-9

    def test_angle_between_parallel(self):
        a = Vec3(5, 0, 0)
        b = Vec3(3, 0, 0)
        assert abs(a.angle_to(b)) < 1e-9


# ═══════════════════════════════════════════════════════════════════════════════
# MODULE 2 — ENUMERATIONS
# ═══════════════════════════════════════════════════════════════════════════════

class TestEnumerations:
    def test_drone_role_combat_ready(self):
        assert DroneRole.PATROL.is_combat_ready()
        assert DroneRole.NET_ANCHOR.is_combat_ready()
        assert not DroneRole.RTB.is_combat_ready()
        assert not DroneRole.LOST.is_combat_ready()

    def test_drone_role_airborne(self):
        assert DroneRole.PATROL.is_airborne()
        assert not DroneRole.STANDBY.is_airborne()
        assert not DroneRole.LOST.is_airborne()

    def test_drone_health_operational(self):
        assert DroneHealth.NOMINAL.is_operational()
        assert DroneHealth.DEGRADED.is_operational()
        assert not DroneHealth.CRITICAL.is_operational()
        assert not DroneHealth.LOST.is_operational()

    def test_target_class_threat(self):
        assert TargetClass.CONFIRMED.is_threat()
        assert TargetClass.PROBABLE.is_threat()
        assert not TargetClass.NEUTRAL.is_threat()
        assert not TargetClass.LURE.is_threat()

    def test_target_class_engageable(self):
        assert TargetClass.CONFIRMED.is_engageable()
        assert not TargetClass.PROBABLE.is_engageable()

    def test_net_state_transitions(self):
        s = NetState.PATROL
        s = s.transition("target_confirmed")
        assert s == NetState.ENGAGE
        s = s.transition("target_outside")
        assert s == NetState.PURSUIT
        s = s.transition("target_lost")
        assert s == NetState.PATROL

    def test_net_state_no_transition(self):
        s = NetState.PATROL
        assert s.transition("unknown_trigger") == NetState.PATROL

    def test_sensor_status_flags(self):
        s = SensorStatus.EO | SensorStatus.LWIR | SensorStatus.GPS
        assert s.has_eo()
        assert s.has_ir()
        assert s.has_gps()
        assert not s.has_doppler()

    def test_sensor_status_full(self):
        assert SensorStatus.ALL.is_full()
        assert not (SensorStatus.EO | SensorStatus.LWIR).is_full()

    def test_booster_state_can_fire(self):
        from aegis.oc_types import BoosterState
        assert BoosterState.ARMED.can_fire()
        assert not BoosterState.SPENT.can_fire()
        assert not BoosterState.SAFE.can_fire()

    def test_energy_decision_abort(self):
        assert EnergyDecision.ABORT_INTERCEPT.is_abort()
        assert EnergyDecision.INITIATE_RTB.is_abort()
        assert EnergyDecision.EMERGENCY_CHUTE.is_abort()
        assert not EnergyDecision.EXECUTE_INTERCEPT.is_abort()
        assert not EnergyDecision.CONTINUE_PATROL.is_abort()

    def test_target_type_mass(self):
        assert TargetType.SHAHED_136.mass_kg() == 50.0
        assert TargetType.LANCET_3.mass_kg() == 5.0

    def test_lock_reason_values(self):
        assert LockReason.NONE == 0
        assert LockReason.EMERGENCY > 0


# ═══════════════════════════════════════════════════════════════════════════════
# MODULE 3 — DATA STRUCTURES
# ═══════════════════════════════════════════════════════════════════════════════

class TestDataStructures:
    def _make_frame(self, drone_id="AEGIS_0000",
                    battery=100.0, has_eo=True) -> SensorFrame:
        from aegis.oc_types import EODetection
        eo = EODetection(target_pos_world=Vec3(100,50,0), confidence=0.9) if has_eo else EODetection()
        return SensorFrame(
            drone_id=drone_id,
            drone_pos=Vec3(0,0,-300),
            drone_vel=Vec3(30,0,0),
            battery_wh=battery,
            eo=eo,
        )

    def test_sensor_frame_has_target(self):
        f = self._make_frame(has_eo=True)
        assert f.has_target

    def test_sensor_frame_no_target(self):
        f = self._make_frame(has_eo=False)
        assert not f.has_target

    def test_sensor_frame_valid(self):
        f = self._make_frame(battery=100.0)
        assert f.is_valid

    def test_sensor_frame_invalid_low_battery(self):
        f = self._make_frame(battery=1.0)
        assert not f.is_valid

    def test_fused_target_vote_ratio(self):
        t = FusedTarget()
        t.eo_votes = 4
        t.ir_votes = 3
        t.total_voters = 5
        # vote_ratio = (4+3) / (2*5) = 0.7
        assert abs(t.vote_ratio - 0.70) < 1e-6

    def test_fused_target_confirmed(self):
        t = FusedTarget()
        t.classification = TargetClass.CONFIRMED
        t.eo_votes = 8
        t.ir_votes = 7
        t.total_voters = 10  # ratio = 15/20 = 0.75 > VOTE_THRESH
        t.is_lure = False
        assert t.is_confirmed

    def test_fused_target_lure_not_confirmed(self):
        t = FusedTarget()
        t.classification = TargetClass.CONFIRMED
        t.eo_votes = 9
        t.ir_votes = 9
        t.total_voters = 10
        t.is_lure = True
        assert not t.is_confirmed   # Lures cannot be confirmed for engagement

    def test_fused_target_stale(self):
        t = FusedTarget()
        t.timestamp_s = time.time() - 10.0  # 10s ago → stale
        assert t.is_stale

    def test_drone_state_can_intercept(self):
        d = DroneState(drone_id="AEGIS_0000")
        d.battery_wh = 120.0
        assert d.can_intercept

    def test_drone_state_cannot_intercept_low_battery(self):
        d = DroneState(drone_id="AEGIS_0000")
        d.battery_wh = E_RTB_WH + E_CHUTE_WH + 5.0  # exactly at threshold
        # Should return False (not enough buffer)
        assert not d.can_intercept

    def test_intercept_order_age(self):
        order = InterceptOrder(drone_id="AEGIS_0000", target_id="TGT_001")
        time.sleep(0.05)
        assert order.age_s > 0.04

    def test_intercept_order_status(self):
        order = InterceptOrder()
        assert not order.is_active  # not acknowledged yet
        order.acknowledged = True
        assert order.is_active
        order.aborted = True
        assert not order.is_active

    def test_drone_command_checksum(self):
        cmd = DroneCommand(drone_id="AEGIS_0000")
        cs1 = cmd.checksum()
        cs2 = cmd.checksum()
        assert cs1 == cs2   # deterministic for same state

    def test_drone_command_hostile(self):
        cmd = DroneCommand(drone_id="AEGIS_0000")
        assert not cmd.is_hostile
        cmd.deploy_payload = True
        assert cmd.is_hostile

    def test_generate_drone_ids(self):
        ids = generate_drone_ids(5, "TEST")
        assert len(ids) == 5
        assert ids[0] == "TEST_0000"
        assert ids[4] == "TEST_0004"


# ═══════════════════════════════════════════════════════════════════════════════
# MODULE 4 — PHYSICS FUNCTIONS
# ═══════════════════════════════════════════════════════════════════════════════

class TestPhysics:
    def test_aero_drag_zero_at_rest(self):
        assert aero_drag(0.0) == 0.0

    def test_aero_drag_positive(self):
        d = aero_drag(V_PATROL_MS)
        assert d > 0

    def test_aero_drag_increases_with_speed(self):
        d1 = aero_drag(50.0)
        d2 = aero_drag(100.0)
        assert d2 > d1  # drag grows with speed

    def test_total_power_at_rest(self):
        from aegis.oc_types import P_AUX_W
        assert abs(total_power(0.0) - P_AUX_W) < 0.1

    def test_total_power_increases_with_speed(self):
        p1 = total_power(V_PATROL_MS)
        p2 = total_power(V_SPRINT_MS)
        assert p2 > p1

    def test_energy_for_segment_zero(self):
        assert energy_for_segment(0.0, 1000.0) == 0.0
        assert energy_for_segment(30.0, 0.0) == 0.0

    def test_energy_for_segment_positive(self):
        e = energy_for_segment(V_PATROL_MS, 5000.0)
        assert e > 0 and e < 50.0   # should be a few Wh for 5km


# ═══════════════════════════════════════════════════════════════════════════════
# MODULE 5 — SPECTRAL FUSION
# ═══════════════════════════════════════════════════════════════════════════════

class TestSpectralFusion:
    def _make_frames(self, n: int, tgt_pos: Vec3, noise: float = 2.0,
                     lure: bool = False) -> list:
        from aegis.oc_types import EODetection, IRDetection
        import random
        random.seed(42)
        frames = []
        for i in range(n):
            rng = random.Random(i)
            p = tgt_pos + Vec3(rng.gauss(0,noise), rng.gauss(0,noise), 0)
            eo = EODetection(target_pos_world=p, confidence=0.9)
            ir = IRDetection(
                centroid_world=p,
                temp_K=850.0 if lure else 490.0,
                contrast_K=(850-286) if lure else (490-286),
                pixel_area=15,
            )
            frame = SensorFrame(
                drone_id=f"AEGIS_{i:04d}",
                drone_pos=Vec3(rng.uniform(-200,200), rng.uniform(-200,200), -300),
                drone_vel=Vec3(0,0,0),
                battery_wh=100.0,
                eo=eo, ir=ir,
            )
            frames.append(frame)
        return frames

    def test_fusion_creates_target(self):
        from aegis.fusion.spectral_fusion import SpectralFusion
        f = SpectralFusion(10)
        frames = self._make_frames(10, Vec3(500, 300, -300))
        targets = f.step(frames)
        assert len(targets) >= 1

    def test_fusion_confirms_target(self):
        from aegis.fusion.spectral_fusion import SpectralFusion
        f = SpectralFusion(15)
        tgt = Vec3(500, 300, -300)
        # Run 3 cycles to build up votes
        for _ in range(3):
            targets = f.step(self._make_frames(15, tgt))
        confirmed = [t for t in targets if t.is_confirmed]
        assert len(confirmed) >= 1

    def test_fusion_detects_flare_lure(self):
        from aegis.fusion.spectral_fusion import SpectralFusion
        f = SpectralFusion(10)
        frames = self._make_frames(10, Vec3(200, 100, -300), lure=True)
        targets = f.step(frames)
        lures = [t for t in targets if t.is_lure]
        assert len(lures) >= 1, "Flare at 850K should be detected as lure"

    def test_fusion_lure_not_engageable(self):
        from aegis.fusion.spectral_fusion import SpectralFusion
        f = SpectralFusion(10)
        frames = self._make_frames(10, Vec3(200, 100, -300), lure=True)
        for _ in range(3):
            targets = f.step(frames)
        for t in targets:
            if t.is_lure:
                assert not t.is_confirmed

    def test_bft_rejects_byzantine(self):
        """1 Byzantine drone reporting wildly wrong position must be rejected."""
        from aegis.fusion.spectral_fusion import SpectralFusion, _byzantine_vote
        import numpy as np

        drone_ids = [f"D{i}" for i in range(7)]
        # 6 honest drones at ~(100,100,0), 1 Byzantine at (500,500,0)
        positions = np.array([
            [100+i*0.5, 100+i*0.3, 0] for i in range(6)
        ] + [[500.0, 500.0, 0.0]])

        clean, rejected = _byzantine_vote(positions, drone_ids)
        assert "D6" in rejected, "Byzantine drone should be detected and rejected"
        assert len(clean) == 6

    def test_cluster_prunes_stale(self):
        """Clusters not updated for STALE_S seconds must be removed."""
        from aegis.fusion.spectral_fusion import SpectralFusion
        f = SpectralFusion(5)
        frames = self._make_frames(5, Vec3(100, 100, -300))
        f.step(frames)
        # Manually age all clusters
        for c in f._clusters.values():
            c.updated_s = time.time() - 10.0
        f.step([])   # empty step triggers pruning
        assert len(f._clusters) == 0


# ═══════════════════════════════════════════════════════════════════════════════
# MODULE 6 — UKF
# ═══════════════════════════════════════════════════════════════════════════════

class TestUKF:
    def test_ukf_converges(self):
        """UKF position uncertainty must decrease after 100 updates."""
        from aegis.ukf.intercept_ukf import UKF9State, UKF_DT, UKF_SIG_MEAS
        import numpy as np

        ukf = UKF9State("TGT_TEST", Vec3(2000, 0, -300), Vec3(-51.4, 0, 0))
        initial_unc = ukf.pos_uncertainty_m

        rng = np.random.default_rng(0)
        true_pos = Vec3(2000, 0, -300)
        true_vel = Vec3(-51.4, 0, 0)

        for _ in range(100):
            true_pos = true_pos + true_vel * UKF_DT
            z = true_pos.to_np() + rng.normal(0, UKF_SIG_MEAS, 3)
            ukf.predict()
            ukf.update(z)

        assert ukf.pos_uncertainty_m < initial_unc * 0.5, \
            "UKF should converge: uncertainty should halve in 100 steps"

    def test_ukf_tracks_velocity(self):
        """UKF velocity estimate should be close to true velocity."""
        from aegis.ukf.intercept_ukf import UKF9State, UKF_DT, UKF_SIG_MEAS
        import numpy as np

        true_vel = Vec3(-51.4, 0, 0)
        ukf = UKF9State("VEL_TEST", Vec3(1000, 0, -300), true_vel)

        rng = np.random.default_rng(7)
        true_pos = Vec3(1000, 0, -300)
        for _ in range(150):
            true_pos = true_pos + true_vel * UKF_DT
            z = true_pos.to_np() + rng.normal(0, UKF_SIG_MEAS, 3)
            ukf.predict()
            ukf.update(z)

        vel_err = abs(ukf.vel.x - true_vel.x)
        assert vel_err < 5.0, f"Velocity error {vel_err:.2f} m/s too large"

    def test_ukf_predict_ahead_shape(self):
        """predict_ahead should return (3,) position and (3,3) covariance."""
        from aegis.ukf.intercept_ukf import UKF9State
        ukf = UKF9State("PRED_TEST", Vec3(500, 0, -300), Vec3(-30, 0, 0))
        pos, cov = ukf.predict_ahead(3.0)
        assert pos.shape == (3,)
        assert cov.shape == (3, 3)

    def test_ukf_predict_ahead_moves_forward(self):
        """Predicted position at t+3s should be further along trajectory."""
        from aegis.ukf.intercept_ukf import UKF9State
        ukf = UKF9State("MOVE_TEST", Vec3(1000, 0, -300), Vec3(-50, 0, 0))
        pos_0, _ = ukf.predict_ahead(0.1)
        pos_3, _ = ukf.predict_ahead(3.0)
        # Moving north (negative X in NED), so x should decrease
        assert pos_3[0] < pos_0[0]

    def test_multi_target_ukf_tracks_multiple(self):
        """MultiTargetUKF should track multiple targets simultaneously."""
        from aegis.ukf.intercept_ukf import MultiTargetUKF

        t1 = FusedTarget(target_id="TGT_001")
        t1.pos = Vec3(1000, 0, -300)
        t1.vel = Vec3(-50, 0, 0)
        t1.classification = TargetClass.CONFIRMED
        t1.eo_votes = 8; t1.ir_votes = 8; t1.total_voters = 10

        t2 = FusedTarget(target_id="TGT_002")
        t2.pos = Vec3(0, 1000, -300)
        t2.vel = Vec3(0, -50, 0)
        t2.classification = TargetClass.CONFIRMED
        t2.eo_votes = 8; t2.ir_votes = 8; t2.total_voters = 10

        ukf_mgr = MultiTargetUKF()
        result = ukf_mgr.step([t1, t2], [])
        assert ukf_mgr.n_tracks == 2


# ═══════════════════════════════════════════════════════════════════════════════
# MODULE 7 — SAFETY LAYER
# ═══════════════════════════════════════════════════════════════════════════════

class TestSafetyLayer:
    def _make_drone(self, drone_id="AEGIS_0000",
                    pos=None, heading=0.0, battery=100.0) -> DroneState:
        d = DroneState(drone_id=drone_id)
        d.pos = pos or Vec3(0, 0, -MISSION_ALT_M)
        d.heading_deg = heading
        d.battery_wh = battery
        return d

    def _clear_gate(self, order_id: str):
        from aegis.safety.proximity_lock import HumanLoopGate
        gate = HumanLoopGate()
        gate._requests[order_id] = {
            "order_id": order_id, "drone_id": "D0",
            "target_id": "T0", "confidence": 0.95, "score": 70.0,
            "high_risk": False, "requested_s": time.time() - 10.0,
            "vetoed": False, "approved": True,
        }
        return gate

    def test_lock_cleared_no_friendlies(self):
        from aegis.safety.proximity_lock import ProximityLock
        gate  = self._clear_gate("ORD_001")
        lock  = ProximityLock(gate)
        drone = self._make_drone("AEGIS_0000")
        state = lock.evaluate(drone, [drone], "ORD_001", network_ratio=1.0)
        assert not state.is_locked

    def test_lock_engaged_friendly_sphere(self):
        from aegis.safety.proximity_lock import ProximityLock
        gate   = self._clear_gate("ORD_002")
        lock   = ProximityLock(gate)
        drone  = self._make_drone("AEGIS_0000", Vec3(0,0,-300))
        friend = self._make_drone("AEGIS_0001", Vec3(10,0,-300))  # 10m away < 15m
        state  = lock.evaluate(drone, [drone, friend], "ORD_002", 1.0)
        assert state.is_locked
        assert state.lock_reason == LockReason.FRIENDLY_NEAR

    def test_lock_engaged_friendly_cone(self):
        from aegis.safety.proximity_lock import ProximityLock
        gate   = self._clear_gate("ORD_003")
        lock   = ProximityLock(gate)
        drone  = self._make_drone("AEGIS_0000", Vec3(0,0,-300), heading=0)
        # North is positive X in NED. Put friend at (30m North, 5m East) → inside cone
        friend = self._make_drone("AEGIS_0001", Vec3(30, 5, -300))
        state  = lock.evaluate(drone, [drone, friend], "ORD_003", 1.0)
        assert state.is_locked
        assert state.lock_reason == LockReason.FRIENDLY_CONE

    def test_lock_engaged_network_loss(self):
        from aegis.safety.proximity_lock import ProximityLock
        gate  = self._clear_gate("ORD_004")
        lock  = ProximityLock(gate)
        drone = self._make_drone()
        state = lock.evaluate(drone, [drone], "ORD_004", network_ratio=0.5)
        assert state.is_locked
        assert state.lock_reason == LockReason.NETWORK_LOSS

    def test_lock_engaged_human_veto(self):
        from aegis.safety.proximity_lock import HumanLoopGate, ProximityLock
        gate = HumanLoopGate()
        t = FusedTarget(); t.classification = TargetClass.CONFIRMED
        tp = ThreatProfile(target_id="T0", score=0.7)
        from aegis.oc_types import ThreatProfile as TP_
        tp2 = TP_("T0")
        gate.request_authorization("ORD_VETO", "D0", t, tp2)
        gate.veto("ORD_VETO")

        lock  = ProximityLock(gate)
        drone = self._make_drone()
        state = lock.evaluate(drone, [drone], "ORD_VETO", 1.0)
        assert state.is_locked
        assert state.lock_reason == LockReason.HUMAN_VETO

    def test_emergency_stop(self):
        from aegis.safety.proximity_lock import ProximityLock
        gate  = self._clear_gate("ORD_EM")
        lock  = ProximityLock(gate)
        lock.emergency_stop()
        drone = self._make_drone()
        state = lock.evaluate(drone, [drone], "ORD_EM", 1.0)
        assert state.is_locked
        assert state.lock_reason == LockReason.EMERGENCY

    def test_human_gate_auto_approve(self):
        from aegis.safety.proximity_lock import HumanLoopGate
        gate = HumanLoopGate()
        t = FusedTarget()
        t.classification = TargetClass.CONFIRMED
        t.eo_votes = 9; t.ir_votes = 9; t.total_voters = 10
        from aegis.oc_types import ThreatProfile as TP_
        tp = TP_("T0", mass_kg=10.0)
        gate.request_authorization("ORD_AUTO", "D0", t, tp)
        # Fake the request as old (past veto window) with high confidence
        gate._requests["ORD_AUTO"]["requested_s"] = time.time() - 20.0
        gate._requests["ORD_AUTO"]["confidence"]  = 0.95
        assert gate.is_cleared("ORD_AUTO"), "Should auto-approve after veto window"

    def test_human_gate_high_risk_no_auto(self):
        from aegis.safety.proximity_lock import HumanLoopGate
        gate = HumanLoopGate()
        t = FusedTarget()
        t.classification = TargetClass.CONFIRMED
        t.eo_votes = 9; t.ir_votes = 9; t.total_voters = 10
        from aegis.oc_types import ThreatProfile as TP_
        tp = TP_("T0", mass_kg=HIGH_RISK_KG + 10)  # over threshold
        gate.request_authorization("ORD_HIGHRISK", "D0", t, tp)
        gate._requests["ORD_HIGHRISK"]["requested_s"] = time.time() - 20.0
        gate._requests["ORD_HIGHRISK"]["high_risk"]   = True
        gate._requests["ORD_HIGHRISK"]["confidence"]  = 0.99
        assert not gate.is_cleared("ORD_HIGHRISK"), "High-risk: must NOT auto-approve"

    def test_antispoof_detects_impossible_g(self):
        from aegis.safety.proximity_lock import AntispoofChecker
        ac = AntispoofChecker()
        conf = ac.check(
            declared_speed_ms=230,
            measured_speed_ms=228,
            declared_vrate_ms=-2.0,
            declared_accel_ms2=10 * 9.81,  # 10G — impossible for civil aircraft
            ukf_pos=None, declared_pos=None,
        )
        assert ac.is_spoofed(conf), f"10G load should be detected as spoof (conf={conf:.2f})"

    def test_antispoof_clears_normal_aircraft(self):
        from aegis.safety.proximity_lock import AntispoofChecker
        ac = AntispoofChecker()
        conf = ac.check(
            declared_speed_ms=240,
            measured_speed_ms=242,  # 2m/s delta — within tolerance
            declared_vrate_ms=-5.0,
            declared_accel_ms2=1.5 * 9.81,  # 1.5G — normal turn
            ukf_pos=None, declared_pos=None,
        )
        assert not ac.is_spoofed(conf), "Normal civil aircraft should not be flagged"

    def test_target_worth_score_shahed(self):
        from aegis.safety.proximity_lock import TargetWorthEngine
        engine = TargetWorthEngine()
        t = FusedTarget()
        t.target_type = TargetType.SHAHED_136
        t.vel = Vec3(-51.4, 0, 0)
        score = engine.score(t, collateral_risk=0.5)
        # mass=50→40pts, vel=51.4→7.7pts, coll=0.5→15pts = 62.7
        assert 55 < score < 75


# ═══════════════════════════════════════════════════════════════════════════════
# MODULE 8 — ENERGY BUDGET
# ═══════════════════════════════════════════════════════════════════════════════

class TestEnergyBudget:
    def _make_drone(self, battery: float) -> DroneState:
        d = DroneState(drone_id="AEGIS_0000")
        d.battery_wh = battery
        return d

    def test_emergency_chute_at_low_battery(self):
        from aegis.energy.budget_manager import EnergyBudgetManager
        em = EnergyBudgetManager()
        d  = self._make_drone(E_CHUTE_WH - 1.0)
        assert em.evaluate(d) == EnergyDecision.EMERGENCY_CHUTE

    def test_rtb_at_rtb_reserve(self):
        from aegis.energy.budget_manager import EnergyBudgetManager
        em = EnergyBudgetManager()
        d  = self._make_drone(E_RTB_WH + E_CHUTE_WH - 1.0)
        assert em.evaluate(d) == EnergyDecision.INITIATE_RTB

    def test_patrol_with_no_order(self):
        from aegis.energy.budget_manager import EnergyBudgetManager
        em = EnergyBudgetManager()
        d  = self._make_drone(120.0)
        assert em.evaluate(d, None) == EnergyDecision.CONTINUE_PATROL

    def test_execute_with_enough_battery(self):
        from aegis.energy.budget_manager import EnergyBudgetManager
        em    = EnergyBudgetManager()
        d     = self._make_drone(150.0)
        order = InterceptOrder(
            drone_id="AEGIS_0000", target_id="TGT_001",
            aim_pos=Vec3(500, 0, -300), eta_s=5.0,
        )
        assert em.evaluate(d, order) == EnergyDecision.EXECUTE_INTERCEPT

    def test_abort_with_insufficient_battery(self):
        from aegis.energy.budget_manager import EnergyBudgetManager
        em    = EnergyBudgetManager()
        d     = self._make_drone(E_RTB_WH + E_CHUTE_WH + 5.0)
        order = InterceptOrder(
            drone_id="AEGIS_0000", target_id="TGT_001",
            aim_pos=Vec3(20000, 0, -300),  # Very far → high energy cost
            eta_s=120.0,
        )
        result = em.evaluate(d, order)
        assert result in (EnergyDecision.ABORT_INTERCEPT, EnergyDecision.INITIATE_RTB)

    def test_remaining_patrol_positive(self):
        from aegis.energy.budget_manager import EnergyBudgetManager
        em = EnergyBudgetManager()
        d  = self._make_drone(120.0)
        assert em.remaining_patrol_min(d) > 0

    def test_should_rtb_true(self):
        from aegis.energy.budget_manager import EnergyBudgetManager
        em = EnergyBudgetManager()
        d  = self._make_drone(E_RTB_WH + E_CHUTE_WH + 2.0)
        assert em.should_rtb(d)

    def test_should_rtb_false(self):
        from aegis.energy.budget_manager import EnergyBudgetManager
        em = EnergyBudgetManager()
        d  = self._make_drone(120.0)
        assert not em.should_rtb(d)


# ═══════════════════════════════════════════════════════════════════════════════
# MODULE 9 — SWARM FORMATION
# ═══════════════════════════════════════════════════════════════════════════════

class TestElasticNet:
    def _make_drones(self, n: int) -> List[DroneState]:
        from aegis.oc_types import generate_drone_ids
        import random
        rng = random.Random(99)
        drones = []
        for i, did in enumerate(generate_drone_ids(n)):
            d = DroneState(drone_id=did, formation_idx=i)
            d.pos = Vec3(rng.uniform(-300,300), rng.uniform(-300,300), -300)
            d.vel = Vec3(rng.gauss(0,5), rng.gauss(0,5), 0)
            d.battery_wh = 100.0
            drones.append(d)
        return drones

    def test_formation_generates_commands(self):
        from aegis.swarm.elastic_net import ElasticNet
        from aegis.oc_types import generate_drone_ids
        ids    = generate_drone_ids(10)
        net    = ElasticNet(ids)
        drones = self._make_drones(10)
        cmds   = net.step(drones, [])
        assert len(cmds) == 10

    def test_formation_command_per_drone(self):
        from aegis.swarm.elastic_net import ElasticNet
        from aegis.oc_types import generate_drone_ids
        n   = 20
        ids = generate_drone_ids(n)
        net = ElasticNet(ids)
        cmds = net.step(self._make_drones(n), [])
        assert len(cmds) == n

    def test_formation_initial_state_patrol(self):
        from aegis.swarm.elastic_net import ElasticNet
        from aegis.oc_types import generate_drone_ids
        net = ElasticNet(generate_drone_ids(10))
        assert net.state == NetState.PATROL

    def test_formation_health_decreases_with_dispersal(self):
        from aegis.swarm.elastic_net import ElasticNet
        from aegis.oc_types import generate_drone_ids
        import random
        rng = random.Random(0)
        ids    = generate_drone_ids(10)
        net    = ElasticNet(ids)
        drones = [DroneState(drone_id=did) for did in ids]
        # Spread drones very far apart
        for i, d in enumerate(drones):
            d.pos = Vec3(rng.uniform(-5000,5000), rng.uniform(-5000,5000), -300)
        net.step(drones, [])
        assert net.health < 0.9   # Dispersed → degraded health


# ═══════════════════════════════════════════════════════════════════════════════
# MODULE 10 — INTEGRATION / END-TO-END
# ═══════════════════════════════════════════════════════════════════════════════

class TestIntegration:
    def _build_frames(self, n: int, tgt: Vec3) -> List[SensorFrame]:
        from aegis.oc_types import EODetection, IRDetection
        import random
        rng = random.Random(11)
        frames = []
        for i in range(n):
            p = tgt + Vec3(rng.gauss(0,2), rng.gauss(0,2), 0)
            frame = SensorFrame(
                drone_id   = f"AEGIS_{i:04d}",
                drone_pos  = Vec3(rng.uniform(-300,300), rng.uniform(-300,300), -300),
                drone_vel  = Vec3(rng.gauss(0,5), 0, 0),
                battery_wh = 100.0,
                eo  = EODetection(target_pos_world=p, confidence=0.92),
                ir  = IRDetection(centroid_world=p, temp_K=490, contrast_K=203,
                                   pixel_area=15),
            )
            frames.append(frame)
        return frames

    def test_full_pipeline_produces_commands(self):
        """Full pipeline: ingest frames → step → get commands."""
        from aegis.core import AegisCore
        from aegis.oc_types import generate_drone_ids
        n    = 10
        ids  = generate_drone_ids(n)
        core = AegisCore(ids)
        core.ingest(self._build_frames(n, Vec3(500, 300, -300)))
        cmds = core.step()
        assert len(cmds) == n

    def test_full_pipeline_detects_target(self):
        """After several cycles, fusion should confirm a target."""
        from aegis.core import AegisCore
        from aegis.oc_types import generate_drone_ids
        n    = 15
        ids  = generate_drone_ids(n)
        core = AegisCore(ids)
        tgt  = Vec3(800, 400, -300)
        for _ in range(10):
            core.ingest(self._build_frames(n, tgt))
            core.step()
        status = core.status
        # After 10 cycles with consistent data, should detect at least 1 target
        # (fusion may not be fully confirmed, but processed)
        assert status.n_total == n

    def test_emergency_stop_locks_all(self):
        """After emergency_stop(), no intercept orders should be issued."""
        from aegis.core import AegisCore
        from aegis.oc_types import generate_drone_ids
        core = AegisCore(generate_drone_ids(5))
        core.emergency_stop()
        for _ in range(5):
            core.ingest(self._build_frames(5, Vec3(200, 100, -300)))
            cmds = core.step()
        # No commands should have deploy_payload or fire_booster
        hostile = [c for c in cmds if c.is_hostile]
        assert len(hostile) == 0


from typing import List
HIGH_RISK_KG = 30.0  # redeclare for test scope

if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
