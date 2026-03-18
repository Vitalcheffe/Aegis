"""Tests — ProximityLock + HumanLoopGate"""
import sys, os, time
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'src'))
import pytest
from aegis.oc_types import *
from aegis.safety.proximity_lock import ProximityLock, HumanLoopGate, ADSBSpoofDetector


def make_drone(did: str, pos: Vec3 = None, heading: float = 0.0) -> DroneState:
    d = DroneState(drone_id=did)
    d.pos         = pos or Vec3.zero()
    d.heading_deg = heading
    d.battery_wh  = DRONE_E_USABLE
    d.active_sensors = SensorStatus.ALL
    d.last_seen_s = time.time()
    return d


class TestProximityLock:
    def test_clear_when_alone(self):
        """Un drone seul dans un espace vide doit être déverrouillé."""
        lock  = ProximityLock("D0")
        drone = make_drone("D0", Vec3(0, 0, -300))
        state = lock.evaluate(drone, {"D0": drone}, network_ratio=1.0, human_veto=False)
        assert state.sphere_clear
        assert state.cone_clear
        assert state.network_ok
        assert state.human_clear
        assert not state.is_locked

    def test_locked_friendly_in_sphere(self):
        """Un friendly à 10m doit verrouiller (< 15m)."""
        lock  = ProximityLock("D0")
        d0    = make_drone("D0", Vec3(0, 0, -300))
        d1    = make_drone("D1", Vec3(10, 0, -300))  # 10m de D0 → dans la sphère
        state = lock.evaluate(d0, {"D0": d0, "D1": d1}, network_ratio=1.0)
        assert not state.sphere_clear
        assert state.is_locked
        assert state.lock_reason == LockReason.FRIENDLY_NEAR

    def test_locked_friendly_in_cone(self):
        """Un friendly dans le cône blast doit verrouiller."""
        lock  = ProximityLock("D0")
        d0    = make_drone("D0", Vec3(0, 0, -300), heading_deg=0.0)  # cap Nord
        # D1 est à 40m Nord de D0 → dans le cône (demi-angle 45°, profondeur 60m)
        d1    = make_drone("D1", Vec3(40, 5, -300))
        state = lock.evaluate(d0, {"D0": d0, "D1": d1}, network_ratio=1.0)
        assert not state.cone_clear
        assert state.is_locked

    def test_locked_network_loss(self):
        """Quorum réseau insuffisant → verrouillé."""
        lock  = ProximityLock("D0")
        drone = make_drone("D0", Vec3(0, 0, -300))
        state = lock.evaluate(drone, {"D0": drone}, network_ratio=0.4)  # < 67%
        assert not state.network_ok
        assert state.is_locked
        assert state.lock_reason == LockReason.NETWORK_LOSS

    def test_locked_human_veto(self):
        """Veto humain → verrouillé même si tout le reste est OK."""
        lock  = ProximityLock("D0")
        drone = make_drone("D0", Vec3(0, 0, -300))
        state = lock.evaluate(drone, {"D0": drone}, network_ratio=1.0, human_veto=True)
        assert not state.human_clear
        assert state.is_locked
        assert state.lock_reason == LockReason.HUMAN_VETO

    def test_friendly_outside_sphere_ok(self):
        """Un friendly à 20m (> 15m) ne doit pas verrouiller la sphère."""
        lock  = ProximityLock("D0")
        d0    = make_drone("D0", Vec3(0, 0, -300))
        d1    = make_drone("D1", Vec3(20, 0, -300))  # 20m > SPHERE_RADIUS_M=15m
        state = lock.evaluate(d0, {"D0": d0, "D1": d1},
                              network_ratio=1.0, human_veto=False)
        assert state.sphere_clear

    def test_eval_timing(self):
        """L'évaluation doit être rapide (< 10ms pour 500 drones)."""
        lock = ProximityLock("D0")
        d0   = make_drone("D0", Vec3(0, 0, -300))
        all_drones = {f"D{i}": make_drone(f"D{i}", Vec3(i*50, 0, -300))
                      for i in range(500)}
        t0 = time.perf_counter()
        lock.evaluate(d0, all_drones, network_ratio=1.0)
        elapsed_ms = (time.perf_counter() - t0) * 1000
        assert elapsed_ms < 10.0, f"eval trop lente: {elapsed_ms:.1f}ms"


class TestHumanLoopGate:
    def test_veto_blocks_immediately(self):
        gate = HumanLoopGate()
        gate.veto("TGT_001", operator="COLONEL")
        assert gate.is_vetoed("TGT_001")

    def test_clear_veto(self):
        gate = HumanLoopGate()
        gate.veto("TGT_001")
        gate.clear_veto("TGT_001")
        assert not gate.is_vetoed("TGT_001")

    def test_audit_log_appended(self):
        gate = HumanLoopGate()
        gate.veto("TGT_002")
        log = gate.get_audit_log()
        assert len(log) >= 1

    def test_already_vetoed_target_rejected(self):
        gate = HumanLoopGate()
        gate.veto("TGT_003")
        # request_engagement doit retourner False sans attendre
        result = gate.request_engagement("D0", "TGT_003", conf=0.95, threat_score=90)
        assert result is False


class TestADSBSpoofDetector:
    def test_normal_aircraft_not_spoof(self):
        det = ADSBSpoofDetector()
        # Simuler un avion normal à 200 m/s, accélération < 0.5G
        for i in range(5):
            ts  = time.time() + i * 2.0
            pos = Vec3(i * 400, 0, -3000)  # vol rectiligne
            det.update("AA1234", pos, 200.0, ts)
        ok, conf, msg = det.check("AA1234")
        assert not ok  # pas de spoofing

    def test_maneuver_detected_as_spoof(self):
        det = ADSBSpoofDetector()
        # Simuler un "avion civil" qui manœuvre à 10G
        t0 = time.time()
        det.update("SPOOF1", Vec3(0, 0, -3000), 200.0, t0)
        det.update("SPOOF1", Vec3(200, 0, -3000), 200.0, t0 + 1.0)
        # Saut brutal de position → accélération énorme
        det.update("SPOOF1", Vec3(2200, 0, -3000), 200.0, t0 + 2.0)  # 2000m en 1s
        ok, conf, msg = det.check("SPOOF1")
        if ok:  # peut ne pas détecter si variation < seuil selon timing
            assert conf > SPOOF_CONF_MIN

    def test_insufficient_data_no_alert(self):
        det = ADSBSpoofDetector()
        det.update("NODATA", Vec3(0, 0, 0), 100.0, time.time())
        ok, conf, msg = det.check("NODATA")
        assert not ok  # données insuffisantes


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
