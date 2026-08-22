/**
 * Spectral Multi-Modal Sensor Fusion
 *
 * Uses eigendecomposition of a reliability matrix to find the optimal
 * weighting of sensors across distance regimes. Unlike simple inverse-
 * variance weighting, spectral fusion captures cross-sensor correlations
 * (e.g., optical and IR both degrade under cloud cover).
 *
 * Algorithm:
 *   1. Build reliability matrix R (sensors × distance bins)
 *   2. Compute principal eigenvector via power iteration
 *   3. Weight sensors by the eigenvector (captures correlation structure)
 *   4. Fuse measurements using spectral weights
 *
 * Reference:
 *   Niroui, F. et al. (2020). "Spectral Fusion: Multi-Modal Sensor
 *   Fusion via Eigendecomposition." (Conceptual — not a real paper,
 *   this is an original implementation of the idea.)
 */
export interface SensorReading {
    sensorId: number;
    value: number;
    variance: number;
    distanceBin: number;
}
export interface FusionResult {
    fusedValue: number;
    fusedVariance: number;
    weights: number[];
    method: 'spectral' | 'weighted_average';
}
export declare function powerIteration(matrix: number[][], iterations?: number, tolerance?: number): {
    eigenvalue: number;
    eigenvector: number[];
};
export declare class SpectralFusion {
    private nSensors;
    private nBins;
    private reliabilityMatrix;
    private spectralWeights;
    private baselineWeights;
    constructor(nSensors?: number, nBins?: number);
    /**
     * Set sensor reliability for a specific distance bin.
     * reliability ∈ [0, 1] where 1 = perfectly reliable, 0 = useless.
     */
    setReliability(sensorId: number, binId: number, reliability: number): void;
    /**
     * Set correlated degradation (e.g., cloud cover degrades optical + IR together).
     */
    setCorrelatedDegradation(sensorIds: number[], binId: number, factor: number): void;
    /**
     * Compute spectral weights via power iteration on reliability matrix.
     * The principal eigenvector captures the correlation structure.
     * Sensors that are correlated (both degrade together) get DOWN-weighted
     * more than independent sensors, because they provide less independent
     * information.
     */
    private computeSpectralWeights;
    /**
     * Baseline: inverse-variance weighted average (ignores correlation).
     */
    private computeBaselineWeights;
    /**
     * Fuse sensor readings using spectral weights.
     * Explicitly accounts for correlated noise: when sensors are correlated,
     * their combined variance is inflated, and the spectral method down-weights
     * them more aggressively than the baseline (which assumes independence).
     */
    fuseSpectral(readings: SensorReading[]): FusionResult;
    /**
     * Solve Ax = b using Gaussian elimination (for small matrices).
     */
    private solveLinearSystem;
    /**
     * Fuse sensor readings using baseline (inverse-variance) weights.
     */
    fuseBaseline(readings: SensorReading[]): FusionResult;
    getWeights(): {
        spectral: number[][];
        baseline: number[][];
    };
}
