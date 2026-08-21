# AEGIS — Actual Benchmarks

**Last updated:** August 18, 2026
**Method:** Real test execution, not estimates.

---

## Test Suite

| File | Tests | Assertions | Status |
|------|-------|------------|--------|
| `src/lib/ukf.test.ts` | 14 | 219 | ✓ All pass |
| `src/lib/models/motion-models.test.ts` | 16 | 39 | ✓ All pass |
| `src/lib/audit/reliability-tests.test.ts` | 8 | 14 | ✓ All pass |

**How to verify:**
```bash
bun test src/lib/ukf.test.ts src/lib/models/motion-models.test.ts src/lib/audit/reliability-tests.test.ts
```

**Total:** 38 tests, 272 assertions, 3 test files.

---

## UKF Performance (from benchmark)

### RMSE vs Measurement Noise (5 levels, 500 steps each)

| GPS Noise σ (m) | Filter RMSE (m) | Measurement RMSE (m) | Improvement |
|-----------------|------------------|-----------------------|-------------|
| 0.1 | 0.064 | 0.099 | 1.56× |
| 0.5 | 0.284 | 0.502 | 1.76× |
| 1.0 | 0.508 | 1.013 | 2.00× |
| 2.0 | 0.838 | 1.990 | 2.37× |
| 5.0 | 2.154 | 5.020 | 2.33× |

**Reproduce:** `node src/lib/ukf_benchmark.js`

### Reliability Metrics (from audit/reliability-tests.ts)

| Test | Result | Meaning |
|------|--------|---------|
| Pass^k (k=10) | 1.0000 | Perfectly deterministic — same input always produces same output |
| Outlier (5% at 20m) | Diverged | No outlier rejection — honest limitation |
| Perturbation (10%) | 1.00× degradation | Stable under small measurement bias |

**Reproduce:** `node src/lib/audit/reliability-tests.ts`

---

## Motion Models

| Model | State Dim | Use Case | Status |
|-------|-----------|----------|--------|
| CV (Constant Velocity) | 6 | Straight-line targets | ✓ Implemented + tested |
| CA (Constant Acceleration) | 9 | Accelerating targets | ✓ Implemented + tested (default in ukf.ts) |
| CT (Coordinated Turn) | 7 | Turning targets (2D) | ✓ Implemented + tested |

**Note:** These are individual models. An IMM-UKF that switches between them is NOT yet implemented. The IMM is the next planned feature.

---

## What's NOT benchmarked (honest)

- ❌ IMM switching performance — no IMM code yet
- ❌ Multi-target tracking scalability — single-target only
- ❌ BFT consensus overhead — no BFT code
- ❌ Real-time execution budget (50Hz) — no real-time scheduler
- ❌ Classification accuracy — no classifier
- ❌ Cost-per-intercept — no cost model
- ❌ Deployment statistics — never deployed
