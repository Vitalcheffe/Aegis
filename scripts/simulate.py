"""
scripts/simulate.py
====================
Full Aegis simulation — 500 drones, Nevada-style test scenario.

Scenario:
  - Swarm patrols 1km² corridor at 300m AGL
  - At t=5s : Shahed-136 enters from north-east at 185 km/h
  - At t=10s: Attacker launches 3 flare lures simultaneously
  - At t=15s: Second Shahed from north-west
  - At t=25s: Both intercepted

Usage:
  python scripts/simulate.py            # text output
  python scripts/simulate.py --plot     # + matplotlib plots
  python scripts/simulate.py -n 50      # 50 drones (faster)
"""

from __future__ import annotations
import sys, os, time, argparse, random
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "src"))

import numpy as np

from aegis.oc_types import (
    Vec3, SensorFrame, DroneState, FusedTarget, EODetection, IRDetection,
    DopplerMeasurement, SensorStatus, TargetClass, TargetType,
    DroneRole, DRONE_E_USABLE, V_PATROL_MS, MISSION_ALT_M,
    generate_drone_ids,
)
from aegis.core import AegisCore


def build_frames(drone_states: list, targets: list,
                 step: int, rng: random.Random) -> list:
    """Simulate sensor observations from each drone for each target."""
    frames = []

    for i, state in enumerate(drone_states):
        eo_det  = EODetection()
        ir_det  = IRDetection()
        dop_det = DopplerMeasurement()

        # Find the closest target this drone can "see"
        best_target = None
        best_dist   = float("inf")
        for tgt in targets:
            d = state.pos.dist(tgt["pos"])
            if d < best_dist and d < 2000:
                best_dist   = d
                best_target = tgt

        if best_target:
            noise_m = 2.0
            measured_pos = best_target["pos"] + Vec3(
                rng.gauss(0, noise_m), rng.gauss(0, noise_m), 0
            )

            # 2% chance any given drone is jammed this step (Byzantine)
            if rng.random() < 0.02:
                measured_pos = Vec3(
                    rng.gauss(0, 300), rng.gauss(0, 300), -MISSION_ALT_M
                )

            eo_det  = EODetection(
                target_pos_world = measured_pos,
                confidence       = rng.uniform(0.8, 0.99),
                class_label      = "drone",
            )
            ir_temp = best_target.get("temp_K", 490.0)
            ir_det  = IRDetection(
                centroid_world = measured_pos,
                temp_K         = ir_temp,
                contrast_K     = ir_temp - 286.2,
                pixel_area     = rng.randint(8, 30),
                uniformity     = 0.75 if ir_temp < 700 else 0.1,
            )
            radial = -(best_target["vel"].norm())  # closing
            dop_det = DopplerMeasurement(
                radial_vel_ms = radial + rng.gauss(0, 0.5),
                range_m       = best_dist,
                snr_db        = 25.0,
                confidence    = 0.92,
            )

        frame = SensorFrame(
            drone_id       = state.drone_id,
            seq_num        = step,
            drone_pos      = state.pos,
            drone_vel      = state.vel,
            heading_deg    = state.heading_deg,
            battery_wh     = state.battery_wh,
            active_sensors = SensorStatus.ALL,
            rssi_dbm       = rng.uniform(-55, -40),
            eo             = eo_det,
            ir             = ir_det,
            doppler        = dop_det,
        )
        frames.append(frame)

    return frames


