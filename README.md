# AEGIS

<p align="center">
  <b>Autonomous Kinetic Interceptor Swarm.</b><br>
  <i>500 drones. $4,200 each. Against $4M missiles.</i>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Python-3.11+-blue?logo=python" />
  <img src="https://img.shields.io/badge/NumPy-1.26+-013243?logo=numpy" />
  <img src="https://img.shields.io/badge/SciPy-1.12+-0054a6" />
  <img src="https://img.shields.io/badge/Real--Time-50Hz-green" />
  <img src="https://img.shields.io/badge/License-MIT-blue.svg" />
</p>

---

A $4,200 drone vs a $4,000,000 missile. That is the entire point.

Armies spend millions to shoot down things that cost thousands. The math does not work. AEGIS flips it — a swarm of cheap autonomous drones intercepting high-value threats at a fraction of the cost.

---

## Why

I follow Telegram channels about conflicts. After a while you notice the same thing over and over: armies are spending millions to shoot down things that cost thousands. A Shahed-136 costs $20,000. The missile used to intercept it costs $2,000,000.

I wanted to see if you could flip the economics. A swarm of $4,200 drones with autonomous target assignment, distributed sensor fusion, and energy-aware routing.

---

## What It Does

500 drones patrol at 300m altitude. When a threat appears, the system detects it, classifies it, tracks it, and sends the best-positioned drone to intercept.

- **50 Hz** real-time tick rate — full 50-drone cycle in ~6ms on a laptop
- **Human veto** at any point — weapons locked by default
- **3 interception waves** tested: Shahed-136, Lancet-3, mixed with decoys

---

## Modules

| Module | What It Does |
|--------|-------------|
| **M1 — Sensor Fusion** | Byzantine fault-tolerant data fusion (MAD filter). Drones report what they see, bad data gets rejected automatically. |
| **M2 — UKF Tracker** | 9-state Unscented Kalman Filter. Handles high-speed maneuvering targets. |
| **M3 — Elastic Net** | Formation control via 6 nearest neighbors. O(6N) instead of O(N²). |
| **M4 — Energy Budget** | Three reserves per drone: chute (10Wh), RTB (40Wh), combat (60Wh). If the math doesn't clear, the drone goes home. |

---

## The Airframe

**Tessera MK.II** — Delta-canard CFRP, 940mm wingspan, 7.2kg MTOW.

| Spec | Value |
|------|-------|
| EO Sensor | Sony IMX678 |
| Thermal | FLIR Lepton 3.5 |
| Radar | Inxpect 24GHz |
| Compute | Jetson Orin NX + Hailo H15 |
| Mesh | 60GHz phased array |
| Sprint | 320 km/h (Cesaroni Pro54 booster) |

Full BOM with part numbers and prices in `docs/BOM.md`.

---

## Does It Work?

The code runs. Tests pass. The simulation runs 3 waves (Shahed-136, 3x Lancet-3, mixed wave with decoys).

**What doesn't exist yet:** the hardware. This is a simulation + software project. The physics is real (ISA atmosphere, real drag coefficients, real motor specs) but nobody's built the drone yet.

Some of it is rough. The simulation isn't fully converged on wave 2. That's life.

---

## Quick Start

```bash
pip install numpy scipy

# Run tests
python tests/test_all.py

# Run the Nevada scenario
python simulations/nevada_scenario.py

# Benchmark the pipeline
python benchmarks/profile_pipeline.py
```

---

## Project Structure

```
src/aegis/
  origin_core.py          50Hz orchestrator
  core.py                 Main entry point
  oc_types.py             Shared types + physical constants
  fusion/
    spectral_fusion.py    Byzantine fault-tolerant sensor fusion
  ukf/
    intercept_ukf.py      9-state Unscented Kalman Filter
  swarm/
    elastic_net.py        Formation control (elastic net)
  energy/
    budget_manager.py     Per-drone energy reserves
  safety/
    proximity_lock.py     Collision avoidance
```

---

## License

MIT — build on it.
