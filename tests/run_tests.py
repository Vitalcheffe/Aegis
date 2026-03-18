"""
tests/run_tests.py
Standalone test runner (no pytest required).
Run: python tests/run_tests.py
"""
import sys, os, time, traceback
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "src"))

import numpy as np
import random, math

GREEN  = "\033[92m"
RED    = "\033[91m"
YELLOW = "\033[93m"
RESET  = "\033[0m"
BOLD   = "\033[1m"

passed = 0
failed = 0
errors_list = []

def run(name, fn):
    global passed, failed
    try:
        fn()
        print(f"  {GREEN}✓{RESET}  {name}")
        passed += 1
    except AssertionError as e:
        print(f"  {RED}✗{RESET}  {name}  {RED}FAIL: {e}{RESET}")
        failed += 1
        errors_list.append((name, str(e)))
    except Exception as e:
        print(f"  {RED}✗{RESET}  {name}  {RED}ERROR: {e}{RESET}")
        failed += 1
        errors_list.append((name, traceback.format_exc()))

# ── imports ───────────────────────────────────────────────────────────────────
from aegis.oc_types import (
    Vec3, DroneRole, DroneHealth, TargetClass, TargetType,
    PayloadMode, NetState, LockReason, EnergyDecision, SensorStatus,
    SensorFrame, FusedTarget, DroneState, InterceptOrder, DroneCommand,
    DRONE_E_USABLE, V_PATROL_MS, V_SPRINT_MS, MISSION_ALT_M,
    E_RTB_WH, E_CHUTE_WH, E_COMBAT_WH,
    SPHERE_R_M, CONE_COS, CONE_DEPTH_M, VOTE_THRESH,
    RHO_300M, SPEED_SOUND_300M, MACH_SPRINT, SF_STRUCTURE,
    BOOSTER_N, BOOSTER_DV, aero_drag, total_power,
    patrol_endurance_min, energy_for_segment,
    rain_attenuation, mesh_range, generate_drone_ids,
    _OK as SELF_TEST_OK,
)

print(f"\n{BOLD}AEGIS v1.0.0 — Test Suite{RESET}\n")

# ── GROUP 1: Constants ────────────────────────────────────────────────────────
print(f"{BOLD}[1] Constants & Physics{RESET}")
run("self_test passes at import",         lambda: (assert_( SELF_TEST_OK)))
run("air density 300m in range",          lambda: assert_(1.10 < RHO_300M < 1.25))
run("speed of sound in range",            lambda: assert_(330 < SPEED_SOUND_300M < 345))
run("Mach sprint in range",               lambda: assert_(0.24 < MACH_SPRINT < 0.28))
run("structural safety factor ≥ 1.5",    lambda: assert_(SF_STRUCTURE >= 1.5))
run("energy reserves sum < usable",      lambda: assert_(E_COMBAT_WH+E_RTB_WH+E_CHUTE_WH < DRONE_E_USABLE))
run("patrol endurance 15–40 min",        lambda: assert_(15 < patrol_endurance_min() < 40))
run("booster thrust 400–450 N",          lambda: assert_(400 < BOOSTER_N < 450))
run("booster ΔV > 50 m/s",              lambda: assert_(BOOSTER_DV > 50))
run("rain atten=0 for clear sky",        lambda: assert_(rain_attenuation(0.0) == 0.0))
run("rain atten increases with rain",    lambda: assert_(rain_attenuation(50) > rain_attenuation(12.5) > 0))
run("mesh range shrinks in rain",        lambda: assert_(mesh_range(0) > mesh_range(50) > mesh_range(100) > 50))

