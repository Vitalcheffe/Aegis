# Aegis

Autonomous drone swarm intercept system. The idea is simple: a $4,200 drone vs a $4,000,000 missile. That's the whole point.

## Why

I follow a lot of Telegram channels about conflicts. After a while you notice the same thing over and over: armies are spending millions to shoot down things that cost thousands. The math doesn't work.

I wanted to see if you could flip it. Use a swarm of cheap drones instead of one expensive missile.

## What it does

500 drones patrol at 300m. When a threat shows up, the system detects it, classifies it, tracks it, and sends the best drone to intercept. A human can veto at any time — weapons are locked by default.

Runs at 50Hz. One full tick for 50 drones takes about 6ms on a laptop.

### Modules

- **M1 — Sensor fusion** with Byzantine fault tolerance (MAD filter). Drones report what they see, bad data gets rejected automatically
- **M2 — UKF tracker** (Unscented Kalman Filter). 9-state, handles high-speed maneuvering targets
- **M3 — Elastic net formation**. Drones compute forces from 6 nearest neighbors, O(6N) instead of O(N²)
- **M4 — Energy budget**. Three reserves per drone: chute (10Wh), RTB (40Wh), combat (60Wh). If the math doesn't clear, the drone goes home

## The airframe

Tessera MK.II. Delta-canard CFRP, 940mm wingspan, 7.2kg MTOW.
- Sony IMX678 (EO) + FLIR Lepton 3.5 (thermal) + Inxpect 24GHz radar
- Jetson Orin NX + Hailo H15
- 60GHz phased array mesh
- Cesaroni Pro54 booster for sprint intercepts (320 km/h)

Full BOM with part numbers and prices in `docs/BOM.md`.

## Does it work?

The code runs. Tests pass. The simulation runs 3 waves (Shahed-136, 3× Lancet-3, mixed wave with decoys).

**What doesn't exist yet:** the hardware. This is a simulation + software project right now. The physics is real (ISA atmosphere, real drag coefficients, real motor specs) but nobody's built the drone.

Some of it is rough. The simulation isn't fully converged on wave 2. That's life.

## Run it

```bash
pip install numpy scipy
python tests/test_all.py
python simulations/nevada_scenario.py
python benchmarks/profile_pipeline.py
```

## Structure

```
src/aegis/
├── oc_types.py              # shared types + physical constants
├── origin_core.py           # 50Hz orchestrator
├── fusion/spectral_fusion.py
├── ukf/intercept_ukf.py
├── swarm/elastic_net.py
├── energy/budget_manager.py
└── safety/proximity_lock.py
```

## References

- Van der Merwe & Wan (2001) — UKF sigma points
- Lamport, Shostak, Pease (1982) — Byzantine Generals
- Olfati-Saber (2006) — Flocking algorithms
- ICAO Doc 7488/3 — ISA atmosphere
- MIL-STD-1522A — Structural safety

---

I'm 16, from Morocco. Built this because NEXUS (my OSINT project) showed me a problem worth solving.
