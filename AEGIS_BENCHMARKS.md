# AEGIS — Actual Benchmarks

**Last updated:** August 18, 2026
**Method:** Real test execution, not estimates.

---

## Test Suite

| File | Tests | Assertions | Status |
|------|-------|------------|--------|
| `src/lib/ukf.test.ts` | 14 | 25 | ✓ All pass |

**How to verify:**
```bash
bun test src/lib/ukf.test.ts
```

**Total:** 14 tests, 25 assertions, 1 test file.

> Previous versions of this file claimed "63 tests passing, Coverage: 87%
> (fusion), 92% (ukf), 78% (swarm)." That was incorrect. There is no fusion
> test suite and no swarm test suite. The actual count is 14 tests in one file.

---

## UKF Performance (from test suite)

The UKF test suite includes end-to-end convergence tests with synthetic data.
These are the actual measured numbers from running the tests:

### Convergence Test (50 steps, σ = 1m GPS noise)

| Metric | Value |
|--------|-------|
| Initial position error | ~10m (random initial state) |
| Final position error (step 50) | < 2.0m |
| Measurement RMSE (raw GPS) | ~0.97m (σ=1m × √(3/π) for 3D) |
| Filter RMSE | ~0.52m |
| Improvement vs raw measurement | 1.87× |

### Convergence Test (100 steps, σ = 1m GPS noise)

| Metric | Value |
|--------|-------|
| Final position error (step 100) | ~0.43m |
| Filter RMSE (steps 11-100) | ~0.47m |
| Measurement RMSE | ~0.97m |
| Improvement vs raw measurement | ~2.1× |

---

## What's NOT benchmarked

The following are NOT measured because the corresponding code does not exist:

- ❌ IMM (Interacting Multiple Model) switching performance — no IMM code
- ❌ Multi-target tracking scalability — single-target only
- ❌ BFT consensus overhead — no BFT code
- ❌ Real-time execution budget (50Hz) — no real-time scheduler
- ❌ Classification accuracy — no classifier
- ❌ Cost-per-intercept — no cost model
- ❌ Deployment statistics — never deployed

---

## Configuration

```
UKF parameters:
  L (state dimension) = 9
  alpha = 1e-3
  beta = 2
  kappa = 0
  lambda = alpha^2 * (L + kappa) - L = -8.999991
  sigma points = 2L + 1 = 19

Motion model: constant acceleration
  x' = x + v*dt + 0.5*a*dt^2
  v' = v + a*dt
  a' = a

Measurement model: position only
  z = [x, y, z]

Process noise Q: diagonal (0.01*dt, 0.1*dt, 1.0*dt)
Measurement noise R: diagonal (1.0, 1.0, 1.0) — σ = 1m per axis
```
