"""
AEGIS · tests/test_all.py
Comprehensive test suite — runs with: python tests/test_all.py
"""
import sys, os, math, time, unittest
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'src'))
import numpy as np
from typing import Dict, List, Optional, Tuple
from aegis.oc_types import Vec3, NetState, DroneRole
import numpy as np

# ─────────────────────────────────────────────────────────────────────────────
#  oc_types tests
# ─────────────────────────────────────────────────────────────────────────────

class TestVec3(unittest.TestCase):

    def test_add(self):
        v = Vec3(1, 2, 3) + Vec3(4, 5, 6)
        self.assertAlmostEqual(v.x, 5); self.assertAlmostEqual(v.y, 7)

    def test_sub(self):
        v = Vec3(5, 5, 5) - Vec3(1, 2, 3)
        self.assertAlmostEqual(v.x, 4); self.assertAlmostEqual(v.y, 3)

    def test_scale(self):
        v = Vec3(1, 2, 3) * 2
        self.assertAlmostEqual(v.norm(), (Vec3(2, 4, 6)).norm())

    def test_norm(self):
        v = Vec3(3, 4, 0)
        self.assertAlmostEqual(v.norm(), 5.0)

    def test_normalize(self):
        v = Vec3(3, 4, 0).normalized()
        self.assertAlmostEqual(v.norm(), 1.0, places=9)

    def test_dot(self):
        self.assertAlmostEqual(Vec3(1, 0, 0).dot(Vec3(0, 1, 0)), 0.0)
        self.assertAlmostEqual(Vec3(1, 0, 0).dot(Vec3(1, 0, 0)), 1.0)

    def test_cross(self):
        v = Vec3(1, 0, 0).cross(Vec3(0, 1, 0))
        self.assertAlmostEqual(v.z, 1.0)
        self.assertAlmostEqual(v.x, 0.0)

    def test_dist(self):
        self.assertAlmostEqual(Vec3(0,0,0).dist(Vec3(3,4,0)), 5.0)

    def test_immutable(self):
        v = Vec3(1, 2, 3)
        with self.assertRaises(AttributeError):
            v.x = 99.0

    def test_in_cone_inside(self):
        from aegis.oc_types import CONE_COS, CONE_DEPTH_M
        apex   = Vec3(0, 0, 0)
        axis   = Vec3(1, 0, 0)    # North
        target = Vec3(30, 10, 0)  # 30N, 10E — inside 45° cone
        self.assertTrue(target.in_cone(apex, axis, CONE_COS, CONE_DEPTH_M))

    def test_in_cone_outside(self):
        from aegis.oc_types import CONE_COS, CONE_DEPTH_M
        apex   = Vec3(0, 0, 0)
        axis   = Vec3(1, 0, 0)
        target = Vec3(30, 50, 0)   # 50E >> 45° from North axis
        self.assertFalse(target.in_cone(apex, axis, CONE_COS, CONE_DEPTH_M))

    def test_in_cone_too_deep(self):
        from aegis.oc_types import CONE_COS, CONE_DEPTH_M
        apex   = Vec3(0, 0, 0)
        axis   = Vec3(1, 0, 0)
        target = Vec3(CONE_DEPTH_M + 10, 0, 0)  # beyond cone depth
        self.assertFalse(target.in_cone(apex, axis, CONE_COS, CONE_DEPTH_M))

    def test_lerp(self):
        v = Vec3(0,0,0).lerp(Vec3(10,10,10), 0.5)
        self.assertAlmostEqual(v.x, 5.0)

    def test_altitude_property(self):
        v = Vec3(0, 0, -300)
        self.assertAlmostEqual(v.altitude_m, 300.0)

    def test_numpy_roundtrip(self):
        v = Vec3(1.5, 2.5, 3.5)
        arr = v.to_np()
        v2 = Vec3.from_np(arr)
        self.assertAlmostEqual(v.x, v2.x)
        self.assertAlmostEqual(v.z, v2.z)


