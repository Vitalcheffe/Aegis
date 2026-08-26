"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.gatedUKFStep = gatedUKFStep;
exports.runGatedUKF = runGatedUKF;
const ukf_1 = require("./ukf");
const chi_square_gate_1 = require("./chi-square-gate");
function gatedUKFStep(state, z, dt, Q, R) {
    // Predict step (always runs)
    const predicted = (0, ukf_1.ukfPredict)(state, dt, Q);
    // Generate sigma points from predicted state to compute z_pred and S
    const { points, Wm, Wc } = (0, ukf_1.generateSigmaPoints)(predicted.x, predicted.P);
    // Propagate through measurement function
    const propMeas = points.map(p => {
        // h(x) = [x, y, z] (position only — same as ukf.ts measurementFunction)
        return [p[0], p[1], p[2]];
    });
    // Predicted measurement
    const m = z.length;
    const z_pred = new Array(m).fill(0);
    for (let i = 0; i < propMeas.length; i++) {
        for (let j = 0; j < m; j++) {
            z_pred[j] += Wm[i] * propMeas[i][j];
        }
    }
    // Innovation covariance S
    const S = Array.from({ length: m }, () => new Array(m).fill(0));
    for (let i = 0; i < propMeas.length; i++) {
        const d = propMeas[i].map((v, j) => v - z_pred[j]);
        for (let r = 0; r < m; r++) {
            for (let c = 0; c < m; c++) {
                S[r][c] += Wc[i] * d[r] * d[c];
            }
        }
    }
    for (let r = 0; r < m; r++) {
        for (let c = 0; c < m; c++) {
            S[r][c] += R[r][c];
        }
    }
    // Innovation
    const innov = z.map((v, j) => v - z_pred[j]);
    // Gate decision
    const gate = (0, chi_square_gate_1.gateMeasurement)(innov, S);
    if (gate.accepted) {
        // Normal update
        const updated = (0, ukf_1.ukfUpdate)(predicted, z, R);
        return {
            state: updated,
            accepted: true,
            nis: gate.nis,
            threshold: gate.threshold,
            rejectedCount: 0,
        };
    }
    else {
        // Reject — predict only, don't update with outlier
        return {
            state: predicted,
            accepted: false,
            nis: gate.nis,
            threshold: gate.threshold,
            rejectedCount: 1,
        };
    }
}
/**
 * Run gated UKF for multiple steps, tracking total rejected measurements.
 */
function runGatedUKF(initialState, measurements, dt, Q, R) {
    let state = initialState;
    let rejected = 0;
    let accepted = 0;
    const nisHistory = [];
    for (const z of measurements) {
        const result = gatedUKFStep(state, z, dt, Q, R);
        state = result.state;
        nisHistory.push(result.nis);
        if (result.accepted) {
            accepted++;
        }
        else {
            rejected++;
        }
    }
    return { finalState: state, rejected, accepted, nisHistory };
}