def run(n_drones: int = 500, plot: bool = False):
    print(f"\n{'='*65}")
    print(f"  AEGIS SIMULATION — {n_drones} drones — Nevada scenario")
    print(f"{'='*65}\n")

    rng    = random.Random(42)
    ids    = generate_drone_ids(n_drones)
    core   = AegisCore(ids)

    # Initialize drone positions in hex grid
    import math
    spacing = 45.0
    drone_states = []
    for i, did in enumerate(ids):
        row = i // int(math.sqrt(n_drones) * 1.1)
        col = i %  int(math.sqrt(n_drones) * 1.1)
        x = col * spacing + (row % 2) * spacing * 0.5 - spacing * math.sqrt(n_drones) / 2
        y = row * spacing * math.sqrt(3) / 2 - spacing * math.sqrt(n_drones) / 2
        d = DroneState(drone_id=did, formation_idx=i)
        d.pos        = Vec3(x, y, -MISSION_ALT_M)
        d.vel        = Vec3(rng.gauss(0, 2), rng.gauss(0, 2), 0)
        d.battery_wh = rng.uniform(140, DRONE_E_USABLE)
        d.heading_deg = rng.uniform(0, 360)
        drone_states.append(d)

    # Mission script
    targets = []
    total_steps  = 150   # 3 seconds at 50 Hz
    dt           = 1.0 / 50.0
    t            = 0.0
    confirmed_hist = []
    intercept_hist = []

    print(f"  {'Time':>6}  {'Confirmed':>10}  {'Lures':>6}  {'BFT_rej':>8}  {'Intercepts':>11}  {'Status'}")
    print(f"  {'-'*72}")

    for step in range(total_steps):
        t = step * dt

        # Scenario events
        if step == 25:   # t=0.5s: Shahed from NE
            targets.append({
                "id":     "SHAHED_001",
                "pos":    Vec3(1500, 1200, -MISSION_ALT_M),
                "vel":    Vec3(-36.3, -36.3, 0),  # 185 km/h SW
                "temp_K": 490.0,
                "type":   TargetType.SHAHED_136,
            })
            print(f"\n  [t={t:.1f}s] EVENT: Shahed-136 detected entering from NE\n")

        if step == 60:   # t=1.2s: 3 flare lures
            for k in range(3):
                targets.append({
                    "id":     f"LURE_{k:02d}",
                    "pos":    Vec3(1200 + k*80, 900 + k*60, -MISSION_ALT_M),
                    "vel":    Vec3(-20, -15, 0),
                    "temp_K": 850.0,  # flare temperature
                    "type":   TargetType.FLARE_LURE,
                })
            print(f"  [t={t:.1f}s] EVENT: 3 flare lures launched\n")

        if step == 90:   # t=1.8s: 2nd Shahed from NW
            targets.append({
                "id":     "SHAHED_002",
                "pos":    Vec3(1400, -1300, -MISSION_ALT_M),
                "vel":    Vec3(-36.3, +36.3, 0),
                "temp_K": 510.0,
                "type":   TargetType.SHAHED_136,
            })
            print(f"  [t={t:.1f}s] EVENT: Second Shahed-136 from NW\n")

        # Move targets
        for tgt in targets:
            tgt["pos"] = tgt["pos"] + tgt["vel"] * dt

        # Build sensor frames
        frames = build_frames(drone_states, targets, step, rng)

        # Run one core cycle
        core.ingest(frames)
        commands = core.step()

        # Update drone states from commands (simplified)
        new_states = []
        for cmd in commands:
            old = next((d for d in drone_states if d.drone_id == cmd.drone_id), None)
            if old is None:
                continue
            d = DroneState(drone_id=old.drone_id, formation_idx=old.formation_idx)
            d.pos        = cmd.formation_pos or old.pos
            d.vel        = old.vel
            d.heading_deg = old.heading_deg
            d.battery_wh  = max(old.battery_wh - dt * 0.008, 0)
            d.role        = cmd.role
            new_states.append(d)
        if new_states:
            drone_states = new_states

        # Stats
        status  = core.status
        n_conf  = status.n_confirmed
        n_lures = status.n_lures
        n_bft   = status.n_bft_rejected
        n_intercept = status.n_sprint

        confirmed_hist.append(n_conf)
        intercept_hist.append(n_intercept)

        if step % 25 == 0:
            fmt_status = f"{'PATROL':>12}" if n_intercept == 0 else f"{'ENGAGING':>12}"
            print(f"  {t:>6.2f}s  {n_conf:>10}  {n_lures:>6}  {n_bft:>8}  {n_intercept:>11}  {fmt_status}")

    # Final summary
    print(f"\n{'='*65}")
    print(f"  SIMULATION COMPLETE — {total_steps} cycles at 50 Hz")
    print(f"{'='*65}")
    print(f"  Drones        : {n_drones}")
    print(f"  Max confirmed : {max(confirmed_hist) if confirmed_hist else 0}")
    print(f"  Lures detected: {status.n_lures}")
    print(f"  BFT rejections: {status.n_bft_rejected}")
    print(f"  Formation hlth: {status.formation_health:.2f}")
    print(f"  Net quorum    : {status.net_quorum:.2f}")
    print(f"  Mean battery  : {status.mean_batt_pct:.1f}%")
    print(f"  Audit log     : {len(core.audit_log)} entries\n")

    if plot:
        _plot(confirmed_hist, intercept_hist, n_drones, total_steps)


def _plot(confirmed: list, intercepts: list, n: int, steps: int):
    try:
        import matplotlib.pyplot as plt
        import matplotlib.gridspec as gridspec
        fig = plt.figure(figsize=(12, 5), dpi=100)
        gs  = gridspec.GridSpec(1, 2)

        ax1 = fig.add_subplot(gs[0])
        t   = [i / 50.0 for i in range(len(confirmed))]
        ax1.plot(t, confirmed, label="Confirmed targets", color="#e63946", linewidth=2)
        ax1.plot(t, intercepts, label="Drones sprinting", color="#457b9d", linewidth=2)
        ax1.set_xlabel("Time (s)")
        ax1.set_ylabel("Count")
        ax1.set_title(f"Aegis — {n} drones")
        ax1.legend(); ax1.grid(alpha=0.3)

        ax2 = fig.add_subplot(gs[1])
        ax2.text(0.1, 0.85, "AEGIS v1.0", fontsize=18, fontweight="bold",
                 transform=ax2.transAxes)
        ax2.text(0.1, 0.70, f"{n} drones", fontsize=13, transform=ax2.transAxes)
        ax2.text(0.1, 0.55, "BFT: MAD 3σ", fontsize=11, transform=ax2.transAxes)
        ax2.text(0.1, 0.45, "Tracker: UKF 9-state", fontsize=11, transform=ax2.transAxes)
        ax2.text(0.1, 0.35, "Formation: Elastic Net O(6N)", fontsize=11, transform=ax2.transAxes)
        ax2.text(0.1, 0.25, "Safety: 4-check fail-safe", fontsize=11, transform=ax2.transAxes)
        ax2.axis("off")

        plt.tight_layout()
        out = "/tmp/aegis_sim.png"
        plt.savefig(out, dpi=150)
        print(f"  Plot saved → {out}")
        plt.show()
    except ImportError:
        print("  (matplotlib not available — skipping plot)")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Aegis swarm simulation")
    parser.add_argument("-n", "--drones", type=int, default=50)
    parser.add_argument("--plot", action="store_true")
    args = parser.parse_args()
    run(args.drones, args.plot)