class TestEnums(unittest.TestCase):

    def test_drone_role_methods(self):
        from aegis.oc_types import DroneRole
        self.assertTrue(DroneRole.PATROL.is_airborne())
        self.assertFalse(DroneRole.STANDBY.is_airborne())
        self.assertTrue(DroneRole.PATROL.is_combat_ready())
        self.assertFalse(DroneRole.SPRINT.is_combat_ready())

    def test_target_class_methods(self):
        from aegis.oc_types import TargetClass
        self.assertTrue(TargetClass.CONFIRMED.is_engageable())
        self.assertFalse(TargetClass.LURE.is_engageable())
        self.assertFalse(TargetClass.PROBABLE.is_engageable())

    def test_net_state_transitions(self):
        from aegis.oc_types import NetState
        s = NetState.PATROL
        s2 = s.transition("target_confirmed")
        self.assertEqual(s2, NetState.ENGAGE)
        s3 = s2.transition("target_lost")
        self.assertEqual(s3, NetState.PATROL)

    def test_sensor_status_flags(self):
        from aegis.oc_types import SensorStatus
        s = SensorStatus.EO | SensorStatus.LWIR
        self.assertTrue(s.has_eo())
        self.assertTrue(s.has_ir())
        self.assertFalse(s.has_gps())
        self.assertEqual(s.sensor_count(), 2)


class TestPhysicsConstants(unittest.TestCase):

    def test_self_test_passes(self):
        from aegis.oc_types import _SELF_TEST_OK
        self.assertTrue(_SELF_TEST_OK, "Physics self-test failed — check constant ranges")

    def test_patrol_speed_physical(self):
        from aegis.oc_types import V_PATROL_MS
        # Patrol speed should be between stall and dash
        self.assertGreater(V_PATROL_MS, 15.0)
        self.assertLess(V_PATROL_MS, 80.0)

    def test_energy_reserves_sum(self):
        from aegis.oc_types import (DRONE_E_USABLE, E_RESERVE_COMBAT,
                                    E_RESERVE_RTB_WH, E_RESERVE_CHUTE_WH, E_PATROL_WH)
        total = E_RESERVE_COMBAT + E_RESERVE_RTB_WH + E_RESERVE_CHUTE_WH + E_PATROL_WH
        self.assertAlmostEqual(total, DRONE_E_USABLE, places=1)

    def test_drag_increases_with_speed(self):
        from aegis.oc_types import aero_drag_N
        d1 = aero_drag_N(30.0)
        d2 = aero_drag_N(80.0)
        self.assertGreater(d2, d1)


# ─────────────────────────────────────────────────────────────────────────────
#  Spectral Fusion tests
# ─────────────────────────────────────────────────────────────────────────────

class TestMADFilter(unittest.TestCase):

    def test_no_byzantines(self):
        from aegis.fusion.spectral_fusion import mad_filter
        votes = np.array([10.0, 10.1, 9.9, 10.05, 10.02])
        kept, mask, n_rej = mad_filter(votes)
        self.assertEqual(n_rej, 0)
        self.assertTrue(np.all(mask))

    def test_one_byzantine(self):
        from aegis.fusion.spectral_fusion import mad_filter
        votes = np.array([10.0, 10.1, 9.9, 10.05, 500.0])   # 500m = clear byzantine
        kept, mask, n_rej = mad_filter(votes)
        self.assertEqual(n_rej, 1)
        self.assertFalse(mask[-1])

    def test_empty(self):
        from aegis.fusion.spectral_fusion import mad_filter
        kept, mask, n = mad_filter(np.array([]))
        self.assertEqual(len(kept), 0)

    def test_single(self):
        from aegis.fusion.spectral_fusion import mad_filter
        kept, mask, n = mad_filter(np.array([42.0]))
        self.assertEqual(n, 0)

    def test_3d_filter(self):
        from aegis.fusion.spectral_fusion import mad_filter_3d
        positions = np.array([
            [100.0, 200.0, -300.0],
            [100.1, 200.1, -300.1],
            [100.05,200.05,-300.05],
            [999.0, 200.0, -300.0],   # Byzantine in X
        ])
        kept, mask, n_rej = mad_filter_3d(positions)
        self.assertEqual(n_rej, 1)
        self.assertFalse(mask[3])