# ── GROUP 2: Vec3 ─────────────────────────────────────────────────────────────
print(f"\n{BOLD}[2] Vec3{RESET}")
run("zero constructor",         lambda: assert_(Vec3.zero().norm() == 0))
run("immutable (AttributeError)", lambda: _test_immutable())
run("addition",                 lambda: assert_((Vec3(1,2,3)+Vec3(4,5,6)).x == 5))
run("subtraction",              lambda: assert_((Vec3(5,5,5)-Vec3(2,3,4)).x == 3))
run("scalar multiply",          lambda: assert_((Vec3(1,2,3)*3).y == 6))
run("right multiply",           lambda: assert_((2*Vec3(1,2,3)).z == 6))
run("division",                 lambda: assert_((Vec3(6,4,2)/2).x == 3))
run("division by zero raises",  lambda: _test_div_zero())
run("norm",                     lambda: assert_(abs(Vec3(3,4,0).norm()-5)<1e-9))
run("normalized unit length",   lambda: assert_(abs(Vec3(3,1,-4).normalized().norm()-1)<1e-9))
run("normalize zero vec → (1,0,0)", lambda: assert_(Vec3.zero().normalized().x == 1.0))
run("dot product",              lambda: assert_(abs(Vec3(1,2,3).dot(Vec3(4,5,6))-32)<1e-9))
run("dot orthogonal = 0",       lambda: assert_(abs(Vec3(1,0,0).dot(Vec3(0,1,0)))<1e-12))
run("cross product i×j=k",     lambda: assert_(abs(Vec3(1,0,0).cross(Vec3(0,1,0)).z-1)<1e-9))
run("distance",                 lambda: assert_(abs(Vec3(0,0,0).dist(Vec3(3,4,0))-5)<1e-9))
run("lerp midpoint",            lambda: assert_(abs(Vec3(0,0,0).lerp(Vec3(10,10,10),0.5).x-5)<1e-9))
run("altitude = -z",            lambda: assert_(abs(Vec3(0,0,-300).altitude_m-300)<1e-9))
run("cone inside",              lambda: assert_(Vec3(30,5,0).in_cone(Vec3(),Vec3(1,0,0),CONE_COS,CONE_DEPTH_M)))
run("cone outside (angle)",     lambda: assert_(not Vec3(30,40,0).in_cone(Vec3(),Vec3(1,0,0),CONE_COS,CONE_DEPTH_M)))
run("cone outside (depth)",     lambda: assert_(not Vec3(100,0,0).in_cone(Vec3(),Vec3(1,0,0),CONE_COS,CONE_DEPTH_M)))
run("cone behind apex",         lambda: assert_(not Vec3(-10,0,0).in_cone(Vec3(),Vec3(1,0,0),CONE_COS,CONE_DEPTH_M)))
run("numpy roundtrip",          lambda: assert_(Vec3.from_np(Vec3(1.5,-2.3,4.7).to_np())==Vec3(1.5,-2.3,4.7)))
run("dict roundtrip",           lambda: assert_(Vec3.from_dict(Vec3(3.14,2.71,-1.41).to_dict())==Vec3(3.14,2.71,-1.41)))

# ── GROUP 3: Enumerations ─────────────────────────────────────────────────────
print(f"\n{BOLD}[3] Enumerations{RESET}")
run("PATROL is combat ready",         lambda: assert_(DroneRole.PATROL.is_combat_ready()))
run("RTB not combat ready",           lambda: assert_(not DroneRole.RTB.is_combat_ready()))
run("PATROL is airborne",             lambda: assert_(DroneRole.PATROL.is_airborne()))
run("STANDBY not airborne",           lambda: assert_(not DroneRole.STANDBY.is_airborne()))
run("NOMINAL is operational",         lambda: assert_(DroneHealth.NOMINAL.is_operational()))
run("CRITICAL not operational",       lambda: assert_(not DroneHealth.CRITICAL.is_operational()))
run("CONFIRMED is engageable",        lambda: assert_(TargetClass.CONFIRMED.is_engageable()))
run("PROBABLE not engageable",        lambda: assert_(not TargetClass.PROBABLE.is_engageable()))
run("LURE not a threat engageable",   lambda: assert_(not TargetClass.LURE.is_engageable()))
run("NetState PATROL→ENGAGE",         lambda: assert_(NetState.PATROL.transition("target_confirmed")==NetState.ENGAGE))
run("NetState ENGAGE→PURSUIT",        lambda: assert_(NetState.ENGAGE.transition("target_outside")==NetState.PURSUIT))
run("NetState unknown → same",        lambda: assert_(NetState.PATROL.transition("xyz")==NetState.PATROL))
run("SensorStatus EO|IR flags",       lambda: _test_sensor_flags())
run("EnergyDecision abort set",       lambda: assert_(EnergyDecision.ABORT_INTERCEPT.is_abort()))
run("EnergyDecision execute not abort", lambda: assert_(not EnergyDecision.EXECUTE_INTERCEPT.is_abort()))
run("TargetType Shahed mass = 50kg",  lambda: assert_(TargetType.SHAHED_136.mass_kg()==50.0))
run("BoosterState ARMED can fire",    lambda: assert_(BoosterState.ARMED.can_fire()))
run("BoosterState SPENT cannot fire", lambda: assert_(not BoosterState.SPENT.can_fire()))

