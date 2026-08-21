# Disclosure — What's Real and What's Design Fiction

**Last updated:** August 18, 2026

This document exists because the Aegis repo contains both real, tested code
and a large marketing/website layer that describes capabilities that do not
exist in the codebase. An interviewer, admissions officer, or collaborator
who opens this repo deserves to know which is which immediately.

---

## Real — implemented, tested, runnable

### Unscented Kalman Filter (`src/lib/ukf.ts`)

- **What:** 9-state constant-acceleration UKF with Merwe-scaled sigma points
- **Math:** α=1e-3, κ=0, β=2, λ=α²(L+κ)-L, 2L+1=19 sigma points via Cholesky
- **Predict:** propagate sigma points through CA model, weighted mean + covariance + Q
- **Update:** innovation covariance S, cross-covariance Pxz, Kalman gain K, state + covariance update
- **Tests:** 14 tests in `ukf.test.ts` — sigma point count, weight sum, symmetry, convergence, RMSE-beats-measurement
- **How to run:** `bun test src/lib/ukf.test.ts`

### Supporting infrastructure

- `src/lib/db.ts` — Prisma client (works)
- `src/lib/form-store.ts` — in-memory contact form (works)
- `src/lib/utils.ts` — Tailwind `cn()` helper (works)
- `ethics.html` — ethics statement (genuine, the most important page in the repo)
- `AEGIS_UKF_MATH.md` — mathematical specification (matches `ukf.ts` formula-for-formula)

---

## Design fiction — NOT implemented, NOT tested, NOT real

Everything below appears in the marketing pages (`src/app/**`) but has **zero
corresponding implementation** in `src/lib/`. These are aspirational design
concepts for how a future research framework *could* be presented, not claims
about what the codebase currently does.

### "IMM-UKF" (Interacting Multiple Model)
- **Claimed in:** `src/app/technology/sensor-fusion/page.tsx`, `src/app/capabilities/tracking/page.tsx`, `src/app/resources/glossary/page.tsx`, `src/app/resources/faq/page.tsx`, `src/app/resources/white-papers/page.tsx`
- **Reality:** The code implements ONE model (constant-acceleration). There is no model switching, no IMM framework, no coordinated-turn model, no hover model. The claim of "4 simultaneous motion models" is false.

### "BFT sensor fusion (3-node fault tolerance)"
- **Claimed in:** `README.md` (badge), marketing pages
- **Reality:** `grep -rli "byzantine|bft|consensus" src/lib/` returns zero matches. No Byzantine fault tolerance code exists.

### "Spectral multi-modal fusion"
- **Claimed in:** `README.md`, marketing pages
- **Reality:** No spectral fusion code exists in `src/lib/`.

### "50Hz hard real-time"
- **Claimed in:** `README.md`, marketing pages
- **Reality:** No real-time scheduler, no tick budget, no hardware interface. The UKF runs in a test loop.

### "50 simultaneous targets"
- **Claimed in:** `README.md`, marketing pages
- **Reality:** The UKF tracks a single target. No multi-target tracking, no track management, no track association.

### "99.7% classification accuracy"
- **Claimed in:** `src/app/technology/rf-sensing/page.tsx`, `src/app/solutions/page.tsx`, `src/app/page.tsx`
- **Reality:** No classifier exists. No training data, no model, no evaluation. The number is fabricated.

### "98.9% classification accuracy (multi-modal fusion)"
- **Claimed in:** `src/app/resources/white-papers/page.tsx`, `src/app/resources/faq/page.tsx`
- **Reality:** Same as above. No classifier, no evaluation, fabricated number.

### "Over 15,000 operational claims"
- **Claimed in:** `src/app/technology/electronic-warfare/page.tsx`
- **Reality:** Aegis has never been deployed. `ethics.html` explicitly states the codebase is "architecturally incapable of controlling hardware."

### "fabricated directed-energy systems"
- **Claimed in:** `src/app/news/press-releases/page.tsx`, `src/app/integrations/page.tsx`
- **Reality:** `ethics.html` explicitly states: "Kinetic effectors of any kind. No code controls physical actuators, no code computes claim geometry, no code triggers any physical action." The munitions claims directly contradict the ethics page.

### "GPS manipulation" as a neutralization method
- **Claimed in:** `src/app/case-studies/` (multiple), `src/app/news/press-releases/page.tsx`
- **Reality:** No GPS manipulation code exists. The ethics page says the codebase does not control hardware.

### "12-million-signature library" and "siamese neural network"
- **Claimed in:** `src/app/technology/rf-sensing/page.tsx`
- **Reality:** No signature library exists. No neural network code exists in `src/lib/`.

### "63 tests passing, Coverage: 87% (fusion), 92% (ukf), 78% (swarm)"
- **Claimed in:** `AEGIS_BENCHMARKS.md`
- **Reality:** The repo has **14 tests in one file** (`ukf.test.ts`). There is no fusion test suite, no swarm test suite. The coverage numbers are fabricated.

### Fabricated benchmark tables (cost comparison, interception speed, scalability)
- **Claimed in:** `AEGIS_BENCHMARKS.md`
- **Reality:** No benchmark script exists. No cost model, no interception timing, no scalability test. All numbers are invented.

### Case studies (10 files in `src/app/case-studies/`)
- **Claimed in:** 10 case study pages with specific claim counts, neutralization rates, and deployment details
- **Reality:** These are fictional scenarios. No deployments have occurred. The specific numbers (47 drone incursions, 22-drone swarm, 156 hostile claims, 99.4% neutralization rate) are invented.

---

## Why the marketing layer exists

The `worklog.md` reveals that the marketing site was built by an AI agent as a
"Palantir-style B&W Counter-UAS site" — a design study replicating the visual
style of Palantir.com. The UKF (`ukf.ts`) was added separately and is genuine.

The marketing layer was NOT built to deceive. It was built as a design exercise
to explore how a defense-tech research framework could be presented. But it was
NOT clearly labeled as fiction until this disclosure document was added.

**If you are reviewing this repo for an admissions decision, a job interview,
or a collaboration:** read `src/lib/ukf.ts` and `src/lib/ukf.test.ts`. That is
the work. Everything else is presentation.
