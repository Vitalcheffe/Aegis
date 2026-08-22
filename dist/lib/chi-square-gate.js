"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.chi2Critical = chi2Critical;
exports.mahalanobisDistance = mahalanobisDistance;
exports.gateMeasurement = gateMeasurement;
// Chi-square critical values at 95% confidence
const CHI2_95 = {
    1: 3.841,
    2: 5.991,
    3: 7.815,
    4: 9.488,
    5: 11.070,
    6: 12.592,
    7: 14.067,
    8: 15.507,
    9: 16.919,
};
function chi2Critical(dof, confidence = 0.95) {
    if (confidence !== 0.95) {
        // Only 95% supported for now — extend if needed
        throw new Error(`Only 95% confidence supported, got ${confidence}`);
    }
    return CHI2_95[dof] || 7.815;
}
/**
 * Compute squared Mahalanobis distance: d² = νᵀ S⁻¹ ν
 * This is the normalized innovation squared (NIS).
 */
function mahalanobisDistance(innovation, S) {
    const m = innovation.length;
    // Invert S (2x2, 3x3, or 5x5)
    let Sinv;
    if (m === 2) {
        const [[a, b], [c, d]] = S;
        const det = a * d - b * c;
        Sinv = [[d / det, -b / det], [-c / det, a / det]];
    }
    else if (m === 3) {
        const [[a, b, c], [d, e, f], [g, h, i]] = S;
        const A = e * i - f * h, B = -(d * i - f * g), C = d * h - e * g;
        const det = a * A + b * B + c * C;
        const invDet = 1 / det;
        Sinv = [
            [A * invDet, B * invDet, C * invDet],
            [(-(b * i - c * h)) * invDet, (a * i - c * g) * invDet, (-(a * h - b * g)) * invDet],
            [(b * f - c * e) * invDet, (-(a * f - c * d)) * invDet, (a * e - b * d) * invDet],
        ];
    }
    else {
        // Fallback: brute-force inverse for any size (slow but correct)
        Sinv = matrixInverse(S);
    }
    // d² = νᵀ S⁻¹ ν
    let d2 = 0;
    for (let i = 0; i < m; i++) {
        let rowSum = 0;
        for (let j = 0; j < m; j++) {
            rowSum += Sinv[i][j] * innovation[j];
        }
        d2 += innovation[i] * rowSum;
    }
    return d2;
}
/**
 * Gate decision: should the measurement be accepted?
 *
 * Returns true if the measurement passes the gate (accept),
 * false if it should be rejected (outlier).
 */
function gateMeasurement(innovation, S, confidence = 0.95) {
    const dof = innovation.length;
    const threshold = chi2Critical(dof, confidence);
    const nis = mahalanobisDistance(innovation, S);
    return {
        accepted: nis <= threshold,
        nis,
        threshold,
    };
}
// Brute-force matrix inverse (Gaussian elimination)
function matrixInverse(M) {
    const n = M.length;
    const aug = M.map((row, i) => [...row, ...Array.from({ length: n }, (_, j) => i === j ? 1 : 0)]);
    for (let i = 0; i < n; i++) {
        // Pivot
        let maxRow = i;
        for (let k = i + 1; k < n; k++) {
            if (Math.abs(aug[k][i]) > Math.abs(aug[maxRow][i]))
                maxRow = k;
        }
        [aug[i], aug[maxRow]] = [aug[maxRow], aug[i]];
        // Eliminate
        const pivot = aug[i][i];
        if (Math.abs(pivot) < 1e-15)
            throw new Error('Singular matrix');
        for (let j = 0; j < 2 * n; j++)
            aug[i][j] /= pivot;
        for (let k = 0; k < n; k++) {
            if (k === i)
                continue;
            const factor = aug[k][i];
            for (let j = 0; j < 2 * n; j++)
                aug[k][j] -= factor * aug[i][j];
        }
    }
    return aug.map(row => row.slice(n));
}