# ── GROUP 4: Data Structures ──────────────────────────────────────────────────
print(f"\n{BOLD}[4] Data Structures{RESET}")
run("SensorFrame has_target",         lambda: assert_(_make_frame(True).has_target))
run("SensorFrame no_target",          lambda: assert_(not _make_frame(False).has_target))
run("SensorFrame valid",              lambda: assert_(_make_frame(True, batt=100).is_valid))
run("SensorFrame invalid low batt",  lambda: assert_(not _make_frame(True, batt=1).is_valid))
run("FusedTarget vote_ratio",         lambda: _test_vote_ratio())
run("FusedTarget confirmed",          lambda: _test_confirmed())
run("FusedTarget lure not confirmed", lambda: _test_lure_not_confirmed())
run("FusedTarget stale",              lambda: _test_stale())
run("DroneState can_intercept",       lambda: _test_can_intercept())
run("InterceptOrder is_active",       lambda: _test_order_active())
run("DroneCommand is_hostile",        lambda: _test_hostile())
run("generate_drone_ids format",      lambda: assert_(generate_drone_ids(3)[2]=="AEGIS_0002"))

# ── GROUP 5: Spectral Fusion ──────────────────────────────────────────────────
print(f"\n{BOLD}[5] Spectral Fusion{RESET}")
from aegis.fusion.spectral_fusion import SpectralFusion, _byzantine_vote
run("BFT rejects 1 byzantine drone",  lambda: _test_bft())
run("fusion creates cluster",         lambda: _test_fusion_creates())
run("fusion confirms after 3 cycles", lambda: _test_fusion_confirms())
run("flare lure detected",            lambda: _test_lure_detected())
run("lure not engageable",            lambda: _test_lure_not_engageable())

# ── GROUP 6: UKF ──────────────────────────────────────────────────────────────
print(f"\n{BOLD}[6] UKF Tracker{RESET}")
from aegis.ukf.intercept_ukf import UKF9State, UKF_DT, UKF_SIG_MEAS, MultiTargetUKF
run("UKF converges (unc halves in 100 steps)", lambda: _test_ukf_converges())
run("UKF tracks velocity",            lambda: _test_ukf_velocity())
run("predict_ahead returns correct shape", lambda: _test_predict_shape())

# ── GROUP 7: Safety ───────────────────────────────────────────────────────────
print(f"\n{BOLD}[7] Safety Layer{RESET}")
from aegis.safety.proximity_lock import ProximityLock, HumanLoopGate, AntispoofChecker, TargetWorthEngine
run("lock clears with all checks",    lambda: _test_lock_clears())
run("lock on friendly in sphere",     lambda: _test_lock_sphere())
run("lock on friendly in cone",       lambda: _test_lock_cone())
run("lock on network loss",           lambda: _test_lock_network())
run("lock on human veto",             lambda: _test_lock_veto())
run("emergency stop locks all",       lambda: _test_emergency())
run("gate auto-approves after timeout", lambda: _test_auto_approve())
run("gate blocks high-risk auto",     lambda: _test_high_risk_no_auto())
run("antispoof: 10G flagged",         lambda: _test_spoof_g())
run("antispoof: normal aircraft ok",  lambda: _test_no_spoof())

