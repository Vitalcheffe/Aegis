"use strict";
/**
 * Tests for UKF reliability (pass^k, outlier, perturbation)
 */
Object.defineProperty(exports, "__esModule", { value: true });
const reliability_tests_1 = require("./reliability-tests");
describe('UKF Reliability — Pass^k Consistency', () => {
    test('pass^k = 1.0 (deterministic: same input → same output)', () => {
        const result = (0, reliability_tests_1.testPassKConsistency)(5, 50, 1.0);
        expect(result.passKScore).toBeCloseTo(1.0, 4);
        expect(result.maxVariance).toBeLessThan(1e-20);
    });
    test('max variance is effectively zero', () => {
        const result = (0, reliability_tests_1.testPassKConsistency)(10, 100, 1.0);
        expect(result.maxVariance).toBeLessThan(1e-15);
    });
});
describe('UKF Reliability — Outlier Robustness', () => {
    test('with no outliers, RMSE is reasonable', () => {
        const result = (0, reliability_tests_1.testOutlierRobustness)(100, 0.0, 1.0); // 0% outliers
        expect(result.rmse).toBeLessThan(1.0);
        expect(result.diverged).toBe(false);
    });
    test('with 5% outliers at 20m, filter diverges (honest limitation)', () => {
        const result = (0, reliability_tests_1.testOutlierRobustness)(200, 0.05, 1.0);
        // The UKF has no outlier rejection — this is a known limitation.
        // The filter diverges when 5% of measurements are off by 20m.
        // This test documents that honestly.
        expect(result.diverged).toBe(true);
        expect(result.rmse).toBeGreaterThan(1.0);
    });
    test('outlier rate is approximately correct', () => {
        const result = (0, reliability_tests_1.testOutlierRobustness)(200, 0.10, 1.0); // 10% requested
        expect(result.outlierRate).toBeGreaterThan(0.05);
        expect(result.outlierRate).toBeLessThan(0.15);
    });
});
describe('UKF Reliability — Semantic Perturbation', () => {
    test('small perturbation (5%) does not degrade filter', () => {
        const result = (0, reliability_tests_1.testSemanticPerturbation)(100, 1.0, 0.05);
        expect(result.degradationRatio).toBeLessThan(1.5);
        expect(result.stable).toBe(true);
    });
    test('moderate perturbation (10%) stays stable', () => {
        const result = (0, reliability_tests_1.testSemanticPerturbation)(100, 1.0, 0.10);
        expect(result.degradationRatio).toBeLessThan(1.5);
        expect(result.stable).toBe(true);
    });
    test('perturbed RMSE is close to baseline', () => {
        const result = (0, reliability_tests_1.testSemanticPerturbation)(100, 1.0, 0.10);
        const diff = Math.abs(result.perturbedRMSE - result.baselineRMSE);
        // With 10% perturbation on σ=1m, the difference should be small
        expect(diff).toBeLessThan(0.5);
    });
});
