"""
AEGIS · energy/budget_manager.py
Module M4 — Energy Budget Manager + Target Worth Engine

Three-reserve energy model:
  TOTAL usable : 177.6 Wh  (222 Wh × 80% DoD)
  ├── Emergency : 10.0 Wh  — parachute deployment only (inviolable)
  ├── RTB       : 40.0 Wh  — return to base (inviolable)
  ├── Combat    : 60.0 Wh  — sprint × 1 + intercept manoeuvres
  └── Patrol    : 67.6 Wh  — available for surveillance

Decisions:
  battery > RTB + chute + 20 Wh  → CONTINUE / EXECUTE
  battery ≤ RTB + chute + 20 Wh  → RTB
  battery ≤ chute + 5 Wh         → EMERGENCY_CHUTE

Target Worth Score [0–100]:
  S = (mass/50) × 40  +  (speed/200) × 30  +  collateral × 30
  < 60  : RTB (not worth engaging)
  60–80 : Request Colonel authorisation
  > 80  : Strong recommendation engage (Colonel decides)

Author  : Vitalcheffe
Version : 1.0.0
"""
from __future__ import annotations
import time, logging
from dataclasses import dataclass, field
from typing import Dict, List, Optional, Tuple
from aegis.oc_types import (
    DroneState, FusedTarget, EnergyDecision, ThreatProfile, TargetType,
    DRONE_E_USABLE, E_RESERVE_RTB_WH, E_RESERVE_CHUTE_WH, E_RESERVE_COMBAT,
    E_PATROL_WH, V_PATROL_MS, V_SPRINT_MS, P_AVIONICS_W,
    WORTH_RTB, WORTH_ASK, HIGH_RISK_MASS_KG,
    propulsive_power_W, energy_for_segment_wh,
)

log = logging.getLogger("aegis.energy")


# ─────────────────────────────────────────────────────────────────────────────
#  Energy predictor — cost model for combat manoeuvres
# ─────────────────────────────────────────────────────────────────────────────

def energy_for_sprint_wh(dist_m: float) -> float:
    """
    Estimated energy for a full intercept sprint: acceleration + cruise.
    Conservative estimate (actual ≤ this due to booster assistance).

    Breakdown:
      Booster phase (1.8s): motor idle, drag work only
      Sprint cruise (dist at V_sprint): motor at max, drag opposes
    """
    # Time to cover dist at V_sprint
    t_s   = dist_m / V_SPRINT_MS
    t_h   = t_s / 3600.0
    P_sprint = propulsive_power_W(V_SPRINT_MS)
    return P_sprint * t_h


def energy_to_rtb_wh(dist_m: float) -> float:
    """Energy required to return to base from dist_m away at patrol speed."""
    return energy_for_segment_wh(V_PATROL_MS, dist_m)


# ─────────────────────────────────────────────────────────────────────────────
#  Target Worth Engine
# ─────────────────────────────────────────────────────────────────────────────

class TargetWorthEngine:
    """
    Computes a threat score [0–100] for a FusedTarget.
    Used to decide whether engaging is worth spending a drone's combat reserve.

    Score formula:
      S = (mass/50)×40 + (speed/200)×30 + collateral×30

    Baselines (why these numbers?):
      50 kg  = Shahed-136 mass (Iranian loitering munition, primary threat)
      200m/s = upper bound for drone-class threats (Lancet-3 ≈ 83 m/s)
      Collateral: estimated 0–1 from map/scenario context

    Score thresholds:
      < 60 : Likely not worth a drone's combat reserve → RTB suggestion
      60–80: Borderline → request Colonel decision
      > 80 : High priority → strong recommend engage, Colonel has final say
    """

    def score(self, target: FusedTarget, collateral_risk: float = 0.5) -> ThreatProfile:
        """
        Compute threat score for a confirmed target.

        Args:
            target          : FusedTarget (must be CONFIRMED)
            collateral_risk : 0=open desert, 1=dense urban area

        Returns:
            ThreatProfile with computed score and classification
        """
        t_type = target.target_type
        mass   = t_type.estimated_mass_kg()
        speed  = max(target.speed_ms, t_type.estimated_speed_ms() * 0.5)

        return ThreatProfile(
            target_id       = target.target_id,
            target_type     = t_type,
            mass_kg         = mass,
            velocity_ms     = speed,
            collateral_risk = collateral_risk,
        )

    def recommend(self, profile: ThreatProfile) -> Tuple[EnergyDecision, str]:
        """
        Map threat score to EnergyDecision.

        Returns (decision, human-readable reason).
        """
        s = profile.threat_score
        if s > WORTH_ASK:
            return EnergyDecision.EXECUTE_INTERCEPT, f"score={s:.0f}>80 — high priority"
        if s > WORTH_RTB:
            return EnergyDecision.EXECUTE_INTERCEPT, f"score={s:.0f} 60–80 — request Colonel"
        return EnergyDecision.ABORT_INTERCEPT, f"score={s:.0f}<60 — not worth engaging"


# ─────────────────────────────────────────────────────────────────────────────
#  EnergyBudgetManager — per-drone energy decisions
# ─────────────────────────────────────────────────────────────────────────────

