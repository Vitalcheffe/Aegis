# AEGIS — Research Framework for Multi-Agent Estimation

> **Research framework. Not a product. Not a munition system.**

[![License: MIT](https://img.shields.io/badge/license-MIT-22c55e?style=flat-square)](LICENSE)
[![Tests](https://img.shields.io/badge/tests-14%20passing-22c55e?style=flat-square)](src/lib/ukf.test.ts)

## What this is

AEGIS is a research framework for the math of multi-agent estimation under
uncertainty. It is **not** a deployable munition system. The codebase is
architecturally incapable of controlling hardware — this is deliberate.

The implemented algorithmic artifact is a **9-state Unscented Kalman Filter**
(`src/lib/ukf.ts`, 508 lines) with 14 passing tests. The UKF uses Merwe-scaled
sigma points (α=1e-3, κ=0, β=2), generates 19 sigma points via Cholesky
decomposition, and implements a full predict-update cycle with a constant-
acceleration motion model and position-only measurements.

Everything else in this repo (298 .tsx files) is a **design study** — a
marketing/documentation website exploring how a research framework like this
*could* be presented. The marketing pages describe capabilities (IMM-UKF,
BFT consensus, spectral fusion, multi-target tracking) that are **not
implemented in code**. They are aspirational design, not shipped features.
See [DISCLOSURE.md](DISCLOSURE.md) for the full list of what's real and
what's design fiction.

## What's actually implemented

| Component | File | Lines | Tests | Status |
|-----------|------|-------|-------|--------|
| UKF (Merwe-scaled, 9-state) | `src/lib/ukf.ts` | 508 | 14 | ✓ Real, tested |
| UKF test suite | `src/lib/ukf.test.ts` | 224 | 14 pass | ✓ Verified |
| DB client (Prisma) | `src/lib/db.ts` | ~10 | — | ✓ Works |
| Contact form store | `src/lib/form-store.ts` | ~60 | — | ✓ Works |
| Tailwind `cn()` helper | `src/lib/utils.ts` | ~5 | — | ✓ Works |

**Total real code:** ~800 lines across 5 files. **Total tests:** 14.

## What's NOT implemented (despite marketing claims)

- ❌ IMM-UKF (Interacting Multiple Model) — code has one model (constant-acceleration), not four
- ❌ BFT sensor fusion (Byzantine Fault Tolerance) — zero BFT/consensus code in `src/lib/`
- ❌ Spectral fusion — no implementation
- ❌ 50Hz hard real-time scheduler — no real-time code
- ❌ 50 simultaneous targets — UKF handles one target
- ❌ 99.7% classification accuracy — no classifier exists
- ❌ 15,000 operational claims — never deployed
- ❌ fabricated offensive systems — see `ethics.html`
- ❌ "63 tests passing, Coverage 87%/92%/78%" — actual: 14 tests, one file

## The ethics boundary

`ethics.html` states: *"AEGIS is a research framework for the math of
multi-agent estimation under uncertainty. It is not, and will never be,
a deployable munition system. The codebase is architecturally incapable of
controlling hardware — this is deliberate."*

The marketing pages describe fabricated offensive capabilities that
the ethics page explicitly says don't exist. **The ethics page is the
truth. The marketing pages are design fiction.**

## Run the UKF

```bash
cd Aegis
bun install
bun test src/lib/ukf.test.ts
```

Expected output: 14 tests pass, including:
- Sigma point count = 2L+1 = 19
- Weight sum = 1.0
- Filter converges (final error < 2m after 50 steps with σ=1m GPS noise)
- Filter RMSE < raw measurement RMSE

## Limitations (honest)

1. **Single motion model.** The UKF uses constant-acceleration only. No IMM
   switching between constant-velocity, coordinated-turn, etc.
2. **Single target.** The filter tracks one target. No multi-target tracking,
   no track association, no track management.
3. **Position-only measurements.** The measurement function is `h(x) = [x, y, z]`.
   No bearing-only, no range-rate, no passive RF.
4. **Synthetic validation.** Tests use synthetic data (known ground truth + Gaussian
   noise). No real sensor data, no real-world validation.
5. **Diagonal process noise.** Q is diagonal. A true continuous-time white-noise-jerk
   model has off-diagonal terms.
6. **No benchmark suite.** There is no RMSE-vs-noise sweep, no performance characterization
   across scenarios. The filter is proven correct but not benchmarked.
7. **Marketing site is AI-generated.** The 298-page Next.js site was built by an AI agent
   as a "Palantir-style B&W Counter-UAS site." The UKF was added separately and is genuine.

## License

MIT — see [LICENSE](LICENSE).
