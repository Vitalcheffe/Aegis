<div align="center">

# 🛡️ AEGIS

### _Autonomous Kinetic Interceptor Swarm._

**500 drones. $4,200 each. Against $4M missiles.**

<p>
  <a href="https://github.com/Vitalcheffe/Aegis/stargazers"><img src="https://img.shields.io/github/stars/Vitalcheffe/Aegis?style=for-the-badge&logo=github&label=Stars&color=FFD700" /></a>
  <a href="https://github.com/Vitalcheffe/Aegis/network/members"><img src="https://img.shields.io/github/forks/Vitalcheffe/Aegis?style=for-the-badge&logo=github&label=Forks&color=blue" /></a>
  <a href="https://github.com/Vitalcheffe/Aegis/issues"><img src="https://img.shields.io/github/issues/Vitalcheffe/Aegis?style=for-the-badge&logo=github&color=green" /></a>
  <a href="https://github.com/Vitalcheffe/Aegis/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge&logo=opensourceinitiative" /></a>
</p>

<p>
  <img src="https://img.shields.io/badge/Python-3.11+-blue?style=for-the-badge&logo=python&logoColor=white" />
  <img src="https://img.shields.io/badge/NumPy-1.26+-013243?style=for-the-badge&logo=numpy&logoColor=white" />
  <img src="https://img.shields.io/badge/SciPy-1.12+-0054a6?style=for-the-badge&logo=scipy&logoColor=white" />
  <img src="https://img.shields.io/badge/Real--Time-50Hz-green?style=for-the-badge" />
</p>

<p>
  <img src="https://img.shields.io/badge/Swarm-500_Drones-FF6B35?style=for-the-badge" />
  <img src="https://img.shields.io/badge/UKF-9--State-purple?style=for-the-badge" />
  <img src="https://img.shields.io/badge/BFT-Sensor_Fusion-red?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Jetson-Orin_NX-76B900?style=for-the-badge&logo=nvidia&logoColor=white" />
</p>

<p>
  <a href="https://github.com/Vitalcheffe"><img src="https://img.shields.io/badge/GitHub-Vitalcheffe-181717?style=for-the-badge&logo=github&logoColor=white" /></a>
  <a href="https://t.me/amnox271"><img src="https://img.shields.io/badge/Telegram-Contact-blue?style=for-the-badge&logo=telegram&logoColor=white" /></a>
</p>

<img src="https://raw.githubusercontent.com/Trilokia/Trilokia/refs/heads/main/bottom_header.svg" width="100%"/>

</div>

---

> [!IMPORTANT]
> **A $4,200 drone vs a $4,000,000 missile. That is the entire point.**
>
> Armies spend millions to shoot down things that cost thousands. The math doesn't work.
> **AEGIS flips it.**

---

## 🚀 The Problem

A Shahed-136 costs **$20,000**. The missile used to intercept it costs **$2,000,000**. That's a 100:1 cost ratio — and the attacker always wins the economics.

Current air defense was designed for expensive threats: fighter jets, cruise missiles, ballistic missiles. Against cheap, mass-produced drones and loitering munitions, it collapses. You can't afford to shoot a Patriot at every $20K drone.

**AEGIS inverts the cost curve.** A swarm of autonomous interceptor drones at **$4,200 per unit** — with distributed sensor fusion, autonomous target assignment, and energy-aware routing.

---

## 💰 The Economics

<div align="center">

| Threat | Cost | Current Intercept | Intercept Cost | Ratio | **AEGIS Cost** | **AEGIS Ratio** |
|:-------|-----:|:------------------|---------------:|------:|---------------:|----------------:|
| Shahed-136 | $20,000 | Patriot PAC-3 | $2,000,000 | 1:100 | **$4,200** | **1:0.2** |
| Lancet-3 | $35,000 | IRIS-T SLM | $450,000 | 1:13 | **$4,200** | **1:0.1** |
| Cruise Missile | $1,500,000 | SM-6 | $4,000,000 | 1:2.7 | **$12,600** (3x) | **1:0.008** |
| Mixed Wave (10×) | $200,000 | Layered Defense | $8,000,000+ | 1:40 | **$42,000** | **1:0.2** |

