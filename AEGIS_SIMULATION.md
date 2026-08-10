# Simulation Guide

## Running AEGIS Simulations

### Prerequisites

- Python 3.11+
- Node.js 18+ (for web viz)
- Docker (optional for containerized run)

### Installation

```bash
# Clone repository
git clone https://github.com/Vitalcheffe/Aegis.git
cd Aegis

# Install Python dependencies
pip install -r requirements.txt

# Install visualization (optional)
npm install
```

### Quick Start - Single Drone

```bash
# Run basic intercept simulation
python sim/single_intercept.py \
    --target shahed-136 \
    --drones 50 \
    --duration 30s
```

### Configuration

#### Simulation Parameters

```yaml
# config/sim.yaml
swarm:
  count: 500
  altitude: 300  # meters
  spacing: 200  # meters between drones
  
target:
  type: shahed-136  # or lancet-3, mixed
  speed: 80  # m/s
  altitude: 200  # m
  trajectory: straight  # or evasive
  
timing:
  tick_rate: 50  # Hz
  safety_timeout: 5  # seconds
```

### Test Scenarios

#### Wave 1 - Shahed-136 Interception
```bash
python sim/run_wave.py --wave 1
# Expected: Intercept in 7 ticks (54ms wall time)
```

#### Wave 2 - Lancet-3 Evasive
```bash
python sim/run_wave.py --wave 2
# Tests UKF maneuvering target prediction
```

#### Wave 3 - Mixed with Decoys
```bash
python sim/run_wave.py --wave 3
# BFT fusion tested against flares
```

### Performance Benchmarks

| Drones | Tick Time | p99 Latency | Status |
|--------|-----------|-------------|--------|
| 50 | 6ms | 14.35ms | ✅ Below 20ms budget |
| 100 | 12ms | 18ms | ✅ |
| 500 | 60ms | 75ms | ⚠️ Scaling tested |

### Visualization

```bash
# Start CesiumJS globe
npm run viz:cesium

# View swarm in browser
open http://localhost:3000/viz
```

### Custom Scenarios

```python
from aegis.sim.scenario import Scenario

# Define custom target
scenario = Scenario(
    target=Target(
        type="custom",
        waypoints=[(0,0,200), (1000,500,150), (2000,0,100)]
    ),
    swarm_size=100,
    weather="clear"
)

results = scenario.run()
print(f"Interception time: {results.intercept_time}s")
```

### Output Formats

- Terminal logs with timing
- JSON trajectory export
- CSV performance metrics
- CesiumJS visualization data