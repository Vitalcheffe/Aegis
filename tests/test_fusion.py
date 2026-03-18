"""Tests — SpectralFusion + MAD voter + LureDetector"""
import sys, os, time
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'src'))
import numpy as np
import pytest
from aegis.oc_types import *
from aegis.fusion.spectral_fusion import mad_filter, mad_filter_3d, LureDetector, SpectralFusion


class TestMADFilter:
    def test_no_outliers(self):
        votes = np.array([1.0, 1.1, 0.9, 1.05, 0.95])
        filtered, mask, n_rej = mad_filter(votes)
        assert n_rej == 0
        assert len(filtered) == 5

    def test_detects_byzantine(self):
        # 1 vote malveillant très loin de la médiane
        votes = np.array([1.0, 1.1, 0.9, 1.05, 50.0])  # 50.0 est byzantin
        filtered, mask, n_rej = mad_filter(votes)
        assert n_rej >= 1
        assert 50.0 not in filtered

    def test_rejects_minority(self):
        # 2 byzantins sur 9 (< 1/3) → correctement rejetés
        votes = np.array([1.0, 1.1, 0.9, 1.05, 0.95, 1.02, 0.98, 100.0, -50.0])
        _, _, n_rej = mad_filter(votes)
        assert n_rej == 2

    def test_empty_input(self):
        filtered, mask, n = mad_filter(np.array([]))
        assert n == 0

    def test_single_vote(self):
        filtered, mask, n = mad_filter(np.array([5.0]))
        assert n == 0
        assert len(filtered) == 1

    def test_identical_votes(self):
        votes = np.array([3.0, 3.0, 3.0, 3.0])
        filtered, mask, n = mad_filter(votes)
        assert n == 0  # rien à rejeter si tous identiques


class TestMAD3D:
    def test_3d_no_outliers(self):
        pts = [Vec3(0, 0, 0), Vec3(1, 1, 1), Vec3(0.5, 0.5, 0.5)]
        filtered, mask, n = mad_filter_3d(pts)
        assert n == 0

    def test_3d_detects_outlier(self):
        pts = [Vec3(0,0,0), Vec3(1,1,1), Vec3(0.5,0.5,0.5), Vec3(500,500,500)]
        filtered, mask, n = mad_filter_3d(pts)
        assert n >= 1
        far_in_filtered = any(p.x > 100 for p in filtered)
        assert not far_in_filtered


class TestLureDetector:
    def setup_method(self):
        self.det = LureDetector()

    def test_flare_detection(self):
        ir = IRDetection(temp_K=850.0, contrast_K=600.0)
        ok, msg, conf = self.det.check_flare(ir)
        assert ok
        assert "FLARE" in msg
        assert conf > 0.3

    def test_no_flare_normal_drone(self):
        ir = IRDetection(temp_K=350.0, contrast_K=60.0)
        ok, _, _ = self.det.check_flare(ir)
        assert not ok

    def test_cold_balloon(self):
        ir = IRDetection(temp_K=295.0, contrast_K=2.0)
        ok, msg, conf = self.det.check_cold_balloon(ir)
        assert ok
        assert "BALLOON" in msg

    def test_thermal_blob(self):
        ir = IRDetection(pixel_area=20, uniformity=0.05)
        ok, msg, _ = self.det.check_thermal_blob(ir)
        assert ok
        assert "BLOB" in msg

    def test_deceleration_lure(self):
        tgt = FusedTarget(target_id="T_DECEL")
        tgt.vel = Vec3(50, 0, 0)          # 50 m/s vers le nord
        tgt.acc = Vec3(-20, 0, 0)         # 20 m/s² de décélération
        ok, msg, conf = self.det.check_deceleration(tgt)
        assert ok
        assert "DECEL" in msg

    def test_eo_invisible(self):
        ir = IRDetection(contrast_K=30.0, pixel_area=15)
        eo = EODetection(confidence=0.05)
        ok, msg, _ = self.det.check_eo_invisible(eo, ir)
        assert ok
        assert "EO_INVISIBLE" in msg

    def test_real_drone_not_lure(self):
        """Un vrai drone ne doit pas déclencher les règles leurres."""
        ir = IRDetection(temp_K=380.0, contrast_K=90.0, uniformity=0.6, pixel_area=12)
        eo = EODetection(target_pos_world=Vec3(100,0,-300), confidence=0.92)
        tgt = FusedTarget(target_id="REAL_DRONE")
        tgt.vel = Vec3(40, 0, 0)
        tgt.acc = Vec3(2, 0, 0)

        ok_flare,    _, _ = self.det.check_flare(ir)
        ok_balloon,  _, _ = self.det.check_cold_balloon(ir)
        ok_blob,     _, _ = self.det.check_thermal_blob(ir)
        ok_decel,    _, _ = self.det.check_deceleration(tgt)
        ok_eo,       _, _ = self.det.check_eo_invisible(eo, ir)

        assert not any([ok_flare, ok_balloon, ok_blob, ok_decel, ok_eo])


class TestSpectralFusion:
    def _make_frame(self, drone_id: str, target_pos: Vec3, ts=None) -> SensorFrame:
        """Crée un SensorFrame simulé avec une détection EO."""
        frame = SensorFrame(drone_id=drone_id, sequence_num=1,
                            timestamp_s=ts or time.time())
        frame.eo.target_pos_world = target_pos
        frame.eo.confidence       = 0.95
        frame.ir.centroid_world   = target_pos
        frame.ir.temp_K           = 380.0
        frame.ir.contrast_K       = 90.0
        frame.drone_pos           = Vec3(0, 0, -300)
        frame.battery_wh          = DRONE_E_USABLE
        frame.active_sensors      = SensorStatus.ALL
        return frame

    def test_single_detection_creates_target(self):
        fusion = SpectralFusion()
        target_pos = Vec3(500, 200, -300)
        frames = [self._make_frame(f"D_{i}", target_pos) for i in range(5)]
        targets = fusion.update(frames)
        assert len(targets) > 0

    def test_two_separated_detections_two_targets(self):
        fusion = SpectralFusion()
        pos1 = Vec3(0, 0, -300)
        pos2 = Vec3(500, 500, -300)  # > 25m de séparation
        frames = (
            [self._make_frame(f"D_{i}", pos1) for i in range(5)] +
            [self._make_frame(f"D_{i+5}", pos2) for i in range(5)]
        )
        targets = fusion.update(frames)
        assert len(targets) >= 2

    def test_enough_votes_confirms_target(self):
        fusion = SpectralFusion()
        pos = Vec3(100, 100, -300)
        # Envoyer plusieurs cycles de frames pour accumuler des votes
        for _ in range(5):
            frames = [self._make_frame(f"D_{i}", pos) for i in range(10)]
            targets = fusion.update(frames)
        confirmed = fusion.get_confirmed()
        assert len(confirmed) > 0

    def test_stale_cluster_removed(self):
        fusion = SpectralFusion()
        # Forcer la purge en modifiant le timestamp
        pos = Vec3(100, 0, -300)
        frames = [self._make_frame("D_0", pos)]
        fusion.update(frames)
        # Modifier le timestamp du cluster pour le forcer périmé
        for cl in fusion._clusters.values():
            cl.updated_s = time.time() - 5.0  # 5s → périmé
        fusion.update([])  # tick vide → purge
        assert len(fusion._clusters) == 0


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
