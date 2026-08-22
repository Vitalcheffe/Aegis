/**
 * Chi-Square Innovation Gate for Outlier Rejection
 *
 * Before each measurement update, compute the innovation:
 *   ν = z - h(x̂_pred)
 * and its covariance:
 *   S = H P Hᵀ + R  (approximated via sigma points in UKF)
 *
 * Gate test:
 *   d² = νᵀ S⁻¹ ν  (squared Mahalanobis distance)
 *   If d² ≤ χ²(m, 95%) → accept measurement, perform update
 *   If d² > χ²(m, 95%) → reject measurement, predict only
 *
 * For 3 DoF (3D position measurement): χ²(3, 0.95) = 7.815
 * For 5 DoF (position + bearing + range-rate): χ²(5, 0.95) = 11.070
 *
 * Reference: Bar-Shalom et al. (2001), Chapter 1, Section 1.4
 */
export declare function chi2Critical(dof: number, confidence?: number): number;
/**
 * Compute squared Mahalanobis distance: d² = νᵀ S⁻¹ ν
 * This is the normalized innovation squared (NIS).
 */
export declare function mahalanobisDistance(innovation: number[], S: number[][]): number;
/**
 * Gate decision: should the measurement be accepted?
 *
 * Returns true if the measurement passes the gate (accept),
 * false if it should be rejected (outlier).
 */
export declare function gateMeasurement(innovation: number[], S: number[][], confidence?: number): {
    accepted: boolean;
    nis: number;
    threshold: number;
};