# ── GROUP 8: Energy ───────────────────────────────────────────────────────────
print(f"\n{BOLD}[8] Energy Budget{RESET}")
from aegis.energy.budget_manager import EnergyBudgetManager
run("EMERGENCY_CHUTE at critical low", lambda: _test_chute())
run("INITIATE_RTB at RTB reserve",    lambda: _test_rtb())
run("CONTINUE_PATROL no order",       lambda: _test_patrol())
run("EXECUTE_INTERCEPT ok energy",    lambda: _test_execute())
run("ABORT far target",               lambda: _test_abort())
run("should_rtb correct",             lambda: _test_should_rtb())

# ── GROUP 9: Swarm ────────────────────────────────────────────────────────────
print(f"\n{BOLD}[9] Elastic Net Formation{RESET}")
from aegis.swarm.elastic_net import ElasticNet
run("step returns N commands",        lambda: _test_swarm_cmds())
run("initial state is PATROL",        lambda: _test_swarm_patrol())
run("health < 1 when dispersed",      lambda: _test_swarm_health())

# ── GROUP 10: Integration ─────────────────────────────────────────────────────
print(f"\n{BOLD}[10] Integration{RESET}")
from aegis.core import AegisCore
run("full pipeline produces commands", lambda: _test_pipeline())
run("emergency stop blocks hostile",  lambda: _test_pipeline_emergency())

# ── HELPERS ───────────────────────────────────────────────────────────────────

def assert_(cond, msg=""):
    if not cond: raise AssertionError(msg)

def _test_immutable():
    try: Vec3(1,2,3).x = 9; raise AssertionError("should have raised")
    except AttributeError: pass

def _test_div_zero():
    try: Vec3(1,2,3) / 0; raise AssertionError("should have raised")
    except ZeroDivisionError: pass

def _test_sensor_flags():
    s = SensorStatus.EO | SensorStatus.LWIR | SensorStatus.GPS
    assert_(s.has_eo() and s.has_ir() and s.has_gps() and not s.has_doppler())

from aegis.oc_types import BoosterState
def _make_frame(has_eo=True, batt=100.0):
    from aegis.oc_types import EODetection
    eo = EODetection(target_pos_world=Vec3(100,50,-MISSION_ALT_M), confidence=0.9) if has_eo else EODetection()
    return SensorFrame(drone_id="D0", drone_pos=Vec3(0,0,-MISSION_ALT_M),
                       drone_vel=Vec3(30,0,0), battery_wh=batt, eo=eo)

def _test_vote_ratio():
    t = FusedTarget(); t.eo_votes=4; t.ir_votes=3; t.total_voters=5
    assert_(abs(t.vote_ratio - 0.70) < 1e-6)

def _test_confirmed():
    t = FusedTarget(); t.classification=TargetClass.CONFIRMED
    t.eo_votes=8; t.ir_votes=7; t.total_voters=10; t.is_lure=False
    assert_(t.is_confirmed)

def _test_lure_not_confirmed():
    t = FusedTarget(); t.classification=TargetClass.CONFIRMED
    t.eo_votes=9; t.ir_votes=9; t.total_voters=10; t.is_lure=True
    assert_(not t.is_confirmed)

def _test_stale():
    t = FusedTarget(); t.timestamp_s=time.time()-10; assert_(t.is_stale)

def _test_can_intercept():
    d = DroneState(drone_id="D0"); d.battery_wh=120; assert_(d.can_intercept)
    d2 = DroneState(drone_id="D1"); d2.battery_wh=E_RTB_WH+E_CHUTE_WH+2; assert_(not d2.can_intercept)

def _test_order_active():
    o = InterceptOrder(); assert_(not o.is_active)
    o.acknowledged=True; assert_(o.is_active)
    o.aborted=True; assert_(not o.is_active)

def _test_hostile():
    c = DroneCommand(drone_id="D0"); assert_(not c.is_hostile)
    c.deploy_payload=True; assert_(c.is_hostile)