@dataclass
class BudgetResult:
    """Result of one drone's energy budget evaluation."""
    drone_id:  str
    decision:  EnergyDecision
    reason:    str
    battery_wh:float
    budget_wh: float       # available after reserves deducted
    sprint_cost_wh: float = 0.0
    rtb_cost_wh:    float = 0.0


class EnergyBudgetManager:
    """
    Per-drone energy budget controller.
    Called once per tick for each drone being considered for engagement.

    Three-reserve model:
        Available = battery_wh − E_RESERVE_CHUTE_WH − E_RESERVE_RTB_WH
        If Available < sprint_cost: ABORT_INTERCEPT
        If battery_wh < E_RESERVE_RTB_WH + E_RESERVE_CHUTE_WH + 5: INITIATE_RTB
        If battery_wh < E_RESERVE_CHUTE_WH + 1: EMERGENCY_CHUTE
    """

    # Minimum available above reserves to consider an intercept
    MIN_COMBAT_MARGIN_WH = 15.0

    def evaluate(
        self,
        drone: DroneState,
        intercept_dist_m: float = 500.0,
        rtb_dist_m: float = 2000.0,
    ) -> BudgetResult:
        """
        Evaluate whether this drone has energy for an intercept.

        Args:
            drone            : current DroneState
            intercept_dist_m : distance to intercept point (m)
            rtb_dist_m       : distance to home base (m)

        Returns:
            BudgetResult with decision and cost breakdown
        """
        batt = drone.battery_wh

        # Emergency: below parachute reserve
        if batt <= E_RESERVE_CHUTE_WH + 1.0:
            return BudgetResult(
                drone_id=drone.drone_id, decision=EnergyDecision.EMERGENCY_CHUTE,
                reason="battery critical — deploy chute NOW",
                battery_wh=batt, budget_wh=0.0)

        # RTB: below RTB + chute reserves
        rtb_floor = E_RESERVE_RTB_WH + E_RESERVE_CHUTE_WH
        if batt <= rtb_floor + 5.0:
            return BudgetResult(
                drone_id=drone.drone_id, decision=EnergyDecision.INITIATE_RTB,
                reason=f"battery {batt:.1f}Wh ≤ RTB floor {rtb_floor+5:.1f}Wh",
                battery_wh=batt, budget_wh=0.0)

        # Available combat budget
        sprint_cost = energy_for_sprint_wh(intercept_dist_m)
        rtb_cost    = energy_to_rtb_wh(rtb_dist_m)
        required    = sprint_cost + rtb_cost + E_RESERVE_CHUTE_WH + self.MIN_COMBAT_MARGIN_WH
        available   = batt - E_RESERVE_CHUTE_WH - E_RESERVE_RTB_WH

        if available < sprint_cost + self.MIN_COMBAT_MARGIN_WH:
            return BudgetResult(
                drone_id=drone.drone_id, decision=EnergyDecision.ABORT_INTERCEPT,
                reason=f"available={available:.1f}Wh < sprint_cost={sprint_cost:.1f}Wh",
                battery_wh=batt, budget_wh=available,
                sprint_cost_wh=sprint_cost, rtb_cost_wh=rtb_cost)

        return BudgetResult(
            drone_id=drone.drone_id, decision=EnergyDecision.EXECUTE_INTERCEPT,
            reason=f"available={available:.1f}Wh ≥ required={sprint_cost:.1f}Wh",
            battery_wh=batt, budget_wh=available,
            sprint_cost_wh=sprint_cost, rtb_cost_wh=rtb_cost)

    def evaluate_swarm(
        self,
        swarm: Dict[str, DroneState],
        intercept_dist_m: float = 500.0,
        rtb_dist_m: float = 2000.0,
    ) -> Dict[str, BudgetResult]:
        """Evaluate all drones. Returns dict[drone_id → BudgetResult]."""
        return {
            did: self.evaluate(ds, intercept_dist_m, rtb_dist_m)
            for did, ds in swarm.items()
            if ds.is_alive
        }

    def pick_best_drone(
        self,
        swarm: Dict[str, DroneState],
        target_pos: Vec3,
        base_pos: Vec3,
    ) -> Optional[str]:
        """
        Select the best drone to intercept a target.
        Criteria: can_intercept + has energy + nearest to target.

        Args:
            swarm      : current swarm state
            target_pos : target position
            base_pos   : home base position (for RTB cost estimate)

        Returns:
            drone_id of best candidate, or None if no suitable drone
        """
        candidates = []
        for did, ds in swarm.items():
            if not ds.can_intercept:
                continue
            dist_to_target = ds.pos.dist(target_pos)
            dist_to_base   = ds.pos.dist(base_pos)
            result = self.evaluate(ds, dist_to_target, dist_to_base)
            if result.decision == EnergyDecision.EXECUTE_INTERCEPT:
                candidates.append((did, dist_to_target, result.budget_wh))

        if not candidates:
            return None

        # Pick nearest with sufficient budget (prefer proximity over battery)
        candidates.sort(key=lambda x: x[1])
        return candidates[0][0]