</div>

---

## 🎯 What It Does

500 drones patrol at **300m altitude**. When a threat appears, the system detects it, classifies it, tracks it, and sends the best-positioned drone to intercept.

- ⚡ **50 Hz real-time tick rate** — full 500-drone cycle in ~6ms on a laptop
- 🧑‍✈️ **Human veto at any point** — weapons locked by default, always
- 🎯 **3 interception waves tested** — Shahed-136, Lancet-3, mixed with decoys
- 🔒 **Byzantine fault-tolerant** — bad sensor data gets rejected automatically
- 🔋 **Energy-aware routing** — drones go home before they fall out of the sky

---

## 🔧 Modules

<div align="center">

```mermaid
flowchart TB
    subgraph SENSORS["📡 Sensor Layer"]
        EO[EO/IR Camera<br/>Sony IMX678 + FLIR Lepton]
        RADAR[24GHz Radar<br/>Inxpect LBK-24]
        GPS[RTK GPS<br/>Here3+]
        IMU[Redundant IMU<br/>ICM-42688-P ×2]
    end

    subgraph M1["M1 — Sensor Fusion"]
        BFT[Byzantine Fault-Tolerant<br/>MAD Filter]
    end

    subgraph M2["M2 — UKF Tracker"]
        UKF[9-State Unscented<br/>Kalman Filter]
    end

    subgraph M3["M3 — Elastic Net"]
        FORM[Formation Control<br/>6 Nearest Neighbors<br/>O(6N)]
    end

    subgraph M4["M4 — Energy Budget"]
        ENERGY[3-Reserve Model<br/>Chute · RTB · Combat]
    end

    subgraph SAFETY["🔒 Safety Layer"]
        LOCK[ProximityLock<br/>Weapon Safe by Default]
        HUMAN[HumanLoopGate<br/>Final Authorization]
        ADSB[ADS-B Spoof<br/>Detector]
    end

    SENSORS --> M1
    M1 --> M2
    M2 --> M3
    M3 --> M4
    M4 --> SAFETY

    style SENSORS fill:#1a1a2e,stroke:#e94560,color:#fff
    style M1 fill:#16213e,stroke:#0f3460,color:#fff
    style M2 fill:#0f3460,stroke:#533483,color:#fff
    style M3 fill:#1a1a2e,stroke:#e94560,color:#fff
    style M4 fill:#16213e,stroke:#0f3460,color:#fff
    style SAFETY fill:#2d0a0a,stroke:#ff4444,color:#fff
```

</div>

| Module | What It Does |
|:-------|:-------------|
| **M1 — Spectral Fusion** | Byzantine fault-tolerant data fusion (MAD filter). Drones report what they see — bad data gets rejected automatically. No single compromised sensor can corrupt the picture. |
| **M2 — UKF Tracker** | 9-state Unscented Kalman Filter. Tracks position, velocity, and acceleration of high-speed maneuvering targets. Handles evasive threats. |
| **M3 — Elastic Net** | Formation control via 6 nearest neighbors. **O(6N)** instead of O(N²) — 83× faster than full mesh at N=500. |
| **M4 — Energy Budget** | Three inviolable reserves per drone: chute (10Wh), RTB (40Wh), combat (60Wh). If the math doesn't clear, the drone goes home. No exceptions. |
| **Safety — ProximityLock** | Weapons locked by default. Requires active proof of safety every tick to unlock. Fail-safe: if anything goes wrong, weapons lock. |
| **Safety — HumanLoopGate** | Final human authorization. No engagement without human approval. Always. |
| **Safety — ADS-B Spoof Detector** | Detects spoofed ADS-B transponder signals to prevent friendly-fire. |

