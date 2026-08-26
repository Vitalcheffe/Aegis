/**
 * Gated UKF — UKF with chi-square innovation gate for outlier rejection
 *
 * Before each measurement update:
 *   1. Compute predicted measurement z_pred = Σ Wm[i] * h(χ[i])
 *   2. Compute innovation ν = z - z_pred
 *   3. Compute innovation covariance S
 *   4. Compute NIS = νᵀ S⁻¹ ν
 *   5. If NIS ≤ χ²(m, 95%) → accept, perform update
 *   6. If NIS > χ²(m, 95%) → reject, predict only (no measurement update)
 *
 * This prevents outlier measurements (e.g., 20m offset) from corrupting
 * the state estimate. The filter predicts through the outlier and
 * resumes normal updates when good measurements return.
 */
import { State } from './ukf';
export interface GatedUKFResult {
    state: State;
    accepted: boolean;
    nis: number;
    threshold: number;
    rejectedCount: number;
}
export declare function gatedUKFStep(state: State, z: number[], dt: number, Q: number[][], R: number[][]): GatedUKFResult;
/**
 * Run gated UKF for multiple steps, tracking total rejected measurements.
 */
export declare function runGatedUKF(initialState: State, measurements: number[][], dt: number, Q: number[][], R: number[][]): {
    finalState: State;
    rejected: number;
    accepted: number;
    nisHistory: number[];
};
