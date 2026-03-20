# AEGIS

Autonomous drone swarm intercept system. One unit costs $4,200. A PAC-3 missile costs $4,000,000. That's the whole idea.

---

I follow about 90 Telegram channels — conflict zones, OSINT accounts, AIS trackers, field journalists. Not for fun, for information. After a while you start seeing patterns, not just events. One pattern kept coming back: air defense is economically broken. Armies are firing million-dollar missiles at twenty-dollar drones and losing the math war every single time.

I built NEXUS first — an OSINT engine that correlates 35+ live feeds and clusters events across 6 dimensions. It's how I watch conflicts in real time. NEXUS is what showed me the problem clearly enough to want to solve it.

AEGIS is the answer I came up with. Not a finished product. A serious attempt at inverting the cost curve using a swarm of cheap autonomous interceptors instead of one expensive missile.

---

## How it works

A swarm of 500 drones patrols at 300m AGL. When a threat appears — a Shahed, a Lancet, whatever — the system detects, classifies, tracks, and intercepts without a human in the loop for the kinetics. A human still has veto power at all times. The weapon is locked by default: hardware failure means LOCKED, not ARMED.

The pipeline runs at 50 Hz. One full control tick for 50 drones takes about 6ms on a laptop.

**M1 — Sensor fusion with Byzantine fault tolerance**

Each drone reports what it sees. The problem is that drones can be jammed or spoofed. The MAD filter (Median Absolute Deviation) rejects bad votes without knowing which drones are compromised — it just needs less than 1/3 of the swarm to be Byzantine, which is the theoretical minimum from Lamport 1982.

Five physical rules identify decoys: thermal spikes above 700K are flares, large IR signatures with low thermal contrast are balloons, sudden deceleration above 15 m/s² is a jettisoned lure, and so on. These aren't heuristics — they're derived from the actual physics of what different objects look like in infrared.

**M2 — 9-state UKF tracker**

Linear Kalman filtering fails at high speed and high G. The Unscented Kalman Filter propagates sigma points through the full nonlinear dynamics, which handles maneuvering targets correctly. State vector: position, velocity, acceleration in 3 axes. The intercept scan predicts 12 seconds ahead in 0.1s windows. With the current implementation the full scan takes under 1ms (was 37ms before fixing the Cholesky decomposition bottleneck).

**M3 — Elastic net formation**

The swarm doesn't fly on fixed waypoints. Each drone computes forces from its 6 nearest neighbors — attraction springs, repulsion below 15m, and a soft pull toward its grid slot. This is O(6N) instead of O(N²). At 500 drones that's 83× fewer computations than a full mesh. The formation shifts between PATROL (hexagonal grid) and ENGAGE (contracted cone toward target) automatically.

**M4 — Energy budget**

Three inviolable reserves per drone, in order of priority:
- 10 Wh for parachute deployment (cannot be touched)
- 40 Wh for return-to-base
- 60 Wh combat reserve for one sprint intercept

If the math doesn't clear, the drone RTBs. No exceptions.

---

## Hardware

The airframe is called Tessera MK.II. Delta-canard CFRP, 940mm wingspan, 7.2kg MTOW. It carries a Sony IMX678 for EO, a FLIR Lepton 3.5 for thermal, and an Inxpect 24GHz Doppler radar. Compute is a Jetson Orin NX with a Hailo H15 accelerator. Mesh networking runs on 60GHz phased array radio.

The sprint capability comes from a Cesaroni Pro54 APCP solid booster: 764.5 N·s over 1.8 seconds, bringing the drone from patrol speed to 320 km/h. At impact that's 28,445 joules of kinetic energy.

None of this hardware exists yet. The BOM is in `docs/BOM.md` with real part numbers and prices. The physics is validated from first principles — ISA atmosphere model, real drag coefficients, real motor specs.

---

## What actually runs

```
src/aegis/
├── oc_types.py          # all shared types and physical constants (1976 lines)
├── origin_core.py       # 50Hz orchestrator
├── fusion/spectral_fusion.py   # M1
├── ukf/intercept_ukf.py        # M2
├── swarm/elastic_net.py        # M3
├── energy/budget_manager.py    # M4
└── safety/proximity_lock.py    # ProximityLock + HumanLoopGate + ADS-B spoof detection
```

```bash
pip install numpy scipy
python tests/test_all.py          # 63 tests
python simulations/nevada_scenario.py   # 3-wave engagement
python benchmarks/profile_pipeline.py  # performance numbers
```

Tests: 63/63 passing. Pipeline: 6.4ms average per tick, 14.4ms p99 on 50 drones. Budget is 20ms at 50Hz.

Nevada simulation runs three waves against the real pipeline — a Shahed-136, then three Lancet-3 in formation, then a mixed wave with decoys. Wave 1 intercepts in 7 ticks.

---

## Why this matters

The Shahed-136 costs around $20,000. Ukraine has been using modified Soviet radar and Soviet-era guns to shoot them down. Israel's Iron Dome fires $40,000–$100,000 missiles per intercept. The math is unsustainable against an adversary who can produce cheap drones at scale.

A swarm of 500 AEGIS units costs roughly $2.1M. One PAC-3 battery costs $1B. The swarm covers more area, responds faster, and each unit that gets destroyed costs $4,200 to replace, not $4,000,000.

The asymmetry runs both ways now.

---

## References

- Van der Merwe & Wan (2001) — UKF sigma point derivation
- Lamport, Shostak, Pease (1982) — Byzantine Generals Problem
- Olfati-Saber (2006) — Flocking algorithms for multi-agent systems
- ICAO Doc 7488/3 — ISA atmosphere model
- MIL-STD-1522A — Structural safety factors

---

I'm 16, I'm in Morocco, and I'm in my first year of secondary school (Seconde in the French system). I built NEXUS because I was frustrated with how hard it is to track what's actually happening in active conflict zones. I built AEGIS because NEXUS showed me a problem worth solving.

Some of this is rough. The simulation isn't fully converged on wave 2. The hardware doesn't exist. But the math is real, the code runs, and the physics comes from actual sources.

*AEGIS v1.0.0 — Amine Harch (Vitalcheffe)*
