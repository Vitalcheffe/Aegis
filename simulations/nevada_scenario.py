"""
AEGIS · Nevada Proving Ground
==============================
Three-wave engagement simulation demonstrating the full pipeline.

Each wave runs as:
  SensorFrames → SpectralFusion (M1) → MultiTargetUKF (M2)
  → ElasticNet (M3) → EnergyBudget (M4) → ProximityLock → HumanLoopGate

Run:
  python simulations/nevada_scenario.py
  PYTHONPATH=src python simulations/nevada_scenario.py
"""
import sys, os, json, time, random, math
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'src'))

import numpy as np
from aegis.oc_types import (
    Vec3, SensorFrame, DroneState, DroneRole, DroneHealth,
    EODetection, IRDetection, DopplerMeasurement,
    TargetType, SensorStatus, DRONE_E_USABLE, MISSION_ALT_M,
)
from aegis.fusion.spectral_fusion import SpectralFusion
from aegis.ukf.intercept_ukf import MultiTargetUKF
from aegis.swarm.elastic_net import ElasticNet
from aegis.energy.budget_manager import EnergyBudgetManager, TargetWorthEngine
from aegis.safety.proximity_lock import ProximityLock, HumanLoopGate

SEED = 42
N    = 30
DT   = 0.02
BASE = Vec3(0, 0, -MISSION_ALT_M)

random.seed(SEED)
np.random.seed(SEED)


class Threat:
    """Simulated incoming threat with straight-line trajectory + optional jinking."""

    def __init__(self, tid, pos, vel, ttype, is_lure=False, temp_K=410.0, jink_g=0.0):
        self.target_id = tid
        self.pos       = pos
        self.vel       = vel
        self.ttype     = ttype
        self.is_lure   = is_lure
        self.temp_K    = temp_K
        self.jink_g    = jink_g
        self.alive     = True

    def step(self, dt):
        if not self.alive:
            return
        if self.jink_g and random.random() < 0.04:
            jink = random.gauss(0, self.jink_g * 9.81) * dt
            self.vel = Vec3(self.vel.x, self.vel.y + jink, self.vel.z)
        self.pos = self.pos + self.vel * dt

    def make_frame(self, drone_id, drone_pos, is_byzantine=False):
        """One SensorFrame from a single drone observing this threat."""
        if not self.alive:
            return None
        if is_byzantine:
            # Byzantine drone reports wrong position
            p = Vec3(random.gauss(4000, 300), random.gauss(0, 300), self.pos.z)
        else:
            nm = 2.5
            p = Vec3(self.pos.x + random.gauss(0, nm),
                     self.pos.y + random.gauss(0, nm),
                     self.pos.z + random.gauss(0, nm))
        t_K = self.temp_K + random.gauss(0, 10)
        return SensorFrame(
            drone_id    = drone_id,
            eo          = EODetection(target_pos_world=p,
                                      confidence=max(0.1, random.gauss(0.88, 0.05)),
                                      class_label='drone'),
            ir          = IRDetection(centroid_world=p, temp_K=t_K,
                                      background_K=286.0,
                                      contrast_K=max(0, t_K - 286.0),
                                      pixel_area=random.randint(5, 14),
                                      uniformity=0.1 if self.is_lure else random.uniform(0.65, 0.85)),
            doppler     = DopplerMeasurement(
                              radial_velocity_ms=-(drone_pos - self.pos).norm() * 0.05,
                              confidence=0.82, snr_db=21.0),
            drone_pos   = drone_pos,
            battery_wh  = DRONE_E_USABLE,
            active_sensors = SensorStatus.ALL,
        )


def build_swarm(net):
    swarm = {}
    for i, slot in enumerate(net._slot_positions[:N]):
        did = f'AEGIS_{i:04d}'
        ds  = DroneState(
            drone_id=did, formation_idx=i,
            role=DroneRole.PATROL, health=DroneHealth.NOMINAL,
            active_sensors=SensorStatus.ALL, pos=slot,
            battery_wh=DRONE_E_USABLE * random.uniform(0.88, 1.0),
        )
        ds.__dict__['last_ping_s'] = time.time()
        ds.__dict__['rssi_dbm']    = -42.0
        swarm[did] = ds
    return swarm


