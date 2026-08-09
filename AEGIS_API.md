# AEGIS API - OpenAPI Specification

## Control Plane API v1

### Authentication
```http
Authorization: Bearer <JWT_TOKEN>
X-Signature: <HMAC_SIGNATURE>
```

All endpoints require:
- JWT auth with role-based access
- HMAC signature on request body
- Rate limit: 100 req/s per swarm

### Endpoints

#### GET /api/v1/swarm/state

Returns current state of all drones in swarm.

```json
{
  "swarm_id": "aegis-001",
  "timestamp": "2026-06-15T19:30:00Z",
  "drones": [
    {
      "id": "drone-001",
      "position": {"x": 1250.5, "y": 340.2, "z": 300.0},
      "velocity": {"x": 15.2, "y": -3.1, "z": 0.0},
      "energy": {"total_wh": 55.2, "reserves": {"chute": 10, "rtb": 40, "combat": 5}},
      "status": "patrol"
    }
  ],
  "active_targets": [
    {
      "id": "tgt-abc123",
      "classification": "shahed-136",
      "position": {"x": 2500, "y": 1200, "z": 200},
      "confidence": 0.95,
      "assigned_drone": "drone-042"
    }
  ]
}
```

#### POST /api/v1/simulation/start

Start a new simulation scenario.

```json
{
  "scenario": "shahed-intercept",
  "drones": 50,
  "duration": 60,
  "seed": 42
}
```

Response:
```json
{
  "simulation_id": "sim-20260615-abc",
  "status": "running",
  "start_time": "2026-06-15T19:30:00Z"
}
```

#### GET /api/v1/target/{id}/track

Get UKF tracking data for a target.

```json
{
  "target_id": "tgt-abc123",
  "state_history": [
    {
      "timestamp": "2026-06-15T19:30:00.00Z",
      "state": {"x": 2500, "y": 1200, "z": 200},
      "covariance": [[100, 0, 0], [0, 100, 0], [0, 0, 50]]
    }
  ],
  "predicted_impact": "2026-06-15T19:30:03.20Z",
  "intercept_vectors": [
    {"drone_id": "drone-042", "impact_time": 3.2, "success_prob": 0.92}
  ]
}
```

#### GET /api/v1/fusion/confidence

Get sensor fusion confidence scores.

```json
{
  "target_id": "tgt-abc123",
  "sources": [
    {"sensor": "eo-camera", "confidence": 0.88, "value": "aircraft"},
    {"sensor": "ir-camera", "confidence": 0.92, "value": "shahed"},
    {"sensor": "radar", "confidence": 0.85, "value": "drone"}
  ],
  "fused_confidence": 0.92,
  "quorum_reached": true
}
```

#### POST /api/v1/safety/lock

Set weapon safety lock status.

```json
{
  "drone_id": "drone-042",
  "locked": true,
  "reason": "manual_override",
  "operator": "amine"
}
```

#### POST /api/v1/command/engage

Authorize target engagement.

```json
{
  "target_id": "tgt-abc123",
  "drone_id": "drone-042",
  "operator": "amine",
  "auth_code": "sha256_hash"
}
```

### WebSocket Endpoints

#### wss://api.aegis.local/ws/metrics

Real-time performance metrics stream.

```json
{
  "tick_rate": 50,
  "avg_tick_ms": 6.2,
  "cpu_percent": 45,
  "active_drones": 50,
  "memory_mb": 128
}
```

#### wss://api.aegis.local/ws/alerts

Critical alerts stream.

```json
{
  "alert": "battery_critical",
  "drone_id": "drone-042",
  "energy_wh": 12.5,
  "action": "return_to_base"
}
```

### Error Codes

| Code | Description |
|------|-------------|
| 4001 | Safety lock violated |
| 4002 | Insufficient energy reserves |
| 4003 | No human authorization |
| 4004 | Sensor fusion failed |
| 4005 | Target lost |