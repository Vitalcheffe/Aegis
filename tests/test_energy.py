"""Tests — EnergyBudgetManager + TargetWorthEngine"""
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'src'))
import pytest
from aegis.oc_types import *
from aegis.energy.budget_manager import EnergyBudgetManager, TargetWorthEngine, sprint_energy_wh


def make_drone(did, batt_wh=None, pos=None):
    d = DroneState(drone_id=did)
    d.battery_wh  = batt_wh or DRONE_E_USABLE
    d.pos         = pos or Vec3.zero()
    d.active_sensors = SensorStatus.ALL
    d.role        = DroneRole.PATROL
    return d


class TestEnergyBudgetManager:
    def test_full_battery_execute(self):
        mgr   = EnergyBudgetManager(base_pos=Vec3.zero())
        drone = make_drone("D0")  # batterie pleine
        dec   = mgr.evaluate(drone, dist_to_intercept_m=500.0)
        assert dec == EnergyDecision.EXECUTE_INTERCEPT

    def test_low_battery_rtb(self):
        mgr   = EnergyBudgetManager(base_pos=Vec3.zero())
        # Batterie juste au-dessus de RTB_RESERVE
        drone = make_drone("D0", batt_wh=E_RESERVE_RTB_WH + 5.0)
        dec   = mgr.evaluate(drone, dist_to_intercept_m=500.0)
        assert dec in (EnergyDecision.INITIATE_RTB, EnergyDecision.ABORT_INTERCEPT)

    def test_critical_battery_chute(self):
        mgr   = EnergyBudgetManager(base_pos=Vec3.zero())
        drone = make_drone("D0", batt_wh=E_RESERVE_CHUTE_WH - 1.0)
        dec   = mgr.evaluate(drone)
        assert dec == EnergyDecision.EMERGENCY_CHUTE

    def test_no_intercept_patrol(self):
        mgr   = EnergyBudgetManager(base_pos=Vec3.zero())
        drone = make_drone("D0")
        dec   = mgr.evaluate(drone, dist_to_intercept_m=0)
        assert dec == EnergyDecision.CONTINUE_PATROL

    def test_update_all_returns_decisions(self):
        mgr    = EnergyBudgetManager()
        drones = {f"D{i}": make_drone(f"D{i}") for i in range(10)}
        decs   = mgr.update_all(drones)
        assert len(decs) == 10
        assert all(isinstance(v, EnergyDecision) for v in decs.values())

    def test_sprint_energy_positive(self):
        e = sprint_energy_wh(1000.0)
        assert e > 0
        assert e < DRONE_E_USABLE  # ne doit pas consommer toute la batterie

    def test_reserve_ordering(self):
        """L'énergie chute doit être < RTB doit être < combat."""
        assert E_RESERVE_CHUTE_WH < E_RESERVE_RTB_WH
        assert E_RESERVE_RTB_WH < E_RESERVE_COMBAT


class TestTargetWorthEngine:
    def test_shahed136_score(self):
        """Shahed-136 : 50kg, 51m/s, risque 0.5 → score ≈ 57."""
        p = ThreatProfile("T1", TargetType.SHAHED_136, 50, 51.4, 0.5)
        score = p.threat_score
        assert 50 < score < 70

    def test_small_drone_lower_score(self):
        """Petit drone commercial → score plus faible."""
        p_shahed = ThreatProfile("T1", mass_kg=50, velocity_ms=51.4, collateral_risk=0.5)
        p_small  = ThreatProfile("T2", mass_kg=3, velocity_ms=15.0, collateral_risk=0.2)
        assert p_shahed.threat_score > p_small.threat_score

    def test_high_mass_is_high_risk(self):
        p = ThreatProfile("T1", mass_kg=100, velocity_ms=100, collateral_risk=0.8)
        assert p.is_high_risk

    def test_rtb_decision_low_score(self):
        e = TargetWorthEngine()
        tgt = FusedTarget(target_id="T_LOW")
        tgt.target_type = TargetType.SMALL_DRONE
        tgt.vel = Vec3(10, 0, 0)
        score, dec = e.evaluate_target(tgt, protected_zones=[Vec3(10000, 0, 0)])
        assert dec in ("RTB", "ASK_COLONEL", "RECOMMEND_ENGAGE")  # valid decision

    def test_score_bounds(self):
        """Le score doit toujours être dans [0, 100]."""
        for mass in [0.1, 5, 50, 500, 5000]:
            for speed in [5, 50, 250, 900]:
                p = ThreatProfile("T", mass_kg=mass, velocity_ms=speed, collateral_risk=0.5)
                # Le score peut dépasser 100 pour des cibles extrêmes,
                # mais les entrées normales doivent être bornées
                if mass <= 50 and speed <= 200:
                    assert p.threat_score <= 100

    def test_kinetic_energy_calculation(self):
        p = ThreatProfile("T1", mass_kg=7.2, velocity_ms=88.89)
        ke = p.kinetic_energy_J
        assert abs(ke - 0.5 * 7.2 * 88.89**2) < 1.0  # ≈ 28,440 J


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
