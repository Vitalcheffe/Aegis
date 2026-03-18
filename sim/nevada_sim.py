"""
AEGIS · sim/nevada_sim.py  —  Simulation Nevada (10 vs 500)

Scénario :
  500 drones en grille hexagonale 300m AGL
  N Shahed-136 en approche depuis le nord
  M leurres ballons thermiques injectés
"""
import sys, os, time, math, argparse, random
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'src'))
import numpy as np
from typing import Dict, List
from aegis.oc_types import (
    Vec3, DroneState, SensorFrame, DroneRole, SensorStatus,
    IRDetection, EODetection, DopplerMeasurement, TargetType,
    DRONE_E_USABLE, V_PATROL_MS, MISSION_ALT_M, generate_drone_ids,
)
from aegis.origin_core import AegisCore


def make_hostile(tid, pos, vel, ttype=TargetType.SHAHED_136):
    return {'id': tid, 'pos': pos, 'vel': vel, 'type': ttype, 'alive': True, 'is_lure': False}

def make_lure(lid, pos):
    return {'id': lid, 'pos': pos,
            'vel': Vec3(random.uniform(-3,3), random.uniform(-3,3), 0),
            'type': TargetType.BALLOON_LURE, 'alive': True, 'is_lure': True}

def sim_frame(ds: DroneState, targets, drone_id, noise=3.0) -> SensorFrame:
    fr = SensorFrame(drone_id=drone_id, sequence_num=0, timestamp_s=time.time())
    fr.drone_pos = ds.pos; fr.heading_deg = ds.heading_deg
    fr.battery_wh = ds.battery_wh; fr.active_sensors = SensorStatus.ALL
    best, bd = None, float('inf')
    for t in targets:
        if not t['alive']: continue
        d = ds.pos.dist(t['pos'])
        if d < 800 and d < bd: bd, best = d, t
    if best:
        noisy = Vec3(best['pos'].x+np.random.normal(0,noise),
                     best['pos'].y+np.random.normal(0,noise),
                     best['pos'].z+np.random.normal(0,noise*0.5))
        fr.eo.target_pos_world = noisy; fr.eo.confidence = max(0.5, 1-bd/1600)
        if best['is_lure']:
            fr.ir.temp_K=295.0; fr.ir.contrast_K=2.5; fr.ir.uniformity=0.05
        else:
            fr.ir.temp_K=380.0+np.random.normal(0,5); fr.ir.contrast_K=94.0; fr.ir.uniformity=0.65
        fr.ir.centroid_world=noisy; fr.ir.pixel_area=max(1,int(50-bd/20))
        dir_v = (best['pos']-ds.pos).normalized()
        fr.doppler.radial_velocity_ms = (best['vel']-ds.vel).dot(dir_v)
        fr.doppler.range_m=bd; fr.doppler.confidence=min(max(0,35-bd/40)/20,1.0)
    return fr

def run(n_drones=100, n_targets=5, n_lures=2, duration_s=60.0, verbose=True):
    random.seed(42); np.random.seed(42)
    print(f"\n{'═'*56}\n  AEGIS NEVADA | {n_drones}d | {n_targets}t | {n_lures}l | {duration_s:.0f}s\n{'═'*56}")

    core = AegisCore(n_drones=n_drones); ids = generate_drone_ids(n_drones)
    core.initialize(ids, origin=Vec3.zero(), altitude_m=MISSION_ALT_M)

    from aegis.swarm.elastic_net import hex_grid_positions
    hex_pos = hex_grid_positions(n_drones, 45.0, Vec3.zero(), MISSION_ALT_M)

    drones: Dict[str, DroneState] = {}
    for i, did in enumerate(ids):
        d=DroneState(drone_id=did); d.pos=hex_pos[i] if i<len(hex_pos) else Vec3.zero()
        d.battery_wh=DRONE_E_USABLE; d.active_sensors=SensorStatus.ALL; d.last_seen_s=time.time()
        drones[did]=d

    targets = [make_hostile(f"SH_{i:03d}", Vec3(2000+i*50,(i-n_targets//2)*150,-300), Vec3(-51.4,random.uniform(-5,5),0)) for i in range(n_targets)]
    targets += [make_lure(f"LR_{i:03d}", Vec3(1500,(i-1)*300,-280)) for i in range(n_lures)]

    dt=0.1; t_sim=0.0; total_hits=0; t0=time.time()

    for step in range(int(duration_s/dt)):
        t_sim += dt
        senders = ids[::max(1,len(ids)//20)]
        frames = [sim_frame(drones[did], targets, did) for did in senders if did in drones]
        cmds   = core.step(frames, drones, dt=dt)
        sprint = []
        for cmd in cmds:
            did=cmd.drone_id
            if did not in drones: continue
            ds=drones[did]
            if cmd.role==DroneRole.SPRINT:
                sprint.append(did); ds.role=DroneRole.SPRINT
                d=(cmd.target_pos-ds.pos); ds.pos=ds.pos+d.normalized()*cmd.target_speed*dt if d.norm()>0.1 else ds.pos
                ds.battery_wh=max(0,ds.battery_wh-1.5)
            elif cmd.role==DroneRole.RTB:
                ds.role=DroneRole.RTB; ds.battery_wh=max(0,ds.battery_wh-0.08)
            else:
                ds.role=DroneRole.PATROL; ds.battery_wh=max(0,ds.battery_wh-0.05)
            ds.last_seen_s=time.time()

        for t in targets:
            if not t['alive']: continue
            t['pos']=Vec3(t['pos'].x+t['vel'].x*dt,t['pos'].y+t['vel'].y*dt,t['pos'].z+t['vel'].z*dt)
            for did in sprint:
                if did in drones and drones[did].pos.dist(t['pos'])<20:
                    t['alive']=False; total_hits+=1
                    print(f"  [HIT] {t['id']} ← {did}"); break

        if verbose and step%int(10/dt)==0:
            al=sum(1 for t in targets if t['alive'] and not t['is_lure'])
            sp=sum(1 for ds in drones.values() if ds.role==DroneRole.SPRINT)
            st=core.get_swarm_status(drones)
            print(f"  t={t_sim:5.1f}s cibles={al}/{n_targets} sprint={sp} batt_min={st.min_battery_pct:.0%}")

        if all(not t['alive'] for t in targets if not t['is_lure']):
            print(f"\n  ✓ Toutes neutralisées à t={t_sim:.1f}s"); break

    wall=time.time()-t0
    print(f"\n{'─'*56}")
    print(f"  Interceptions : {total_hits}/{n_targets}  ({total_hits/max(n_targets,1):.0%})")
    print(f"  Leurres rej.  : {core.stats['lures_rejected']}/{n_lures}")
    print(f"  Ticks         : {core.stats['ticks']}")
    print(f"  Latence moy   : {core.stats['mean_tick_us']:.0f}µs")
    print(f"  Temps réel    : {wall:.1f}s ({t_sim/wall:.0f}× temps réel)")
    print(f"{'─'*56}\n")
    return total_hits, core.stats['lures_rejected']

if __name__=="__main__":
    p=argparse.ArgumentParser()
    p.add_argument('--n-drones',  type=int,   default=100)
    p.add_argument('--n-targets', type=int,   default=5)
    p.add_argument('--n-lures',   type=int,   default=2)
    p.add_argument('--duration',  type=float, default=60.0)
    p.add_argument('--quiet',     action='store_true')
    a=p.parse_args()
    run(a.n_drones, a.n_targets, a.n_lures, a.duration, not a.quiet)