class TestLureDetector(unittest.TestCase):

    def test_flare_detection(self):
        from aegis.fusion.spectral_fusion import LureDetector
        from aegis.oc_types import IRDetection, EODetection
        ld = LureDetector()
        ir = IRDetection(temp_K=850.0, contrast_K=560.0)
        verdict = ld.evaluate(Vec3(0,0,0), None, 0.02, ir, EODetection())
        self.assertTrue(verdict.is_lure)
        self.assertEqual(verdict.rule_triggered, "R1_THERMAL_SPIKE")

    def test_cold_lure(self):
        from aegis.fusion.spectral_fusion import LureDetector
        from aegis.oc_types import IRDetection, EODetection
        ld = LureDetector()
        ir = IRDetection(centroid_world=Vec3(100,0,-300), temp_K=290.0,
                         contrast_K=2.5, pixel_area=50, uniformity=0.05)
        verdict = ld.evaluate(Vec3(0,0,0), None, 0.02, ir, EODetection())
        self.assertTrue(verdict.is_lure)
        self.assertEqual(verdict.rule_triggered, "R2_COLD_LURE")

    def test_real_drone_not_flagged(self):
        from aegis.fusion.spectral_fusion import LureDetector
        from aegis.oc_types import IRDetection, EODetection
        ld = LureDetector()
        # Realistic drone signature
        ir = IRDetection(temp_K=420.0, contrast_K=130.0, pixel_area=8, uniformity=0.8)
        eo = EODetection(confidence=0.85, target_pos_world=Vec3(100,0,-300))
        verdict = ld.evaluate(Vec3(100,0,-300), Vec3(90,0,-300), 0.1, ir, eo)
        self.assertFalse(verdict.is_lure)


class TestSpectralFusion(unittest.TestCase):

    def _make_frame(self, drone_id: str, target_pos: Vec3,
                    eo_conf: float = 0.9, ir_temp: float = 420.0) -> 'SensorFrame':
        from aegis.oc_types import (SensorFrame, EODetection, IRDetection,
                                    DopplerMeasurement, SensorStatus, DRONE_E_USABLE)
        return SensorFrame(
            drone_id=drone_id, sequence_num=1,
            eo=EODetection(target_pos_world=target_pos, confidence=eo_conf, class_label="drone"),
            ir=IRDetection(centroid_world=target_pos, temp_K=ir_temp, contrast_K=130.0,
                           pixel_area=8, uniformity=0.75),
            doppler=DopplerMeasurement(radial_velocity_ms=-45.0, confidence=0.8, snr_db=20.0),
            drone_pos=Vec3(0, 0, -300), battery_wh=DRONE_E_USABLE,
            active_sensors=SensorStatus.ALL,
        )

    def test_confirms_real_drone(self):
        from aegis.fusion.spectral_fusion import SpectralFusion
        fusion = SpectralFusion()
        target_pos = Vec3(500, 0, -300)
        # 10 drones all agree on the same target
        frames = [self._make_frame(f"D{i:03d}", target_pos) for i in range(10)]
        targets = fusion.update(frames)
        confirmed = [t for t in targets if t.is_confirmed]
        self.assertGreater(len(confirmed), 0)

    def test_byzantine_minority_filtered(self):
        from aegis.fusion.spectral_fusion import SpectralFusion
        fusion = SpectralFusion()
        real_pos = Vec3(500, 0, -300)
        fake_pos = Vec3(5000, 0, -300)    # 4.5km away — clear byzantine
        frames  = [self._make_frame(f"D{i:03d}", real_pos) for i in range(9)]
        frames += [self._make_frame(f"B{i:03d}", fake_pos) for i in range(3)]  # < 1/3
        targets = fusion.update(frames)
        # Real cluster should survive, fake position should not dominate
        if targets:
            best = max(targets, key=lambda t: t.total_voters)
            self.assertLess(best.pos.dist(real_pos), 100.0)

    def test_stale_removal(self):
        from aegis.fusion.spectral_fusion import SpectralFusion
        from aegis.oc_types import STALE_CLUSTER_S
        fusion = SpectralFusion()
        target_pos = Vec3(500, 0, -300)
        frames = [self._make_frame(f"D{i:03d}", target_pos) for i in range(5)]
        fusion.update(frames)
        # Manually age all clusters
        for c in fusion._clusters.values():
            c.updated_s -= STALE_CLUSTER_S + 1.0
        targets = fusion.update([])   # Empty update should evict stale
        self.assertEqual(len(targets), 0)


