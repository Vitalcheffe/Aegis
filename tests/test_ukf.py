"""Tests — UKF Tracker + Intercept Predictor"""
import sys, os, math
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'src'))
import numpy as np
import pytest
from aegis.oc_types import *
from aegis.ukf.intercept_ukf import SingleTargetUKF, InterceptPredictor, MultiTargetUKF


class TestSingleTargetUKF:
    def test_init(self):
        ukf = SingleTargetUKF(Vec3(100, 200, -300), Vec3(20, 5, 0))
        assert abs(ukf.x[0] - 100) < 1e-6
        assert abs(ukf.x[3] - 20)  < 1e-6
        assert ukf.P.shape == (9, 9)

    def test_predict_no_crash(self):
        ukf = SingleTargetUKF(Vec3(0, 0, -300))
        ukf.predict(0.02)
        # Après prédiction, position inchangée (vitesse et acc nulles)
        assert abs(ukf.x[0]) < 1e-6

    def test_predict_with_velocity(self):
        """Un drone qui vole à 50 m/s Nord doit avancer de 1m en 20ms."""
        ukf = SingleTargetUKF(Vec3(0, 0, -300), Vec3(50, 0, 0))
        ukf.predict(0.02)
        assert abs(ukf.x[0] - 50*0.02) < 0.01  # ≈ 1m

    def test_update_reduces_uncertainty(self):
        """Après une mise à jour, l'incertitude doit diminuer."""
        ukf = SingleTargetUKF(Vec3(0, 0, -300))
        p_before = np.trace(ukf.P)
        ukf.predict(0.02)
        ukf.update(np.array([0.5, 0.0, -300.0]))  # mesure proche
        p_after = np.trace(ukf.P)
        assert p_after < p_before  # incertitude réduite

    def test_covariance_stays_positive_definite(self):
        """P doit rester définie positive (toutes valeurs propres > 0)."""
        ukf = SingleTargetUKF(Vec3(100, 0, -300), Vec3(30, 10, 0))
        for _ in range(50):  # 1 seconde de simulation
            ukf.predict(0.02)
            ukf.update(np.array([
                100 + np.random.normal(0, 3),
                np.random.normal(0, 3),
                -300 + np.random.normal(0, 2),
            ]))
        eigenvalues = np.linalg.eigvals(ukf.P)
        assert all(e > -1e-6 for e in eigenvalues)

    def test_tracks_constant_velocity(self):
        """Le UKF doit tracker précisément une cible à vitesse constante."""
        ukf = SingleTargetUKF(Vec3(0, 0, -300), Vec3(40, 0, 0))
        # Simuler 2 secondes de vol à 40 m/s (sans bruit pour simplifier)
        pos = Vec3(0, 0, -300)
        for step in range(100):  # 100 × 20ms = 2s
            pos = Vec3(pos.x + 40*0.02, pos.y, pos.z)
            ukf.predict(0.02)
            ukf.update(np.array([pos.x, pos.y, pos.z]))
        # Position estimée doit être proche de la vraie
        assert abs(ukf.position.x - 80.0) < 2.0  # ±2m

    def test_sigma_points_count(self):
        """Il doit y avoir exactement 2N+1 = 19 sigma points."""
        ukf = SingleTargetUKF(Vec3(0, 0, 0))
        sigma = ukf._sigma_points()
        assert sigma.shape == (19, 9)

    def test_position_property(self):
        ukf = SingleTargetUKF(Vec3(1, 2, 3))
        assert abs(ukf.position.x - 1) < 1e-6
        assert abs(ukf.position.y - 2) < 1e-6
        assert abs(ukf.position.z - 3) < 1e-6


class TestInterceptPredictor:
    def test_finds_intercept_slow_target(self):
        """Pour une cible lente, un drone rapide doit trouver un point d'interception."""
        ukf = SingleTargetUKF(Vec3(200, 0, -300), Vec3(20, 0, 0))  # cible à 72 km/h
        drone_pos = Vec3(0, 0, -300)
        pos, t, conf = InterceptPredictor.find_intercept(drone_pos, ukf)
        assert pos is not None
        assert t is not None
        assert conf > 0.0

    def test_no_intercept_too_fast(self):
        """Une cible plus rapide que le drone ne peut pas être interceptée."""
        # Cible à 500 m/s (Mach 1.5) — hors portée du booster
        ukf = SingleTargetUKF(Vec3(5000, 0, -300), Vec3(500, 0, 0))
        drone_pos = Vec3(0, 0, -300)
        pos, t, conf = InterceptPredictor.find_intercept(drone_pos, ukf)
        # Peut retourner None ou conf très faible
        if pos is not None:
            assert conf < 0.3 or t > UKF_HORIZON_S * 0.9

    def test_predict_target_pos_kinematic(self):
        """La position prédite doit suivre la cinématique à vitesse constante."""
        ukf = SingleTargetUKF(Vec3(0, 0, -300), Vec3(100, 0, 0))
        pred = InterceptPredictor.predict_target_pos(ukf, 5.0)
        # Sans accélération : px + vx × t = 0 + 100 × 5 = 500m
        assert abs(pred.x - 500.0) < 1.0


class TestMultiTargetUKF:
    def _make_target(self, tid: str, pos: Vec3) -> FusedTarget:
        t = FusedTarget(target_id=tid)
        t.pos            = pos
        t.vel            = Vec3(30, 0, 0)
        t.classification = TargetClass.CONFIRMED
        t.total_voters   = 10
        t.eo_votes       = 8
        t.ir_votes       = 8
        return t

    def test_creates_ukf_for_new_target(self):
        mgr = MultiTargetUKF()
        tgt = self._make_target("T1", Vec3(100, 0, -300))
        mgr.update_all([tgt])
        assert mgr.n_active == 1

    def test_multiple_targets(self):
        mgr = MultiTargetUKF()
        targets = [
            self._make_target(f"T{i}", Vec3(i*100, 0, -300))
            for i in range(5)
        ]
        mgr.update_all(targets)
        assert mgr.n_active == 5

    def test_stale_ukf_removed(self):
        mgr = MultiTargetUKF()
        tgt = self._make_target("T1", Vec3(100, 0, -300))
        mgr.update_all([tgt])
        # Mise à jour sans cette cible → UKF supprimé
        mgr.update_all([])
        assert mgr.n_active == 0

    def test_state_injected_into_target(self):
        mgr   = MultiTargetUKF()
        tgt   = self._make_target("T1", Vec3(100, 0, -300))
        init_pos = tgt.pos
        for _ in range(20):
            tgt.pos = Vec3(init_pos.x + 30*0.02*_, 0, -300)
            mgr.update_all([tgt])
        # Après 20 updates, ukf_updates doit être > 0
        assert tgt.ukf_updates > 0


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
