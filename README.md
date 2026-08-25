# AEGIS — Autonomous Sensing Framework

[![Tests](https://img.shields.io/badge/tests-passing-22c55e?style=flat-square)](src/lib/)
[![License: MIT](https://img.shields.io/badge/license-MIT-22c55e?style=flat-square)](LICENSE)

> Research framework. Not a product. Not a weapon.

AEGIS is a research framework for the math of multi-agent estimation under uncertainty. It is architecturally incapable of controlling hardware — this is deliberate.

## What's implemented

| Component | File | Tests | Status |
|-----------|------|-------|--------|
| UKF (Merwe-scaled, 9-state) | `src/lib/ukf.ts` | 14 | Real, tested |
| IMM-UKF (4 models: CV, CA, CT, Singer) | `src/lib/imm-ukf.ts` | 7 | Real, tested |
| Motion models (CV, CA, CT, Singer) | `src/lib/models/` | 26 | Real, tested |
| Chi-square outlier gate | `src/lib/chi-square-gate.ts` | 12 | Real, tested |
| Gated UKF (outlier rejection) | `src/lib/gated-ukf.ts` | 7 | Real, tested |
| Measurements (position + bearing + range-rate) | `src/lib/measurements.ts` | 17 | Real, tested |
| Multi-target tracker (GNN, birth/death) | `src/lib/multi-target/` | 9 | Real, tested |
| BFT consensus (PBFT, 10 nodes, 3 byzantine) | `src/lib/bft/` | 9 | Real, tested |
| Spectral fusion (covariance-aware) | `src/lib/fusion/` | 8 | Real, tested |
| Reliability tests (pass^k, perturbation) | `src/lib/audit/` | 8 | Real, tested |

**Total: 117 tests, 0 failures.**

## Performance (measured)

| Metric | Value | Threshold | Status |
|--------|-------|-----------|--------|
| UKF single update | 0.0444 ms | < 1 ms | PASS |
| IMM complete cycle | 0.4292 ms | < 5 ms | PASS |
| 50 targets cycle | 2.0996 ms | < 20 ms | PASS |

## UKF benchmark (RMSE vs noise)

| GPS noise σ (m) | Filter RMSE (m) | Raw RMSE (m) | Improvement |
|-----------------|------------------|---------------|-------------|
| 0.1 | 0.064 | 0.099 | 1.56x |
| 0.5 | 0.284 | 0.502 | 1.76x |
| 1.0 | 0.508 | 1.013 | 2.00x |
| 2.0 | 0.838 | 1.990 | 2.37x |
| 5.0 | 2.154 | 5.020 | 2.33x |

Filter always beats raw measurement. Reproduce: `node src/lib/ukf_benchmark.js`

## IMM vs single-model (turning trajectory)

| Method | RMSE (m) |
|--------|----------|
| IMM (4 models) | 1.147 |
| CA only | 1.341 |

IMM beats CA on turning trajectories. Reproduce: `bun test src/lib/imm-ukf.test.ts`

## Outlier robustness (chi-square gate)

| Scenario | Divergences | Filter RMSE | Raw RMSE |
|----------|-------------|-------------|----------|
| 5% outliers at 20m, 10 runs | 0/10 | 0.943m | 8.449m |
| Clean data (0% outliers) | 0/10 | — | — |

Rejection rate: 8.0% on outlier data, 0.0% on clean data.

## BFT consensus

| Metric | Value |
|--------|-------|
| Nodes | 10 (3 byzantine) |
| Rounds to convergence | 3 |
| Byzantine detected | 3/3 |
| Honest excluded | 0/7 |

## Multi-target tracking

| Metric | Value |
|--------|-------|
| Targets | 50 |
| Steps | 300 |
| Crossing pairs | 10 |
| ID switches | 10 (< 15 threshold) |
| Birth delay | 2 steps |
| Death delay | 8 steps |

## Ethics

AEGIS is a research framework for the math of sensing and consensus. It does not research engagement. It does not research kinetics. The codebase is structured so that adding those capabilities would require a from-scratch rewrite.

## Run

```bash
bun install
bun test src/lib/                    # 117 tests
bun run build                        # tsc → dist/
node src/lib/ukf_benchmark.js        # RMSE sweep
bun run src/lib/perf-benchmark.ts    # Performance benchmarks
```

## Limitations

1. Single motion model in UKF (IMM switches between 4, but UKF alone uses CA)
2. 2D coordinated turn model (3D turn not implemented)
3. Synthetic validation only (no real sensor data)
4. Diagonal measurement noise (real sensors have cross-correlations)
5. No IMM convergence guarantee (probabilities are normalized, but no Lyapunov proof)

## License

MIT