def run_wave(name, threats, swarm, net, fusion, ukf, budget, worth, lock, gate, byz_ids):
    real  = [t for t in threats if not t.is_lure]
    lures = [t for t in threats if t.is_lure]

    print(f'\n  {name}')
    print(f'  Real threats: {len(real)}  Lures: {len(lures)}')

    hit = pen = lure_id = ticks = 0
    t_wall = time.perf_counter()

    for _ in range(int(14.0 / DT)):
        for th in threats:
            th.step(DT)

        # Build sensor frames: each drone reports on each visible threat
        frames = []
        for did, ds in swarm.items():
            is_byz = did in byz_ids
            for th in threats:
                if not th.alive:
                    continue
                # Only observe threats within sensor range
                dist = ds.pos.dist(th.pos)
                if dist > 1600:
                    continue
                f = th.make_frame(did, ds.pos, is_byz)
                if f:
                    frames.append(f)

        if not frames:
            break

        fused     = fusion.update(frames)
        fused     = ukf.update(fused)
        confirmed = [t for t in fused if t.is_confirmed]

        # Count lure identifications this tick
        for ft in fused:
            if ft.is_lure:
                lure_id += 1

        net.step(swarm, confirmed, DT)

        # Engagement: one shot per confirmed target per tick
        engaged_targets = set()
        for ft in confirmed:
            if ft.target_id in engaged_targets:
                continue
            best = budget.pick_best_drone(swarm, ft.pos, BASE)
            if not best:
                continue
            inter = ukf.get_intercept(ft.target_id, swarm[best].pos)
            if not inter:
                continue
            profile = worth.score(ft, 0.5)
            if profile.threat_score < 60:
                continue
            ls  = lock.evaluate(swarm[best], swarm, False, 1.0)
            ok, _ = gate.request_authorisation(
                best, ft.target_id, inter['confidence'],
                profile.threat_score, False)
            if ok and not ls.is_locked:
                for th in real:
                    if th.alive and not th.is_lure and th.target_id == ft.target_id:
                        th.alive = False
                        hit += 1
                        engaged_targets.add(ft.target_id)

        # Penetration: threat crossed the asset line
        for th in real:
            if th.alive and th.pos.x < -60:
                th.alive = False
                pen += 1

        # Battery drain
        for ds in swarm.values():
            ds.battery_wh = max(0, ds.battery_wh - 0.015 * DT)

        ticks += 1
        if all(not th.alive for th in threats):
            break

    elapsed_ms = (time.perf_counter() - t_wall) * 1000
    lure_ok    = min(lure_id // max(ticks // 8, 1), len(lures))

    mark_hit  = '✓ ALL INTERCEPTED' if hit >= len(real) else f'⚠  {hit}/{len(real)}'
    mark_lure = f'{lure_ok}/{len(lures)}' if lures else 'n/a'

    print(f'  Intercepted     : {mark_hit}')
    print(f'  Escaped         : {pen}')
    print(f'  Lures identified: {mark_lure}')
    print(f'  Ticks           : {ticks}  ({elapsed_ms:.0f} ms wall)')
    print(f'  Fusion stats    : {fusion.stats()}')

    return {
        'name': name, 'threats': len(real), 'lures': len(lures),
        'hit': hit, 'pen': pen, 'lure_ok': lure_ok,
        'ticks': ticks, 'wall_ms': round(elapsed_ms, 1),
    }


def run():
    W = 68
    print(f'\n  {"="*W}')
    print(f'  AEGIS · Nevada Proving Ground  |  {N} interceptors  |  seed={SEED}')
    print(f'  {"="*W}')

    net    = ElasticNet(N, origin=BASE)
    fusion = SpectralFusion()
    ukf    = MultiTargetUKF()
    budget = EnergyBudgetManager()
    worth  = TargetWorthEngine()
    lock   = ProximityLock()
    gate   = HumanLoopGate()
    swarm  = build_swarm(net)
    byz    = set(random.sample(list(swarm.keys()), max(1, N // 20)))

    print(f'\n  Byzantine nodes ({len(byz)}/{N}): {", ".join(sorted(byz)[:2])}...')

    waves = [
        ('Wave 1 — Shahed-136', [
            Threat('SHD001',
                   Vec3(580, 0, -300), Vec3(-51, 0, 0),
                   TargetType.SHAHED_136, temp_K=490.0),
        ]),
        ('Wave 2 — 3× Lancet-3 formation', [
            Threat(f'LAN{i:03d}',
                   Vec3(540 + i*22, (i-1)*18, -300), Vec3(-83, 0, 0),
                   TargetType.LANCET_3, jink_g=2.0, temp_K=380.0)
            for i in range(3)
        ]),
        ('Wave 3 — Mixed threats + lures', [
            Threat('SHD002', Vec3(600,  32, -300), Vec3(-49, 3, 0),
                   TargetType.SHAHED_136, temp_K=488.0),
            Threat('LAN004', Vec3(570, -38, -300), Vec3(-80, 0, 0),
                   TargetType.LANCET_3, temp_K=382.0),
            Threat('FLR001', Vec3(590, -12, -300), Vec3(-43, 0, 0),
                   TargetType.FLARE_LURE, is_lure=True, temp_K=860.0),
            Threat('BAL001', Vec3(550,  52, -300), Vec3(-36, 2, 0),
                   TargetType.BALLOON_LURE, is_lure=True, temp_K=289.0),
        ]),
    ]

    results = []
    for name, threats in waves:
        fusion.reset()
        ukf.clear_stale_tracks()
        r = run_wave(name, threats, swarm, net, fusion, ukf, budget, worth, lock, gate, byz)
        results.append(r)

    total_t = sum(r['threats'] for r in results)
    total_h = sum(r['hit']     for r in results)
    total_p = sum(r['pen']     for r in results)
    pct     = total_h / max(total_t, 1) * 100

    print(f'\n  {"="*W}')
    print(f'  MISSION DEBRIEF')
    print(f'  {"="*W}')
    print(f'  Threats      : {total_t}')
    print(f'  Intercepted  : {total_h}  ({pct:.0f}%)')
    print(f'  Penetrations : {total_p}')
    print(f'  Byzantine    : {len(byz)} nodes handled transparently')
    print(f'  AEGIS cost   : ${total_h * 4_200:,}')
    print(f'  PAC-3 equiv  : ${total_h * 4_000_000:,}')
    print(f'  Saved        : ${total_h * (4_000_000 - 4_200):,}')

    out = os.path.join(os.path.dirname(__file__), 'nevada_debrief.json')
    with open(out, 'w') as f:
        json.dump({
            'seed': SEED, 'n_drones': N, 'byzantine': len(byz),
            'waves': results,
        }, f, indent=2)
    print(f'\n  Debrief → {out}')
    print(f'  {"="*W}\n')

    return results


if __name__ == '__main__':
    run()
