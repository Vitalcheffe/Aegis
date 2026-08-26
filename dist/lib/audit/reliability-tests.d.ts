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
export interface ConsistencyResult {
    passKScore: number;
    maxVariance: number;
    meanVariance: number;
    converged: boolean;
    k: number;
    steps: number;
}
export interface OutlierResult {
    finalError: number;
    maxError: number;
    diverged: boolean;
    rmse: number;
    outlierRate: number;
}
export interface PerturbationResult {
    baselineRMSE: number;
    perturbedRMSE: number;
    degradationRatio: number;
    stable: boolean;
}
export declare function testPassKConsistency(k?: number, steps?: number, noiseSigma?: number): ConsistencyResult;
export declare function testOutlierRobustness(steps?: number, outlierRate?: number, noiseSigma?: number): OutlierResult;
export declare function testSemanticPerturbation(steps?: number, noiseSigma?: number, perturbationStrength?: number): PerturbationResult;
export declare function runAllReliabilityTests(): void;
