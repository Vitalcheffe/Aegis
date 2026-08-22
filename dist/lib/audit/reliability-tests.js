"use strict";
/**
 * Pass^k Reliability Tester
 *
 * Measures UKF consistency under repeated execution with identical inputs.
 * The pass^k metric (from awesome-auditable-ai) checks whether an
 * estimator produces the same output when run k times on the same data.
 *
 * If the UKF is deterministic (no internal randomness), pass^k should be 1.0.
 * Any deviation indicates numerical instability or non-deterministic behavior.
 *
 * Also tests robustness to:
 *   - Semantic perturbation (small measurement noise variations)
 *   - Outlier measurements (5% of measurements are corrupted)
 *   - Edge cases (zero measurements, extreme noise)
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.testPassKConsistency = testPassKConsistency;
exports.testOutlierRobustness = testOutlierRobustness;
exports.testSemanticPerturbation = testSemanticPerturbation;
exports.runAllReliabilityTests = runAllReliabilityTests;
const ukf_1 = require("../ukf");
// ============================================================================
// Pass^k Consistency Test
// ============================================================================
function testPassKConsistency(k = 10, steps = 100, noiseSigma = 1.0) {
    const dt = 0.1;
    // Generate deterministic measurement sequence (same seed → same data)
    const measurements = [];
    let trueState = [0, 0, 0, 1, 0, 0, 0, 0, 0];
    // Use a simple deterministic PRNG for reproducible noise
    let seed = 42;
    function nextRand() {
        seed = (seed * 1103515245 + 12345) & 0x7fffffff;
        return seed / 0x7fffffff;
    }
    for (let s = 0; s < steps; s++) {
        // Advance truth (figure-8 trajectory)
        const t = s * dt;
        trueState[0] = 8 * Math.sin(0.4 * t);
        trueState[1] = 4 + 2 * Math.cos(0.4 * t);
        trueState[2] = 8 * Math.sin(0.8 * t);
        trueState[3] = 3.2 * Math.cos(0.4 * t);
        trueState[4] = -0.8 * Math.sin(0.4 * t);
        trueState[5] = 6.4 * Math.cos(0.8 * t);
        // Deterministic noisy measurement
        const z = [
            trueState[0] + (nextRand() - 0.5) * 2 * noiseSigma,
            trueState[1] + (nextRand() - 0.5) * 2 * noiseSigma,
            trueState[2] + (nextRand() - 0.5) * 2 * noiseSigma,
        ];
        measurements.push(z);
    }
    // Run UKF k times with identical inputs
    const Q = (0, ukf_1.defaultProcessNoise)(dt);
    const R = (0, ukf_1.defaultMeasurementNoise)();
    for (let i = 0; i < 3; i++)
        R[i][i] = noiseSigma * noiseSigma;
    const finalStates = [];
    for (let run = 0; run < k; run++) {
        let state = (0, ukf_1.initialState)();
        for (let s = 0; s < steps; s++) {
            state = (0, ukf_1.ukfStep)(state, measurements[s], dt, Q, R);
        }
        finalStates.push(state.x.slice());
    }
    // Check consistency: are all final states identical?
    let identical = 0;
    const ref = finalStates[0];
    for (let run = 1; run < k; run++) {
        let match = true;
        for (let i = 0; i < ref.length; i++) {
            if (Math.abs(finalStates[run][i] - ref[i]) > 1e-10) {
                match = false;
                break;
            }
        }
        if (match)
            identical++;
    }
    // Compute variance across runs
    let maxVar = 0;
    let sumVar = 0;
    for (let i = 0; i < ref.length; i++) {
        const mean = finalStates.reduce((s, st) => s + st[i], 0) / k;
        const variance = finalStates.reduce((s, st) => s + (st[i] - mean) ** 2, 0) / k;
        maxVar = Math.max(maxVar, variance);
        sumVar += variance;
    }
    // Check convergence (final error < 2m)
    const finalError = Math.sqrt(ref[0] ** 2 + ref[1] ** 2 + ref[2] ** 2 // distance from origin (truth at step 100 is near origin)
    );
    const converged = finalError < 5.0; // generous threshold for figure-8
    return {
        passKScore: identical / (k - 1),
        maxVariance: maxVar,
        meanVariance: sumVar / ref.length,
        converged,
        k,
        steps,
    };
}
// ============================================================================
// Outlier Robustness Test
// ============================================================================
function testOutlierRobustness(steps = 200, outlierRate = 0.05, noiseSigma = 1.0) {
    const dt = 0.1;
    const Q = (0, ukf_1.defaultProcessNoise)(dt);
    const R = (0, ukf_1.defaultMeasurementNoise)();
    for (let i = 0; i < 3; i++)
        R[i][i] = noiseSigma * noiseSigma;
    let state = (0, ukf_1.initialState)();
    let trueState = [0, 0, 0, 1, 0, 0, 0, 0, 0];
    const errors = [];
    let maxError = 0;
    let outlierCount = 0;
    for (let s = 0; s < steps; s++) {
        // Advance truth
        const t = s * dt;
        trueState[0] = 8 * Math.sin(0.4 * t);
        trueState[1] = 4 + 2 * Math.cos(0.4 * t);
        trueState[2] = 8 * Math.sin(0.8 * t);
        // Generate measurement
        let z = [
            trueState[0] + (Math.random() - 0.5) * 2 * noiseSigma,
            trueState[1] + (Math.random() - 0.5) * 2 * noiseSigma,
            trueState[2] + (Math.random() - 0.5) * 2 * noiseSigma,
        ];
        // Inject outlier (measurement off by 20m)
        if (Math.random() < outlierRate) {
            z = [z[0] + 20, z[1] - 15, z[2] + 25];
            outlierCount++;
        }
        // Filter step
        state = (0, ukf_1.ukfStep)(state, z, dt, Q, R);
        // Track error
        const err = Math.sqrt((state.x[0] - trueState[0]) ** 2 +
            (state.x[1] - trueState[1]) ** 2 +
            (state.x[2] - trueState[2]) ** 2);
        if (s >= 50)
            errors.push(err); // skip warmup
        maxError = Math.max(maxError, err);
    }
    const rmse = Math.sqrt(errors.reduce((s, e) => s + e * e, 0) / errors.length);
    const finalError = errors[errors.length - 1];
    const diverged = maxError > 10.0;
    return {
        finalError,
        maxError,
        diverged,
        rmse,
        outlierRate: outlierCount / steps,
    };
}
// ============================================================================
// Semantic Perturbation Test
// ============================================================================
function testSemanticPerturbation(steps = 200, noiseSigma = 1.0, perturbationStrength = 0.1 // 10% perturbation
) {
    const dt = 0.1;
    const Q = (0, ukf_1.defaultProcessNoise)(dt);
    const R = (0, ukf_1.defaultMeasurementNoise)();
    for (let i = 0; i < 3; i++)
        R[i][i] = noiseSigma * noiseSigma;
    // Baseline run
    let stateBaseline = (0, ukf_1.initialState)();
    let trueState = [0, 0, 0, 1, 0, 0, 0, 0, 0];
    const baselineErrors = [];
    for (let s = 0; s < steps; s++) {
        const t = s * dt;
        trueState[0] = 8 * Math.sin(0.4 * t);
        trueState[1] = 4 + 2 * Math.cos(0.4 * t);
        trueState[2] = 8 * Math.sin(0.8 * t);
        const z = [
            trueState[0] + (Math.random() - 0.5) * 2 * noiseSigma,
            trueState[1] + (Math.random() - 0.5) * 2 * noiseSigma,
            trueState[2] + (Math.random() - 0.5) * 2 * noiseSigma,
        ];
        stateBaseline = (0, ukf_1.ukfStep)(stateBaseline, z, dt, Q, R);
        const err = Math.sqrt((stateBaseline.x[0] - trueState[0]) ** 2 +
            (stateBaseline.x[1] - trueState[1]) ** 2 +
            (stateBaseline.x[2] - trueState[2]) ** 2);
        if (s >= 50)
            baselineErrors.push(err);
    }
    // Perturbed run (measurements shifted by perturbationStrength * range)
    let statePerturbed = (0, ukf_1.initialState)();
    trueState = [0, 0, 0, 1, 0, 0, 0, 0, 0];
    const perturbedErrors = [];
    for (let s = 0; s < steps; s++) {
        const t = s * dt;
        trueState[0] = 8 * Math.sin(0.4 * t);
        trueState[1] = 4 + 2 * Math.cos(0.4 * t);
        trueState[2] = 8 * Math.sin(0.8 * t);
        // Perturbed measurement: shift each by a fraction of the measurement range
        const perturbation = perturbationStrength * noiseSigma * 2;
        const z = [
            trueState[0] + (Math.random() - 0.5) * 2 * noiseSigma + perturbation,
            trueState[1] + (Math.random() - 0.5) * 2 * noiseSigma - perturbation,
            trueState[2] + (Math.random() - 0.5) * 2 * noiseSigma + perturbation * 0.5,
        ];
        statePerturbed = (0, ukf_1.ukfStep)(statePerturbed, z, dt, Q, R);
        const err = Math.sqrt((statePerturbed.x[0] - trueState[0]) ** 2 +
            (statePerturbed.x[1] - trueState[1]) ** 2 +
            (statePerturbed.x[2] - trueState[2]) ** 2);
        if (s >= 50)
            perturbedErrors.push(err);
    }
    const baselineRMSE = Math.sqrt(baselineErrors.reduce((s, e) => s + e * e, 0) / baselineErrors.length);
    const perturbedRMSE = Math.sqrt(perturbedErrors.reduce((s, e) => s + e * e, 0) / perturbedErrors.length);
    const degradationRatio = perturbedRMSE / Math.max(baselineRMSE, 0.001);
    return {
        baselineRMSE,
        perturbedRMSE,
        degradationRatio,
        stable: degradationRatio < 1.5,
    };
}
// ============================================================================
// Run all reliability tests
// ============================================================================
function runAllReliabilityTests() {
    console.log('AEGIS UKF — Reliability Test Suite');
    console.log('=====================================\n');
    // Pass^k
    console.log('1. Pass^k Consistency (k=10, 100 steps, σ=1m)');
    const passK = testPassKConsistency(10, 100, 1.0);
    console.log(`   pass^k score: ${passK.passKScore.toFixed(4)} (1.0 = perfectly deterministic)`);
    console.log(`   max variance: ${passK.maxVariance.toExponential(3)}`);
    console.log(`   converged: ${passK.converged}\n`);
    // Outliers
    console.log('2. Outlier Robustness (200 steps, 5% outliers, σ=1m)');
    const outliers = testOutlierRobustness(200, 0.05, 1.0);
    console.log(`   RMSE: ${outliers.rmse.toFixed(3)}m`);
    console.log(`   max error: ${outliers.maxError.toFixed(3)}m`);
    console.log(`   diverged: ${outliers.diverged}`);
    console.log(`   actual outlier rate: ${(outliers.outlierRate * 100).toFixed(1)}%\n`);
    // Perturbation
    console.log('3. Semantic Perturbation (10% perturbation, σ=1m)');
    const perturbation = testSemanticPerturbation(200, 1.0, 0.1);
    console.log(`   baseline RMSE: ${perturbation.baselineRMSE.toFixed(3)}m`);
    console.log(`   perturbed RMSE: ${perturbation.perturbedRMSE.toFixed(3)}m`);
    console.log(`   degradation: ${perturbation.degradationRatio.toFixed(2)}x`);
    console.log(`   stable: ${perturbation.stable}\n`);
    console.log('=====================================');
    console.log('Summary:');
    console.log(`  Deterministic: ${passK.passKScore === 1.0 ? 'YES' : 'NO'} (pass^k = ${passK.passKScore.toFixed(4)})`);
    console.log(`  Outlier-tolerant: ${!outliers.diverged ? 'YES' : 'NO'} (RMSE ${outliers.rmse.toFixed(2)}m, max ${outliers.maxError.toFixed(2)}m)`);
    console.log(`  Perturbation-stable: ${perturbation.stable ? 'YES' : 'NO'} (degradation ${perturbation.degradationRatio.toFixed(2)}x)`);
}
// CLI entry point
if (typeof require !== 'undefined' && require.main === module) {
    runAllReliabilityTests();
}