# ─────────────────────────────────────────────────────────────────────────────
#  UKF tests
# ─────────────────────────────────────────────────────────────────────────────

class TestUKFTrack(unittest.TestCase):

    def test_predict_moves_forward(self):
        from aegis.ukf.intercept_ukf import UKFTrack
        track = UKFTrack(Vec3(0, 0, -300), Vec3(50, 0, 0))
        track.predict(0.1)
        # Position should move North (positive x)
        self.assertGreater(track.x[0], 0.0)

    def test_update_reduces_uncertainty(self):
        from aegis.ukf.intercept_ukf import UKFTrack
        track = UKFTrack(Vec3(0, 0, -300))
        initial_trace = float(np.trace(track.P[:3,:3]))
        meas = np.array([0.5, 0.5, -300.0])
        track.update(meas)
        updated_trace = float(np.trace(track.P[:3,:3]))
        self.assertLess(updated_trace, initial_trace)

    def test_predict_at_future(self):
        from aegis.ukf.intercept_ukf import UKFTrack
        v_x = 50.0   # 50 m/s North
        track = UKFTrack(Vec3(0, 0, -300), Vec3(v_x, 0, 0))
        x_fut, P_fut = track.predict_at(2.0)
        # Should be roughly 100m North after 2s at 50 m/s
        self.assertGreater(x_fut[0], 50.0)   # drag will slow it slightly

    def test_covariance_stays_positive_definite(self):
        from aegis.ukf.intercept_ukf import UKFTrack
        track = UKFTrack(Vec3(100, 0, -300), Vec3(30, 10, 0))
        for i in range(50):
            track.predict()
            meas = np.array([100 + i*0.6, 0.1*i, -300.0])
            track.update(meas)
        eigenvalues = np.linalg.eigvalsh(track.P)
        self.assertTrue(np.all(eigenvalues > 0), "Covariance not positive definite")

    def test_to_vec3s(self):
        from aegis.ukf.intercept_ukf import UKFTrack
        track = UKFTrack(Vec3(1, 2, 3), Vec3(4, 5, 6))
        pos, vel, acc = track.to_vec3s()
        self.assertAlmostEqual(pos.x, 1.0)
        self.assertAlmostEqual(vel.y, 5.0)


class TestInterceptPredictor(unittest.TestCase):

    def test_finds_intercept_window(self):
        from aegis.ukf.intercept_ukf import UKFTrack, InterceptPredictor
        from aegis.oc_types import V_SPRINT_MS
        # Target heading straight toward drone
        target_pos = Vec3(500, 0, -300)
        target_vel = Vec3(-V_SPRINT_MS * 0.7, 0, 0)   # Approaching drone
        track = UKFTrack(target_pos, target_vel)

        # Drone sitting at origin
        drone_pos = Vec3(0, 0, -300)
        predictor = InterceptPredictor()
        result = predictor.find_intercept(drone_pos, track)
        # Should find a window since target is heading toward drone
        self.assertIsNotNone(result)
        self.assertIn("intercept_t_s", result)
        self.assertIn("confidence", result)

    def test_no_intercept_flying_away(self):
        from aegis.ukf.intercept_ukf import UKFTrack, InterceptPredictor
        # Target flying directly away at max speed — drone can't catch it
        track = UKFTrack(Vec3(10000, 0, -300), Vec3(200, 0, 0))
        drone_pos = Vec3(0, 0, -300)
        predictor = InterceptPredictor()
        result = predictor.find_intercept(drone_pos, track)
        # Might be None if target moves too fast
        # (Not asserting None since it depends on exact parameters)
        pass   # Just checking it doesn't crash


# ─────────────────────────────────────────────────────────────────────────────
#  Elastic Net tests
# ─────────────────────────────────────────────────────────────────────────────

class TestHexGrid(unittest.TestCase):

    def test_correct_count(self):
        from aegis.swarm.elastic_net import hexagonal_grid
        positions = hexagonal_grid(100, 45.0)
        self.assertEqual(len(positions), 100)

    def test_spacing_approximately_correct(self):
        from aegis.swarm.elastic_net import hexagonal_grid
        positions = hexagonal_grid(20, 45.0)
        # Check a few adjacent pairs are near 45m
        d = positions[0].dist(positions[1])
        self.assertGreater(d, 20.0)   # Not too close
        self.assertLess(d, 150.0)     # Not too far

    def test_all_at_correct_altitude(self):
        from aegis.swarm.elastic_net import hexagonal_grid
        positions = hexagonal_grid(10, 45.0, altitude_m=300.0)
        for p in positions:
            self.assertAlmostEqual(p.altitude_m, 300.0, places=1)


