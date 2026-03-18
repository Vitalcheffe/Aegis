# AEGIS — Architecture Notes

## Data Flow (50 Hz tick)

```
tick input  : List[SensorFrame] × N, Dict[drone_id → DroneState]
tick output : List[DroneCommand] × N, List[FusedTarget], SwarmStatus
```

## Key design decisions

**Immutable Vec3**: prevents aliasing bugs in a concurrent system.
All operations return new Vec3 objects.

**Fail-safe ProximityLock**: default state LOCKED.
Unlock requires active proof of safety every tick.

**3-reserve energy model**: reserves are inviolable.
No operation can spend the RTB or chute reserves.

**O(6N) swarm**: each drone talks to 6 neighbours only.
83× faster than full mesh at N=500.
