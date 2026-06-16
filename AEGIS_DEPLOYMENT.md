# Deployment Guide

## AEGIS Production Deployment

### Prerequisites

- Ubuntu 22.04 LTS or later
- Docker 24.x
- Python 3.11
- Node.js 18.x
- PostgreSQL 15 (for telemetry logs)
- Redis 7.x (for real-time messaging)

### Containerized Deployment

```bash
# Build images
docker build -t aegis/core:latest .
docker build -t aegis/web:latest -f Dockerfile.web .

# Start with docker-compose
docker-compose up -d

# Verify services
docker ps
# aegis-core    - Main control engine
# aegis-web     - Visualization dashboard
# aegis-db      - PostgreSQL for logs
# aegis-cache   - Redis for pub/sub
```

### Hardware Deployment Checklist

#### Single Ground Station
- [ ] Intel N100 or better (8 cores minimum)
- [ ] 16GB RAM
- [ ] RTK GPS base station
- [ ] WiFi 6 router (for drone links)
- [ ] UPS backup power (30 min minimum)
- [ ] RF shielding for GPS antenna

#### Swarm Deployment
- [ ] 5.8GHz telemetry radios (RFD900x)
- [ ] 4G/5G backup link
- [ ] Antenna diversity on ground station
- [ ] Redundant power supplies

### CI/CD Pipeline

```yaml
# .github/workflows/deploy.yml
name: Deploy AEGIS
on:
  push:
    branches: [main]
    
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - pytest tests/
      - pytest tests/perf/
      
  build:
    needs: test
    steps:
      - docker build .
      - docker push registry.aegis.local/core
      
  deploy:
    needs: build
    environment: production
    steps:
      - ssh deploy@aegis.local 'docker-compose pull'
      - ssh deploy@aegis.local 'docker-compose up -d'
```

### Environment Variables

```bash
# .env
AEGIS_SWARM_ID=aegis-001
AEGIS_MAX_DRONES=500
AEGIS_TICK_RATE=50
AEGIS_SAFETY_TIMEOUT=5
DATABASE_URL=postgresql://aegis:pass@db:5432/aegis
REDIS_URL=redis://cache:6379
SECRET_KEY=<32-byte-random>
```

### Field Testing Procedure

#### Pre-Flight
1. Sensor calibration completed
2. GPS lock acquired (≥12 satellites)
3. Radio link test successful
4. Energy reserves ≥ 90%
5. Safety lock verified active

#### Test Flight Sequence
1. Hover test at 10m altitude
2. Formation grid deployment
3. Patrol pattern execution
4. Simulated target intercept
5. Return to base sequence

#### Post-Flight
1. Log download and analysis
2. Battery cycle check
3. Sensor drift assessment
4. Performance metrics review

### Safety Verification

Before every deployment:

```bash
# Run safety tests
python tests/safety/verify_all.py

# Check output:
# [✓] ProximityLock active
# [✓] HumanLoopGate configured
# [✓] ADS-B detector online
# [✓] Energy reserves sufficient
# [✓] Watchdog timers armed
```

### Monitoring & Alerting

#### Prometheus Metrics
```
aegis_tick_rate_hz
aegis_intercept_success_ratio
aegis_battery_remaining_wh
aegis_sensor_fusion_confidence
aegis_active_threats_count
```

#### Alert Rules
```yaml
- alert: LowBattery
  expr: aegis_battery_remaining_wh < 15
  severity: critical
  
- alert: TickRateDrop
  expr: aegis_tick_rate_hz < 45
  severity: warning
```

### Backup & Recovery

#### State Backup
```bash
# Hourly swarm state snapshots
pg_dump aegis_telemetry > backup_$(date +%Y%m%d).sql
```

#### Disaster Recovery
1. Ground station failure → Failover to mobile node
2. Database corruption → Restore from last snapshot
3. Mission abort → Emergency land all drones

### Troubleshooting

| Symptom | Check | Resolution |
|---------|-------|------------|
| Tick rate drop | `top` for CPU | Kill background processes |
| False positives | MAD threshold | Increase from 0.9 to 0.95 |
| Missed intercepts | UKF tuning | Decrease process noise Q |
| Battery drain | Energy log | Check combat reserve allocation |