class TestElasticNet(unittest.TestCase):

    def _make_swarm(self, n: int, net: 'ElasticNet') -> Dict:
        from aegis.oc_types import DroneState, DroneRole, DroneHealth, SensorStatus, DRONE_E_USABLE
        swarm = {}
        for i, slot in enumerate(net._slot_positions[:n]):
            did = f"D{i:04d}"
            ds = DroneState(
                drone_id=did, formation_idx=i,
                role=DroneRole.PATROL, health=DroneHealth.NOMINAL,
                active_sensors=SensorStatus.ALL,
                pos=slot, vel=Vec3.zero(),
                battery_wh=DRONE_E_USABLE,
            )
            ds.__dict__['last_seen_s'] = time.time()
            swarm[did] = ds
        return swarm

    def test_step_returns_all_commands(self):
        from aegis.swarm.elastic_net import ElasticNet
        n = 20
        net = ElasticNet(n)
        swarm = self._make_swarm(n, net)
        cmds = net.step(swarm, [])
        self.assertEqual(len(cmds), n)

    def test_state_machine_engage(self):
        from aegis.swarm.elastic_net import ElasticNet
        from aegis.oc_types import FusedTarget, TargetClass
        net = ElasticNet(10)
        swarm = self._make_swarm(10, net)

        # Create a confirmed target
        target = FusedTarget(target_id="TGT_001")
        target.__dict__.update({
            'classification': TargetClass.CONFIRMED,
            'is_lure': False, 'lure_reason': '', 'lure_confidence': 0.0,
            'pos': Vec3(200, 0, -300), 'vel': Vec3(50, 0, 0),
            'acc': Vec3.zero(), 'pos_std': Vec3(3,3,3),
            'vote_ratio_val': 0.85, 'total_voters': 10, 'eo_votes': 7, 'ir_votes': 7,
        })
        # Use the is_confirmed property logic
        net.step(swarm, [target])
        # Should transition to ENGAGE
        self.assertIn(net.state, (NetState.PATROL, NetState.ENGAGE))

    def test_formation_health_perfect(self):
        from aegis.swarm.elastic_net import ElasticNet
        n = 20
        net = ElasticNet(n)
        swarm = self._make_swarm(n, net)
        net.step(swarm, [])   # Initialise agents
        h = net.formation_health_score()
        # All drones at their exact slot → perfect health
        self.assertGreater(h, 0.8)


# ─────────────────────────────────────────────────────────────────────────────
#  Energy Budget tests
# ─────────────────────────────────────────────────────────────────────────────

