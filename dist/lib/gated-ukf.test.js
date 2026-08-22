"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gated_ukf_1 = require("./gated-ukf");
const ukf_1 = require("./ukf");
describe('Gated UKF — Outlier Robustness (A16)', () => {
    const dt = 0.1;
    const Q = (0, ukf_1.defaultProcessNoise)(dt);
    const R = (0, ukf_1.defaultMeasurementNoise)();
    const sigma = 1.0;
    // Deterministic PRNG for reproducibility
    function makePRNG(seed) {
        let s = seed;
        return () => {
            s = (s * 1103515245 + 12345) & 0x7fffffff;
            return s / 0x7fffffff;
        };
    }
    function generateTrajectory(steps, outlierRate, rng) {
        const measurements = [];
        let trueState = [0, 0, 0, 1, 0, 0, 0, 0, 0];
        for (let s = 0; s < steps; s++) {
            const t = s * dt;
            trueState[0] = 8 * Math.sin(0.4 * t);
            trueState[1] = 4 + 2 * Math.cos(0.4 * t);
            trueState[2] = 8 * Math.sin(0.8 * t);
            let z = [
                trueState[0] + (rng() - 0.5) * 2 * sigma,
                trueState[1] + (rng() - 0.5) * 2 * sigma,
                trueState[2] + (rng() - 0.5) * 2 * sigma,
            ];
            // Inject outlier (20m offset)
            if (rng() < outlierRate) {
                z = [z[0] + 20, z[1] - 15, z[2] + 25];
            }
            measurements.push(z);
        }
        return measurements;
    }
    function computeTruePosition(step) {
        const t = step * dt;
        return [
            8 * Math.sin(0.4 * t),
            4 + 2 * Math.cos(0.4 * t),
            8 * Math.sin(0.8 * t),
        ];
    }
    test('5% outliers at 20m, 200 steps, 10 runs → 0 divergence', () => {
        const steps = 200;
        const outlierRate = 0.05;
        const runs = 10;
        let totalDiverged = 0;
        let totalRMSE_filter = 0;
        let totalRMSE_raw = 0;
        let totalRejected = 0;
        let totalAccepted = 0;
        for (let run = 0; run < runs; run++) {
            const rng = makePRNG(42 + run);
            const measurements = generateTrajectory(steps, outlierRate, rng);
            // Run gated UKF
            let state = (0, ukf_1.initialState)();
            const filterErrors = [];
            const measErrors = [];
            for (let s = 0; s < steps; s++) {
                const result = (0, gated_ukf_1.gatedUKFStep)(state, measurements[s], dt, Q, R);
                state = result.state;
                const truePos = computeTruePosition(s);
                if (s >= 50) { // warmup
                    const fErr = Math.sqrt((state.x[0] - truePos[0]) ** 2 +
                        (state.x[1] - truePos[1]) ** 2 +
                        (state.x[2] - truePos[2]) ** 2);
                    filterErrors.push(fErr);
                    const mErr = Math.sqrt((measurements[s][0] - truePos[0]) ** 2 +
                        (measurements[s][1] - truePos[1]) ** 2 +
                        (measurements[s][2] - truePos[2]) ** 2);
                    measErrors.push(mErr);
                }
                if (result.accepted)
                    totalAccepted++;
                else
                    totalRejected++;
            }
            const filterRMSE = Math.sqrt(filterErrors.reduce((s, e) => s + e * e, 0) / filterErrors.length);
            const measRMSE = Math.sqrt(measErrors.reduce((s, e) => s + e * e, 0) / measErrors.length);
            totalRMSE_filter += filterRMSE;
            totalRMSE_raw += measRMSE;
            // Divergence = max error > 10m
            const maxError = Math.max(...filterErrors);
            if (maxError > 10.0)
                totalDiverged++;
        }
        const avgFilterRMSE = totalRMSE_filter / runs;
        const avgMeasRMSE = totalRMSE_raw / runs;
        console.log(`A16 Results (10 runs, 200 steps, 5% outliers at 20m):`);
        console.log(`  Diverged: ${totalDiverged}/10`);
        console.log(`  Avg filter RMSE: ${avgFilterRMSE.toFixed(3)}m`);
        console.log(`  Avg raw meas RMSE: ${avgMeasRMSE.toFixed(3)}m`);
        console.log(`  Accepted: ${totalAccepted}, Rejected: ${totalRejected}`);
        console.log(`  Filter beats raw: ${avgFilterRMSE < avgMeasRMSE}`);
        // Gate: 0 divergence, filter RMSE < raw RMSE
        expect(totalDiverged).toBe(0);
        expect(avgFilterRMSE).toBeLessThan(avgMeasRMSE);
    });
    test('gate rejects measurements with NIS > threshold', () => {
        const state = (0, ukf_1.initialState)();
        // Normal measurement
        const z1 = [0.1, 0.1, 0.1];
        const result1 = (0, gated_ukf_1.gatedUKFStep)(state, z1, dt, Q, R);
        expect(result1.accepted).toBe(true);
        // Outlier measurement (20m away)
        const z2 = [20, -15, 25];
        // Need to use the state after step 1
        const result2 = (0, gated_ukf_1.gatedUKFStep)(result1.state, z2, dt, Q, R);
        expect(result2.accepted).toBe(false);
        expect(result2.nis).toBeGreaterThan(result2.threshold);
    });
    test('after rejection, filter continues with good measurements', () => {
        let state = (0, ukf_1.initialState)();
        // Step 1: normal
        state = (0, gated_ukf_1.gatedUKFStep)(state, [0.1, 4.1, 0.1], dt, Q, R).state;
        // Step 2: outlier (should be rejected)
        const result2 = (0, gated_ukf_1.gatedUKFStep)(state, [50, 50, 50], dt, Q, R);
        expect(result2.accepted).toBe(false);
        state = result2.state;
        // Step 3: normal again (should be accepted)
        const result3 = (0, gated_ukf_1.gatedUKFStep)(state, [0.2, 4.0, 0.2], dt, Q, R);
        expect(result3.accepted).toBe(true);
        expect(result3.state.x.every(v => Number.isFinite(v))).toBe(true);
    });
    test('no outliers → 0 rejections', () => {
        const rng = makePRNG(100);
        const measurements = generateTrajectory(100, 0.0, rng); // 0% outliers
        const result = (0, gated_ukf_1.runGatedUKF)((0, ukf_1.initialState)(), measurements, dt, Q, R);
        expect(result.rejected).toBe(0);
        expect(result.accepted).toBe(100);
    });
    test('100% outliers → filter predicts only, stays finite', () => {
        const rng = makePRNG(200);
        const measurements = generateTrajectory(100, 1.0, rng); // 100% outliers
        const result = (0, gated_ukf_1.runGatedUKF)((0, ukf_1.initialState)(), measurements, dt, Q, R);
        // All should be rejected
        expect(result.rejected).toBeGreaterThan(50); // most rejected
        // State should still be finite (predict-only)
        expect(result.finalState.x.every(v => Number.isFinite(v))).toBe(true);
    });
});
describe('Gated UKF — Rejection Rate Invariant', () => {
    const dt = 0.1;
    const Q = (0, ukf_1.defaultProcessNoise)(dt);
    const R = (0, ukf_1.defaultMeasurementNoise)();
    const sigma = 1.0;
    function makePRNG(seed) {
        let s = seed;
        return () => { s = (s * 1103515245 + 12345) & 0x7fffffff; return s / 0x7fffffff; };
    }
    test('5% outliers: rejection rate is 5% ± 2% (not over-rejecting)', () => {
        const rng = makePRNG(42);
        const steps = 200;
        let state = (0, ukf_1.initialState)();
        let rejected = 0;
        for (let s = 0; s < steps; s++) {
            const t = s * dt;
            const trueX = 8 * Math.sin(0.4 * t);
            const trueY = 4 + 2 * Math.cos(0.4 * t);
            const trueZ = 8 * Math.sin(0.8 * t);
            let z = [
                trueX + (rng() - 0.5) * 2 * sigma,
                trueY + (rng() - 0.5) * 2 * sigma,
                trueZ + (rng() - 0.5) * 2 * sigma,
            ];
            if (rng() < 0.05) {
                z = [z[0] + 20, z[1] - 15, z[2] + 25];
            }
            const result = (0, gated_ukf_1.gatedUKFStep)(state, z, dt, Q, R);
            state = result.state;
            if (!result.accepted)
                rejected++;
        }
        const rejectionRate = rejected / steps;
        console.log(`  Outlier rejection rate: ${(rejectionRate * 100).toFixed(1)}% (expected 5% ± 2%)`);
        console.log(`  Rejected: ${rejected}/${steps}`);
        // Gate: rejection rate should be 3-8% (outliers rejected, good data accepted)
        expect(rejectionRate).toBeGreaterThan(0.03);
        expect(rejectionRate).toBeLessThanOrEqual(0.08);
    });
    test('0% outliers (clean data): rejection rate < 2%', () => {
        const rng = makePRNG(100);
        const steps = 200;
        let state = (0, ukf_1.initialState)();
        let rejected = 0;
        for (let s = 0; s < steps; s++) {
            const t = s * dt;
            const trueX = 8 * Math.sin(0.4 * t);
            const trueY = 4 + 2 * Math.cos(0.4 * t);
            const trueZ = 8 * Math.sin(0.8 * t);
            const z = [
                trueX + (rng() - 0.5) * 2 * sigma,
                trueY + (rng() - 0.5) * 2 * sigma,
                trueZ + (rng() - 0.5) * 2 * sigma,
            ];
            const result = (0, gated_ukf_1.gatedUKFStep)(state, z, dt, Q, R);
            state = result.state;
            if (!result.accepted)
                rejected++;
        }
        const rejectionRate = rejected / steps;
        console.log(`  Clean data rejection rate: ${(rejectionRate * 100).toFixed(1)}% (expected < 2%)`);
        console.log(`  Rejected: ${rejected}/${steps}`);
        // Gate: < 2% rejection on clean data (filter isn't over-gating)
        expect(rejectionRate).toBeLessThan(0.02);
    });
});