---

## ✈️ The Airframe — Tessera MK.II

Delta-canard CFRP, built for speed and endurance.

<div align="center">

```
                        ┌──────────┐
                        │  EO/IR   │
                        │  Sensor  │
                    ┌───┴──────────┴───┐
                   ╱    CANARD L  CANARD  ╲
                  ╱  ┌─────┐    ┌─────┐    ╲
                 │   │     │    │     │     │
    SPRINT ◄─────│   │  ████████████  │     │─────► PATROL
   320 km/h      │   │  █ JETSON  █  │     │     180 km/h
                 │   │  █ ORIN NX █  │     │
                  ╲  │  ████████████  │    ╱
                   ╲ │     MAIN WING │   ╱
                    ╲│  940mm span   │  ╱
                     └───────┬───────┘
                             │
                        ┌────┴────┐
                        │  MOTOR  │
                        │ U10+    │
                        │ 700W    │
                        └─────────┘
```

</div>

| Spec | Value |
|:-----|:------|
| **Wingspan** | 940 mm |
| **MTOW** | 7.2 kg |
| **Configuration** | Delta-canard |
| **Material** | T800H/3900-2 CFRP prepreg |
| **EO Sensor** | Sony IMX678 (4K 60fps, 0.1 lux) |
| **Thermal** | FLIR Lepton 3.5 (LWIR 8–14 μm) |
| **Radar** | Inxpect 24 GHz Doppler (±50 m/s) |
| **Compute** | Jetson Orin NX (70 TOPS) + Hailo H15 (40 TOPS) |
| **Mesh Network** | 60 GHz phased array (500 Mbps) |
| **Sprint Speed** | 320 km/h (Cesaroni Pro54 booster) |
| **Patrol Speed** | 180 km/h |
| **Endurance** | ~45 min patrol / ~8 min sprint |

Full BOM with part numbers and prices: [`docs/BOM.md`](docs/BOM.md)

---

## 📊 Does It Work?

<div align="center">

| Test | Status | Details |
|:-----|:------:|:--------|
| Unit Tests | ✅ | All modules tested individually |
| Fusion (M1) | ✅ | Byzantine rejection validated |
| UKF (M2) | ✅ | 9-state tracking converges |
| Elastic Net (M3) | ✅ | 500-drone formation stable |
| Energy (M4) | ✅ | Reserve model enforced |
| Safety | ✅ | ProximityLock + HumanLoopGate |
| Wave 1 — Shahed-136 | ✅ | Single target intercept |
| Wave 2 — Lancet-3 | ⚠️ | 3× targets, convergence in progress |
| Wave 3 — Mixed + Decoys | ✅ | Decoy rejection working |
| Hardware | ❌ | Simulation only — no physical drone built yet |

</div>

> [!NOTE]
> **Honesty corner:** The code runs. Tests pass. The simulation is real (ISA atmosphere, real drag coefficients, real motor specs). But nobody's built the drone yet. Wave 2 isn't fully converged. That's life — this is a research project, not a product.

---

## ⚡ Performance

<div align="center">

```
┌─────────────────────────────────────────────────┐
│              50 Hz PIPELINE BENCHMARK            │
├─────────────────────────────────────────────────┤
│                                                 │
│  Sensor Fusion (M1)     ████░░░░░░░░░░  0.8ms  │
│  UKF Tracking (M2)      █████░░░░░░░░░  1.2ms  │
│  Elastic Net (M3)       ██████░░░░░░░░  1.5ms  │
│  Energy Budget (M4)     ██░░░░░░░░░░░░  0.4ms  │
│  Safety Checks          ██░░░░░░░░░░░░  0.3ms  │
│  Command Dispatch       █░░░░░░░░░░░░░  0.2ms  │
│  ──────────────────────────────────────────     │
│  TOTAL                  ████████████░░  ~4.4ms  │
│  TICK BUDGET (50Hz)     ████████████████ 20ms   │
│  HEADROOM               ██████████░░░░  15.6ms  │
│                                                 │
│  ✅ 500 drones @ 50Hz on laptop (i7-12700H)     │
└─────────────────────────────────────────────────┘
```