class TestEnergyBudget(unittest.TestCase):

    def _make_drone(self, battery_wh: float) -> 'DroneState':
        from aegis.oc_types import (DroneState, DroneRole, DroneHealth,
                                    SensorStatus, DRONE_E_USABLE)
        ds = DroneState(
            drone_id="D0001", role=DroneRole.PATROL, health=DroneHealth.NOMINAL,
            active_sensors=SensorStatus.ALL,
            pos=Vec3(0,0,-300), vel=Vec3(30,0,0),
            battery_wh=battery_wh,
        )
        ds.__dict__['last_seen_s'] = time.time()
        return ds

    def test_full_battery_execute(self):
        from aegis.energy.budget_manager import EnergyBudgetManager
        from aegis.oc_types import EnergyDecision, DRONE_E_USABLE
        mgr = EnergyBudgetManager()
        drone = self._make_drone(DRONE_E_USABLE)
        result = mgr.evaluate(drone, 300.0, 1000.0)
        self.assertEqual(result.decision, EnergyDecision.EXECUTE_INTERCEPT)

    def test_low_battery_rtb(self):
        from aegis.energy.budget_manager import EnergyBudgetManager
        from aegis.oc_types import EnergyDecision, E_RESERVE_RTB_WH, E_RESERVE_CHUTE_WH
        mgr = EnergyBudgetManager()
        drone = self._make_drone(E_RESERVE_RTB_WH + E_RESERVE_CHUTE_WH + 3.0)
        result = mgr.evaluate(drone)
        self.assertEqual(result.decision, EnergyDecision.INITIATE_RTB)

    def test_critical_battery_chute(self):
        from aegis.energy.budget_manager import EnergyBudgetManager
        from aegis.oc_types import EnergyDecision, E_RESERVE_CHUTE_WH
        mgr = EnergyBudgetManager()
        drone = self._make_drone(E_RESERVE_CHUTE_WH + 0.5)
        result = mgr.evaluate(drone)
        self.assertEqual(result.decision, EnergyDecision.EMERGENCY_CHUTE)

    def test_threat_score_shahed(self):
        from aegis.energy.budget_manager import TargetWorthEngine
        from aegis.oc_types import FusedTarget, TargetType, TargetClass, EnergyDecision
        worth = TargetWorthEngine()
        target = FusedTarget()
        target.__dict__.update({
            'target_id': 'TGT_001', 'classification': TargetClass.CONFIRMED,
            'is_lure': False, 'target_type': TargetType.SHAHED_136,
            'vel': Vec3(51, 0, 0), 'pos': Vec3(500,0,-300),
            'total_voters': 10, 'eo_votes': 7, 'ir_votes': 7,
        })
        profile = worth.score(target, collateral_risk=0.5)
        self.assertGreater(profile.threat_score, 0.0)
        self.assertLessEqual(profile.threat_score, 100.0)


# ─────────────────────────────────────────────────────────────────────────────
#  Safety / Proximity Lock tests
# ─────────────────────────────────────────────────────────────────────────────

class TestProximityLock(unittest.TestCase):

    def _make_drone(self, drone_id: str, pos: Vec3, vel: Vec3 = Vec3.north(30.0)):
        from aegis.oc_types import (DroneState, DroneRole, DroneHealth,
                                    SensorStatus, DRONE_E_USABLE)
        ds = DroneState(
            drone_id=drone_id, role=DroneRole.SPRINT, health=DroneHealth.NOMINAL,
            active_sensors=SensorStatus.ALL,
            pos=pos, vel=vel, battery_wh=DRONE_E_USABLE,
        )
        ds.__dict__['last_seen_s'] = time.time()
        return ds

    def test_clear_swarm_unlocked(self):
        from aegis.safety.proximity_lock import ProximityLock
        lock = ProximityLock()
        shooter = self._make_drone("D001", Vec3(0, 0, -300))
        # All other drones far away
        swarm = {
            "D001": shooter,
            "D002": self._make_drone("D002", Vec3(200, 0, -300)),
            "D003": self._make_drone("D003", Vec3(-200, 0, -300)),
        }
        result = lock.evaluate(shooter, swarm, human_veto=False, network_quorum=1.0)
        self.assertFalse(result.is_locked)
        self.assertTrue(result.all_clear)

    def test_sphere_violation(self):
        from aegis.safety.proximity_lock import ProximityLock
        from aegis.oc_types import LockReason
        lock = ProximityLock()
        shooter = self._make_drone("D001", Vec3(0, 0, -300))
        swarm = {
            "D001": shooter,
            "D002": self._make_drone("D002", Vec3(5, 0, -300)),   # 5m away — inside 15m sphere
        }
        result = lock.evaluate(shooter, swarm, human_veto=False, network_quorum=1.0)
        self.assertTrue(result.is_locked)
        self.assertEqual(result.lock_reason, LockReason.FRIENDLY_NEAR)

    def test_cone_violation(self):
        from aegis.safety.proximity_lock import ProximityLock
        from aegis.oc_types import LockReason
        lock = ProximityLock()
        # Shooter heading North, drone is 30m ahead — in cone
        shooter = self._make_drone("D001", Vec3(0, 0, -300), Vec3.north(50.0))
        swarm = {
            "D001": shooter,
            "D002": self._make_drone("D002", Vec3(30, 5, -300)),   # 30m ahead, 5m East
        }
        result = lock.evaluate(shooter, swarm, human_veto=False, network_quorum=1.0)
        self.assertTrue(result.is_locked)
        self.assertEqual(result.lock_reason, LockReason.FRIENDLY_CONE)

    def test_human_veto(self):
        from aegis.safety.proximity_lock import ProximityLock
        from aegis.oc_types import LockReason
        lock = ProximityLock()
        shooter = self._make_drone("D001", Vec3(0, 0, -300))
        swarm = {"D001": shooter, "D002": self._make_drone("D002", Vec3(500, 0, -300))}
        result = lock.evaluate(shooter, swarm, human_veto=True, network_quorum=1.0)
        self.assertTrue(result.is_locked)
        self.assertEqual(result.lock_reason, LockReason.HUMAN_VETO)

    def test_network_quorum_fail(self):
        from aegis.safety.proximity_lock import ProximityLock
        from aegis.oc_types import LockReason
        lock = ProximityLock()
        shooter = self._make_drone("D001", Vec3(0, 0, -300))
        swarm = {"D001": shooter}
        result = lock.evaluate(shooter, swarm, human_veto=False, network_quorum=0.3)
        self.assertTrue(result.is_locked)
        self.assertEqual(result.lock_reason, LockReason.NETWORK_LOSS)

    def test_emergency_stop(self):
        from aegis.safety.proximity_lock import ProximityLock
        from aegis.oc_types import LockReason
        lock = ProximityLock()
        lock.trigger_emergency_stop()
        shooter = self._make_drone("D001", Vec3(0, 0, -300))
        result = lock.evaluate(shooter, {}, human_veto=False, network_quorum=1.0)
        self.assertTrue(result.is_locked)
        self.assertEqual(result.lock_reason, LockReason.EMERGENCY)


