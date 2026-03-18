# AEGIS — Bill of Materials (Tessera MK.II)

Single unit, series production estimate.  
All prices in USD, Q1 2025, DigiKey/Mouser/direct.

---

## Airframe

| Component | Spec | Supplier | Unit price |
|---|---|---|---|
| T800H/3900-2 CFRP prepreg | 1.2 m × 1.0 m sheet | Toray Composites | $68 |
| PVC foam core (Divinycell H45) | 10 mm, 0.5 m² | DIAB Group | $22 |
| Epoxy resin (Araldite LY1564) | 500 g kit | Huntsman Advanced Materials | $18 |
| Carbon fibre tube (30mm OD) | 600mm × 2 | Easy Composites | $14 |
| M3 titanium fasteners (20× M3×10) | GR5 Ti | Titanium Joe | $9 |
| Landing skids (3D-printed PA12) | 2× | Shapeways | $7 |
| **Airframe subtotal** | | | **$138** |

---

## Propulsion

| Component | Spec | Supplier | Unit price |
|---|---|---|---|
| T-Motor U10 Plus KV100 | 700 W continuous, 2400 W peak | T-Motor | $189 |
| Xoar PJP-P 16×10 CFRP propeller | 6-blade | Xoar | $42 |
| APD 120F ESC | 120A, 6–12S, CAN | Advanced Power Drives | $94 |
| Cesaroni Pro54 6GXL APCP motor | 764.5 N·s, 1.8s burn | Cesaroni Technology | $87 |
| Motor mount (CFRP CNC machined) | Custom | SendCutSend | $23 |
| **Propulsion subtotal** | | | **$435** |

---

## Battery

| Component | Spec | Supplier | Unit price |
|---|---|---|---|
| Tattu Plus 10000mAh 6S 25C | 222 Wh, silicon-anode | Genstattu | $148 |
| XT90-S anti-spark connector | 90A | Amass | $4 |
| Battery strap set | Velcro + latch | Amazon | $3 |
| **Battery subtotal** | | | **$155** |

---

## Sensors

| Component | Spec | Supplier | Unit price |
|---|---|---|---|
| Sony IMX678 CSI module | 4K 60fps, 85° FOV, 0.1 lux | Arducam | $129 |
| FLIR Lepton 3.5 | LWIR 8–14 μm, NETD < 50 mK | FLIR Systems | $249 |
| Inxpect LBK-24 | 24 GHz Doppler, ±50 m/s | Inxpect | $198 |
| Here3+ RTK GPS | RTK capable, 10 Hz | CubePilot | $89 |
| ICM-42688-P IMU | ±16G / ±2000°/s | SparkFun (TDK) | $12 |
| ICM-20649D secondary IMU | Redundant, SPI | Digi-Key | $9 |
| MS5611 barometer | ±1.5 Pa, 120 Hz | TE Connectivity | $8 |
| **Sensors subtotal** | | | **$694** |

---

## Compute & Networking

| Component | Spec | Supplier | Unit price |
|---|---|---|---|
| NVIDIA Jetson Orin NX 8GB | 70 TOPS, 10–25W | NVIDIA/Arrow | $499 |
| Hailo H15 neural accelerator | 40 TOPS @ 3.5W, M.2 | Hailo | $149 |
| Sivers IQ EVK06002 | 60 GHz phased array, 20 dBi, 500 Mbps | Sivers Semiconductors | $312 |
| SiK Radio V3 | 915 MHz fallback, 250 kbps, 5 km | mRo Technology | $38 |
| Custom power distribution PCB | 4-layer, 2 oz Cu, JLCPCB | JLCPCB | $22 |
| XT60 power connectors (×4) | 60A | Amass | $6 |
| Misc cable harness | 16 AWG silicone, connectors | Generic | $18 |
| **Compute/networking subtotal** | | | **$1,044** |

---

## Safety & Recovery

| Component | Spec | Supplier | Unit price |
|---|---|---|---|
| Fruity Chutes Iris Ultra 18" | Compact chute, 3 m/s descent | Fruity Chutes | $49 |
| Ejection canister (3D-printed PC) | Spring-loaded deploy | Custom | $12 |
| Autonomous activation module | ARM Cortex-M0, pyro circuit | Eggtimer Rocketry | $34 |
| **Safety subtotal** | | | **$95** |

---

## Assembly & Overhead

| Item | Unit price |
|---|---|
| PCB assembly labour (est.) | $85 |
| Airframe lay-up + cure | $120 |
| Integration, test, calibration | $95 |
| Quality assurance (10% scrap rate) | $42 |
| **Assembly subtotal** | **$342** |

---

## Total

| Category | Cost |
|---|---|
| Airframe | $138 |
| Propulsion | $435 |
| Battery | $155 |
| Sensors | $694 |
| Compute & networking | $1,044 |
| Safety & recovery | $95 |
| Assembly & overhead | $342 |
| **Total (1 unit)** | **$2,903** |
| **Series price (100+ units)** | **~$4,200** |

> Series price assumes volume discounts of ~30% on components + amortized tooling.  
> PAC-3 MSE reference: **$4,000,000 / round** (FY2023 US Army procurement).  
> Cost advantage: **952×**

---

*Prices current as of Q1 2025. Subject to supplier availability and quantity.*