</div>

---

## 🚀 Quick Start

### Install

```bash
git clone https://github.com/Vitalcheffe/Aegis.git
cd Aegis
pip install -r requirements.txt
```

### Run Tests

```bash
# All tests
python tests/test_all.py

# Individual modules
python tests/test_fusion.py
python tests/test_ukf.py
python tests/test_energy.py
python tests/test_safety.py
```

### Run Simulation

```bash
# Nevada scenario — 3 waves
python simulations/nevada_scenario.py

# Benchmark pipeline
python scripts/simulate.py
```

### Prerequisites

| Requirement | Version |
|:------------|:--------|
| **Python** | 3.11+ |
| **NumPy** | 1.26+ |
| **SciPy** | 1.12+ |

No exotic dependencies. No GPU required for simulation.

---

## 📁 Project Structure

<div align="center">

```
Aegis/
├── 📂 src/aegis/
│   ├── 🐍 origin_core.py         # 50Hz orchestrator — ZERO business logic
│   ├── 🐍 core.py                # Main entry point
│   ├── 🐍 oc_types.py            # Shared types + physical constants
│   │
│   ├── 📂 fusion/
│   │   └── 🐍 spectral_fusion.py # M1 — Byzantine fault-tolerant sensor fusion
│   │
│   ├── 📂 ukf/
│   │   └── 🐍 intercept_ukf.py   # M2 — 9-state Unscented Kalman Filter
│   │
│   ├── 📂 swarm/
│   │   └── 🐍 elastic_net.py     # M3 — Formation control, O(6N)
│   │
│   ├── 📂 energy/
│   │   └── 🐍 budget_manager.py  # M4 — 3-reserve energy model
│   │
│   └── 📂 safety/
│       └── 🐍 proximity_lock.py  # ProximityLock + HumanLoopGate + ADS-B
│
├── 📂 simulations/
│   └── 🐍 nevada_scenario.py     # 3-wave intercept simulation
│
├── 📂 tests/
│   ├── 🧪 test_all.py            # Run all tests
│   ├── 🧪 test_fusion.py
│   ├── 🧪 test_ukf.py
│   ├── 🧪 test_energy.py
│   ├── 🧪 test_safety.py
│   └── 🧪 test_oc_types.py
│
├── 📂 docs/
│   ├── 📋 BOM.md                 # Full bill of materials ($4,200/unit)
│   ├── 🏗️ architecture.md        # Design decisions
│   └── 📂 figures/
│
├── 📂 scripts/
│   └── 🐍 simulate.py            # Pipeline benchmark
│
├── ⚙️ pyproject.toml
├── 📋 requirements.txt
└── 📄 LICENSE                    # MIT
```

</div>

---

## 🔒 Safety Philosophy

> [!CAUTION]
> **Weapons are locked by default. Always.**

AEGIS implements a **defense-in-depth safety model**:

1. **ProximityLock** — Every drone's weapon system starts LOCKED. To unlock, the drone must provide active proof of safety every single tick (20ms). If anything goes wrong — communication lost, sensor failure, unexpected behavior — weapons lock immediately.

2. **HumanLoopGate** — No engagement without human authorization. Period. The system can track, classify, and recommend — but the final "go" requires a human.

3. **ADS-B Spoof Detection** — Detects spoofed transponder signals to prevent friendly-fire against civilian or allied aircraft.

4. **3-Reserve Energy Model** — No drone can spend its RTB or chute reserves. If the math doesn't clear for a safe return, the drone doesn't engage. No exceptions, no overrides.

5. **Byzantine Fusion** — Compromised or malfunctioning sensors are automatically rejected. No single bad sensor can corrupt the tactical picture.