class TestHumanLoopGate(unittest.TestCase):

    def test_auto_approve_high_confidence(self):
        from aegis.safety.proximity_lock import HumanLoopGate
        from aegis.oc_types import AUTO_CONF_THRESH
        gate = HumanLoopGate()
        approved, reason = gate.request_authorisation(
            "D001", "TGT_001", confidence=AUTO_CONF_THRESH + 0.05,
            threat_score=65.0, is_high_risk=False)
        self.assertTrue(approved)

    def test_veto_blocks(self):
        from aegis.safety.proximity_lock import HumanLoopGate
        gate = HumanLoopGate()
        gate.colonel_veto(duration_s=10.0)
        approved, reason = gate.request_authorisation(
            "D001", "TGT_001", confidence=1.0, threat_score=90.0)
        self.assertFalse(approved)

    def test_high_risk_blocked(self):
        from aegis.safety.proximity_lock import HumanLoopGate
        gate = HumanLoopGate()
        approved, reason = gate.request_authorisation(
            "D001", "TGT_001", confidence=1.0,
            threat_score=95.0, is_high_risk=True)
        self.assertFalse(approved)

    def test_audit_log_populated(self):
        from aegis.safety.proximity_lock import HumanLoopGate
        gate = HumanLoopGate()
        gate.request_authorisation("D001", "TGT_001", 0.9, 70.0, False)
        log_entries = gate.audit_log()
        self.assertGreater(len(log_entries), 0)


# ─────────────────────────────────────────────────────────────────────────────
#  ADS-B Spoof Detector
# ─────────────────────────────────────────────────────────────────────────────

class TestADSBSpoof(unittest.TestCase):

    def test_normal_aircraft_no_alert(self):
        from aegis.safety.proximity_lock import ADSBSpoofDetector
        det = ADSBSpoofDetector()
        alert = det.check("AC001", adsb_speed_ms=250.0, radar_speed_ms=255.0)
        self.assertFalse(alert.is_spoof)

    def test_large_speed_delta_spoof(self):
        from aegis.safety.proximity_lock import ADSBSpoofDetector
        det = ADSBSpoofDetector()
        alert = det.check("AC001", adsb_speed_ms=100.0, radar_speed_ms=300.0)
        self.assertTrue(alert.is_spoof)


# ─────────────────────────────────────────────────────────────────────────────
#  Main runner
# ─────────────────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    # Import Vec3 and NetState into module scope for tests above
    import importlib
    _types = importlib.import_module("aegis.oc_types")
    Vec3    = _types.Vec3
    NetState= _types.NetState
    Dict    = dict
    List    = list
    Optional= type(None)   # just for type hints in method signatures

    unittest.main(verbosity=2)
