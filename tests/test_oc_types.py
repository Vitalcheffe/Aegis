"""Tests unitaires — oc_types.py"""
import math, sys, os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'src'))
import pytest
from aegis.oc_types import *


class TestVec3:
    def test_basic_ops(self):
        v1 = Vec3(1, 2, 3)
        v2 = Vec3(4, 5, 6)
        assert (v1 + v2) == Vec3(5, 7, 9)
        assert (v2 - v1) == Vec3(3, 3, 3)
        assert (v1 * 2)  == Vec3(2, 4, 6)
        assert (v1 / 2)  == Vec3(0.5, 1, 1.5)

    def test_norm(self):
        v = Vec3(3, 4, 0)
        assert abs(v.norm() - 5.0) < 1e-9

    def test_dot(self):
        v1 = Vec3(1, 0, 0)
        v2 = Vec3(0, 1, 0)
        assert abs(v1.dot(v2)) < 1e-9       # perpendiculaires
        assert abs(v1.dot(v1) - 1.0) < 1e-9 # auto = 1

    def test_normalized(self):
        v = Vec3(3, 4, 0)
        n = v.normalized()
        assert abs(n.norm() - 1.0) < 1e-9
        assert abs(n.x - 0.6) < 1e-9
        assert abs(n.y - 0.8) < 1e-9

    def test_immutable(self):
        v = Vec3(1, 2, 3)
        with pytest.raises(AttributeError):
            v.x = 99

    def test_cross(self):
        # x × y = z
        vx = Vec3(1, 0, 0)
        vy = Vec3(0, 1, 0)
        vz = vx.cross(vy)
        assert abs(vz.z - 1.0) < 1e-9
        assert abs(vz.x) < 1e-9
        assert abs(vz.y) < 1e-9

    def test_in_cone_inside(self):
        apex   = Vec3(0, 0, 0)
        axis   = Vec3(1, 0, 0)
        target = Vec3(30, 5, 0)   # dans le cône 45° à 30m
        assert target.in_cone(apex, axis, CONE_COS, CONE_DEPTH_M)

    def test_in_cone_outside_angle(self):
        apex   = Vec3(0, 0, 0)
        axis   = Vec3(1, 0, 0)
        target = Vec3(30, 40, 0)  # trop loin sur le côté
        assert not target.in_cone(apex, axis, CONE_COS, CONE_DEPTH_M)

    def test_in_cone_outside_depth(self):
        apex   = Vec3(0, 0, 0)
        axis   = Vec3(1, 0, 0)
        target = Vec3(70, 0, 0)   # trop loin (> 60m)
        assert not target.in_cone(apex, axis, CONE_COS, CONE_DEPTH_M)

    def test_altitude_property(self):
        # NED: z=-300 = altitude 300m
        v = Vec3(100, 200, -300)
        assert abs(v.altitude_m - 300) < 1e-6

    def test_dist(self):
        a = Vec3(0, 0, 0)
        b = Vec3(3, 4, 0)
        assert abs(a.dist(b) - 5.0) < 1e-9

    def test_lerp(self):
        a = Vec3(0, 0, 0)
        b = Vec3(10, 0, 0)
        m = a.lerp(b, 0.5)
        assert abs(m.x - 5.0) < 1e-9

    def test_numpy_roundtrip(self):
        v  = Vec3(1.5, 2.5, 3.5)
        np_arr = v.to_np()
        v2 = Vec3.from_np(np_arr)
        assert v == v2

    def test_zero_division(self):
        v = Vec3(1, 2, 3)
        with pytest.raises(ZeroDivisionError):
            _ = v / 0.0