def _make_frames_fusion(n, tgt, lure=False):
    from aegis.oc_types import EODetection, IRDetection
    rng2 = random.Random(7)
    frames = []
    for i in range(n):
        p = tgt + Vec3(rng2.gauss(0,2), rng2.gauss(0,2), 0)
        ir_t = 850.0 if lure else 490.0
        frame = SensorFrame(drone_id=f"D{i}", drone_pos=Vec3(rng2.uniform(-200,200),rng2.uniform(-200,200),-MISSION_ALT_M),
            drone_vel=Vec3(0,0,0), battery_wh=100,
            eo=EODetection(target_pos_world=p, confidence=0.9),
            ir=IRDetection(centroid_world=p, temp_K=ir_t, contrast_K=ir_t-286, pixel_area=15))
        frames.append(frame)
    return frames

def _test_bft():
    ids=[f'D{i}' for i in range(7)]
    pos=np.array([[100+i*0.3,100+i*0.2,0] for i in range(6)]+[[500.,500.,0.]])
    clean,rej=_byzantine_vote(pos,ids)
    assert_('D6' in rej, f"Byzantine D6 not rejected; rejected={rej}")

def _test_fusion_creates():
    f=SpectralFusion(10); t=f.step(_make_frames_fusion(10,Vec3(500,300,-300)))
    assert_(len(t)>=1)

def _test_fusion_confirms():
    f=SpectralFusion(15); tgt=Vec3(500,300,-300)
    for _ in range(3): ts=f.step(_make_frames_fusion(15,tgt))
    c=[t for t in ts if t.is_confirmed]; assert_(len(c)>=1)

def _test_lure_detected():
    f=SpectralFusion(10); ts=f.step(_make_frames_fusion(10,Vec3(200,100,-300),lure=True))
    assert_(any(t.is_lure for t in ts),"flare 850K not detected as lure")

def _test_lure_not_engageable():
    f=SpectralFusion(10)
    for _ in range(3): ts=f.step(_make_frames_fusion(10,Vec3(200,100,-300),lure=True))
    for t in ts:
        if t.is_lure: assert_(not t.is_confirmed)

def _test_ukf_converges():
    ukf=UKF9State('T',Vec3(2000,0,-300),Vec3(-51.4,0,0))
    init=ukf.pos_uncertainty_m
    rng2=np.random.default_rng(0); tp=Vec3(2000,0,-300); tv=Vec3(-51.4,0,0)
    for _ in range(100):
        tp=tp+tv*UKF_DT; ukf.predict(); ukf.update(tp.to_np()+rng2.normal(0,UKF_SIG_MEAS,3))
    assert_(ukf.pos_uncertainty_m < init*0.5, f"{ukf.pos_uncertainty_m:.2f} not < {init*0.5:.2f}")

def _test_ukf_velocity():
    tv=Vec3(-51.4,0,0); ukf=UKF9State('V',Vec3(1000,0,-300),tv)
    rng2=np.random.default_rng(7); tp=Vec3(1000,0,-300)
    for _ in range(150):
        tp=tp+tv*UKF_DT; ukf.predict(); ukf.update(tp.to_np()+rng2.normal(0,UKF_SIG_MEAS,3))
    assert_(abs(ukf.vel.x-tv.x)<8.0, f"vel err {abs(ukf.vel.x-tv.x):.2f} m/s")

def _test_predict_shape():
    ukf=UKF9State('P',Vec3(500,0,-300),Vec3(-30,0,0))
    pos,cov=ukf.predict_ahead(3.0)
    assert_(pos.shape==(3,) and cov.shape==(3,3))

def _gate_cleared(oid):
    gate=HumanLoopGate()
    gate._requests[oid]={'order_id':oid,'drone_id':'D0','target_id':'T0',
        'confidence':0.95,'score':70,'high_risk':False,
        'requested_s':time.time()-20,'vetoed':False,'approved':True}
    return gate

def _test_lock_clears():
    lock=ProximityLock(_gate_cleared('OK1'))
    d=DroneState(drone_id='D0')
    assert_(not lock.evaluate(d,[d],'OK1',1.0).is_locked)

def _test_lock_sphere():
    lock=ProximityLock(_gate_cleared('OK2'))
    d=DroneState(drone_id='D0')
    d2=DroneState(drone_id='D1'); d2.pos=Vec3(10,0,-MISSION_ALT_M)
    s=lock.evaluate(d,[d,d2],'OK2',1.0)
    assert_(s.is_locked and s.lock_reason==LockReason.FRIENDLY_NEAR, f"got {s.lock_reason}")