---

## 🌐 System Architecture

<div align="center">

```
                    ┌─────────────────────┐
                    │    COMMAND CENTER    │
                    │  (Human Operator)    │
                    └──────────┬──────────┘
                               │ Auth + Veto
                               ▼
┌──────────────────────────────────────────────────────┐
│                   AEGIS CORE (50Hz)                   │
│  ┌─────────┐  ┌──────┐  ┌──────┐  ┌──────┐  ┌─────┐ │
│  │ Fusion  │→→│ UKF  │→→│ Net  │→→│Energy│→→│Safe │ │
│  │  M1     │  │  M2  │  │  M3  │  │  M4  │  │Lock │ │
│  └─────────┘  └──────┘  └──────┘  └──────┘  └─────┘ │
└──────────────────────────┬───────────────────────────┘
                           │ DroneCommands
              ┌────────────┼────────────┐
              ▼            ▼            ▼
         ┌────────┐  ┌────────┐  ┌────────┐
         │Drone 001│ │Drone 002│ │Drone 500│  × 500
         │ EO/IR  │  │ EO/IR  │  │ EO/IR  │
         │ Radar  │  │ Radar  │  │ Radar  │
         │ Mesh   │  │ Mesh   │  │ Mesh   │
         └────────┘  └────────┘  └────────┘
              │            │            │
              └────────────┼────────────┘
                           │ 60GHz Mesh
                      ┌────┴────┐
                      │ SWARM   │
                      │ O(6N)   │
                      └─────────┘
```

</div>

---

## 🤝 Contributing

**This is a research project. Contributions are welcome — especially from people who know aerospace, control theory, or embedded systems.**

1. **Fork** the Project
2. **Create** your Feature Branch
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit** your Changes
   ```bash
   git commit -m 'feat: add AmazingFeature'
   ```
4. **Push** to the Branch
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open** a Pull Request

**Areas that need help:**
- 🎯 Wave 2 convergence (3× Lancet-3 intercept)
- 🔬 Hardware-in-the-loop testing
- 📡 Real sensor integration
- 🧪 Monte Carlo validation
- 📖 Documentation and diagrams

---

## 📚 References & Inspiration

- **Estimation and Tracking** — Bar-Shalom, Li, Kirubarajan (2001)
- **Swarm Intelligence** — Bonabeau, Dorigo, Theraulaz (1999)
- **Byzantine Fault Tolerance** — Lamport, Shostak, Pease (1982)
- **Unscented Kalman Filter** — Julier, Uhlmann (1997)
- **Elastic Net Formation** — Kaiser, Görner, Schmickl, Crailsheim (2012)

---

## 📊 Stats

<div align="center">

![GitHub Stars](https://img.shields.io/github/stars/Vitalcheffe/Aegis?style=social)
![GitHub Forks](https://img.shields.io/github/forks/Vitalcheffe/Aegis?style=social)
![GitHub Watchers](https://img.shields.io/github/watchers/Vitalcheffe/Aegis?style=social)

[![Star History Chart](https://api.star-history.com/svg?repos=Vitalcheffe/Aegis&type=date)](https://www.star-history.com/#Vitalcheffe/Aegis&type=date)

</div>

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for more information.

Build on it. Improve it. Make the math work.

---

<div align="center">

### Made with ❤️, 🎯, and 🔬 by [Amine Harch el Korane](https://github.com/Vitalcheffe)

_Inverting the air defense cost curve._

<img src="https://raw.githubusercontent.com/Trilokia/Trilokia/refs/heads/main/bottom_header.svg" width="100%"/>

![AEGIS](https://socialify.git.ci/Vitalcheffe/Aegis/image?description=1&font=Raleway&forks=1&issues=1&language=1&name=1&owner=1&pattern=Circuit+Board&pulls=1&stargazers=1&theme=Dark)

</div>