class TestPhysicsConstants:
    def test_rho_range(self):
        assert 1.10 < RHO_300M < 1.25, f"ρ={RHO_300M}"

    def test_v_stall_physical(self):
        assert 10 < V_STALL_MS < 25, f"V_stall={V_STALL_MS}"

    def test_v_patrol_optimal(self):
        # V_patrol doit être entre stall et dash
        assert V_STALL_MS < V_PATROL_MS < V_DASH_MS

    def test_safety_factor(self):
        assert SF_STRUCTURE >= 1.5, f"SF={SF_STRUCTURE} < 1.5 (MIL-STD-1522A)"

    def test_energy_reserves_coherence(self):
        total_reserved = E_RESERVE_COMBAT + E_RESERVE_RTB_WH + E_RESERVE_CHUTE_WH
        assert total_reserved < DRONE_E_USABLE, "Les réserves dépassent l'énergie utilisable"
        assert E_PATROL_WH > 0

    def test_booster_physics(self):
        assert BOOSTER_THRUST_N > 400, f"Thrust={BOOSTER_THRUST_N}N"
        assert BOOSTER_DV_MS > 80, f"ΔV={BOOSTER_DV_MS}m/s"

    def test_itu_attenuation(self):
        from aegis.oc_types import rain_attenuation_db_km
        assert rain_attenuation_db_km(0) == 0.0
        assert rain_attenuation_db_km(50) > 5.0   # pluie intense → forte atténuation

    def test_cone_cos_value(self):
        import math
        expected = math.cos(math.radians(45))
        assert abs(CONE_COS - expected) < 1e-9


class TestEnumerations:
    def test_drone_role_airborne(self):
        assert DroneRole.PATROL.is_airborne()
        assert DroneRole.SPRINT.is_airborne()
        assert not DroneRole.STANDBY.is_airborne()
        assert not DroneRole.RECOVERY.is_airborne()

    def test_drone_role_combat_ready(self):
        assert DroneRole.PATROL.is_combat_ready()
        assert not DroneRole.RTB.is_combat_ready()
        assert not DroneRole.SPRINT.is_combat_ready()

    def test_target_class_engageable(self):
        assert TargetClass.CONFIRMED.is_engageable()
        assert not TargetClass.PROBABLE.is_engageable()
        assert not TargetClass.LURE.is_engageable()

    def test_sensor_status_flags(self):
        s = SensorStatus.EO | SensorStatus.LWIR | SensorStatus.GPS
        assert s.has_eo()
        assert s.has_ir()
        assert s.has_gps()
        assert not s.has_doppler()
        assert s.sensor_count() == 3

    def test_energy_decision_abort(self):
        assert EnergyDecision.ABORT_INTERCEPT.is_abort()
        assert EnergyDecision.INITIATE_RTB.is_abort()
        assert EnergyDecision.EMERGENCY_CHUTE.is_abort()
        assert not EnergyDecision.EXECUTE_INTERCEPT.is_abort()

    def test_net_state_transitions(self):
        s = NetState.PATROL
        assert s.transition('target_confirmed') == NetState.ENGAGE
        assert s.transition('unknown_trigger')  == NetState.PATROL  # idempotent


class TestDataclasses:
    def test_fused_target_vote_ratio(self):
        t = FusedTarget(target_id="TGT_TEST")
        t.total_voters = 10
        t.eo_votes     = 7
        t.ir_votes     = 6
        # vote_ratio = (7+6) / (2×10) = 0.65
        assert abs(t.vote_ratio - 0.65) < 1e-9

    def test_fused_target_confirmed(self):
        t = FusedTarget(target_id="TGT_CONF")
        t.classification = TargetClass.CONFIRMED
        t.total_voters   = 10
        t.eo_votes       = 8
        t.ir_votes       = 8
        t.is_lure        = False
        assert t.is_confirmed

    def test_fused_target_lure_not_confirmed(self):
        t = FusedTarget(target_id="TGT_LURE")
        t.classification = TargetClass.LURE
        t.is_lure        = True
        t.total_voters   = 10
        t.eo_votes       = 9
        t.ir_votes       = 9
        assert not t.is_confirmed  # lure → jamais engageable

    def test_drone_state_battery(self):
        d = DroneState(drone_id="AEGIS_0001")
        d.battery_wh = DRONE_E_USABLE * 0.5
        assert abs(d.battery_pct - 0.5) < 1e-6

    def test_threat_profile_score(self):
        p = ThreatProfile(target_id="T1", mass_kg=50, velocity_ms=51.4, collateral_risk=0.5)
        score = p.threat_score
        # (50/50)×40 + (51.4/200)×30 + 0.5×30 = 40 + 7.7 + 15 = 62.7
        assert 55 < score < 70, f"score={score}"


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