def _test_lock_cone():
    lock=ProximityLock(_gate_cleared('OK3'))
    d=DroneState(drone_id='D0'); d.heading_deg=0
    d2=DroneState(drone_id='D1'); d2.pos=Vec3(30,5,-MISSION_ALT_M)
    s=lock.evaluate(d,[d,d2],'OK3',1.0)
    assert_(s.is_locked and s.lock_reason==LockReason.FRIENDLY_CONE, f"got {s.lock_reason}, nearest={s.nearest_m:.1f}")

def _test_lock_network():
    lock=ProximityLock(_gate_cleared('OK4'))
    d=DroneState(drone_id='D0')
    s=lock.evaluate(d,[d],'OK4',0.5)
    assert_(s.is_locked and s.lock_reason==LockReason.NETWORK_LOSS)

def _test_lock_veto():
    gate=HumanLoopGate()
    t=FusedTarget(); t.classification=TargetClass.CONFIRMED
    from aegis.oc_types import ThreatProfile as TP
    tp=TP('T0')
    gate.request_authorization('VETO_ORD','D0',t,tp)
    gate.veto('VETO_ORD')
    lock=ProximityLock(gate)
    d=DroneState(drone_id='D0')
    s=lock.evaluate(d,[d],'VETO_ORD',1.0)
    assert_(s.is_locked and s.lock_reason==LockReason.HUMAN_VETO)

def _test_emergency():
    lock=ProximityLock(_gate_cleared('EMG'))
    lock.emergency_stop()
    d=DroneState(drone_id='D0')
    s=lock.evaluate(d,[d],'EMG',1.0)
    assert_(s.is_locked and s.lock_reason==LockReason.EMERGENCY)

def _test_auto_approve():
    gate=HumanLoopGate()
    t=FusedTarget(); t.classification=TargetClass.CONFIRMED
    t.eo_votes=9; t.ir_votes=9; t.total_voters=10
    from aegis.oc_types import ThreatProfile as TP
    gate.request_authorization('AUTO','D0',t,TP('T0',mass_kg=10))
    gate._requests['AUTO']['requested_s']=time.time()-20
    gate._requests['AUTO']['confidence']=0.96
    assert_(gate.is_cleared('AUTO'))

def _test_high_risk_no_auto():
    gate=HumanLoopGate()
    t=FusedTarget(); t.classification=TargetClass.CONFIRMED
    t.eo_votes=9; t.ir_votes=9; t.total_voters=10
    from aegis.oc_types import ThreatProfile as TP
    gate.request_authorization('HR','D0',t,TP('T0',mass_kg=100))
    gate._requests['HR']['requested_s']=time.time()-20
    gate._requests['HR']['high_risk']=True
    gate._requests['HR']['confidence']=0.99
    assert_(not gate.is_cleared('HR'))

def _test_spoof_g():
    ac=AntispoofChecker()
    c=ac.check(230,228,-2,10*9.81,None,None)
    assert_(ac.is_spoofed(c),f"10G load should flag spoof (conf={c:.2f})")

def _test_no_spoof():
    ac=AntispoofChecker()
    c=ac.check(240,242,-5,1.5*9.81,None,None)
    assert_(not ac.is_spoofed(c),f"normal aircraft flagged (conf={c:.2f})")

em2=None
def _test_chute():
    global em2; em2=EnergyBudgetManager()
    d=DroneState(drone_id='X'); d.battery_wh=E_CHUTE_WH-1
    assert_(em2.evaluate(d)==EnergyDecision.EMERGENCY_CHUTE)

def _test_rtb():
    em=EnergyBudgetManager()
    d=DroneState(drone_id='X'); d.battery_wh=E_RTB_WH+E_CHUTE_WH-1
    assert_(em.evaluate(d)==EnergyDecision.INITIATE_RTB)

def _test_patrol():
    em=EnergyBudgetManager(); d=DroneState(drone_id='X'); d.battery_wh=120
    assert_(em.evaluate(d,None)==EnergyDecision.CONTINUE_PATROL)

def _test_execute():
    em=EnergyBudgetManager(); d=DroneState(drone_id='X'); d.battery_wh=150
    o=InterceptOrder(drone_id='X',target_id='T',aim_pos=Vec3(500,0,-300),eta_s=5)
    assert_(em.evaluate(d,o)==EnergyDecision.EXECUTE_INTERCEPT)

def _test_abort():
    em=EnergyBudgetManager(); d=DroneState(drone_id='X'); d.battery_wh=E_RTB_WH+E_CHUTE_WH+5
    o=InterceptOrder(drone_id='X',target_id='T',aim_pos=Vec3(20000,0,-300),eta_s=200)
    r=em.evaluate(d,o)
    assert_(r in (EnergyDecision.ABORT_INTERCEPT, EnergyDecision.INITIATE_RTB))

def _test_should_rtb():
    em=EnergyBudgetManager()
    d1=DroneState(drone_id='X'); d1.battery_wh=E_RTB_WH+E_CHUTE_WH+2; assert_(em.should_rtb(d1))
    d2=DroneState(drone_id='X'); d2.battery_wh=120; assert_(not em.should_rtb(d2))

def _make_drones_swarm(n):
    rng2=random.Random(99)
    drones=[]
    for did in generate_drone_ids(n):
        d=DroneState(drone_id=did)
        d.pos=Vec3(rng2.uniform(-300,300),rng2.uniform(-300,300),-MISSION_ALT_M)
        d.battery_wh=100; drones.append(d)
    return drones

def _test_swarm_cmds():
    ids=generate_drone_ids(10); net=ElasticNet(ids)
    assert_(len(net.step(_make_drones_swarm(10),[]))==10)

def _test_swarm_patrol():
    net=ElasticNet(generate_drone_ids(10))
    net.step(_make_drones_swarm(10),[])
    assert_(net.state==NetState.PATROL)

def _test_swarm_health():
    ids=generate_drone_ids(10); net=ElasticNet(ids)
    rng2=random.Random(0)
    far=[DroneState(drone_id=d) for d in ids]
    for d in far: d.pos=Vec3(rng2.uniform(-5000,5000),rng2.uniform(-5000,5000),-MISSION_ALT_M)
    net.step(far,[])
    assert_(net.health < 0.9, f"health={net.health:.2f} should be < 0.9 when dispersed")

def _build_frames_int(n, tgt):
    from aegis.oc_types import EODetection, IRDetection
    rng2=random.Random(11); frames=[]
    for i in range(n):
        p=tgt+Vec3(rng2.gauss(0,2),rng2.gauss(0,2),0)
        frame=SensorFrame(drone_id=f"D{i}",
            drone_pos=Vec3(rng2.uniform(-300,300),rng2.uniform(-300,300),-MISSION_ALT_M),
            drone_vel=Vec3(rng2.gauss(0,5),0,0), battery_wh=100,
            eo=EODetection(target_pos_world=p,confidence=0.92),
            ir=IRDetection(centroid_world=p,temp_K=490,contrast_K=203,pixel_area=15))
        frames.append(frame)
    return frames

def _test_pipeline():
    core=AegisCore(generate_drone_ids(10))
    core.ingest(_build_frames_int(10,Vec3(500,300,-300)))
    cmds=core.step()
    assert_(len(cmds)==10)

def _test_pipeline_emergency():
    core=AegisCore(generate_drone_ids(5))
    core.emergency_stop()
    for _ in range(5):
        core.ingest(_build_frames_int(5,Vec3(200,100,-300))); cmds=core.step()
    assert_(not any(c.is_hostile for c in cmds))

# ── SUMMARY ───────────────────────────────────────────────────────────────────
total = passed + failed
print(f"\n{'═'*55}")
if failed == 0:
    print(f"  {GREEN}{BOLD}✅  {passed}/{total} tests PASSED{RESET}")
else:
    print(f"  {RED}{BOLD}❌  {failed}/{total} tests FAILED{RESET}")
    for name, err in errors_list:
        print(f"\n  {RED}FAIL: {name}{RESET}")
        print(f"    {err[:120]}")
print(f"{'═'*55}\n")
sys.exit(0 if failed == 0 else 1)
