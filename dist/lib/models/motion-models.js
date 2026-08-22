"use strict";
/**
 * Motion Models — ALL 9-state (homogeneous for IMM compatibility)
 *
 * Four motion models, all using the same 9-state vector:
 *   x = [x, y, z, vx, vy, vz, ax, ay, az]
 *
 * 1. CV (Constant Velocity): acceleration = 0, velocity random walk
 * 2. CA (Constant Acceleration): acceleration random walk (default in ukf.ts)
 * 3. CT (Coordinated Turn): acceleration derived from turn rate
 * 4. Singer: acceleration decays exponentially (a' = a*exp(-dt/τ))
 *
 * By using homogeneous dimensions, the IMM mixing is numerically stable.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.motionModels = exports.stateNames = exports.STATE_DIM = void 0;
exports.cvTransition = cvTransition;
exports.cvMeasurement = cvMeasurement;
exports.cvDefaultQ = cvDefaultQ;
exports.caTransition = caTransition;
exports.caMeasurement = caMeasurement;
exports.caDefaultQ = caDefaultQ;
exports.ctTransition = ctTransition;
exports.ctMeasurement = ctMeasurement;
exports.ctDefaultQ = ctDefaultQ;
exports.singerTransition = singerTransition;
exports.singerMeasurement = singerMeasurement;
exports.singerDefaultQ = singerDefaultQ;
exports.defaultR = defaultR;
exports.initialState = initialState;
exports.STATE_DIM = 9;
exports.stateNames = ['x', 'y', 'z', 'vx', 'vy', 'vz', 'ax', 'ay', 'az'];
// ============================================================================
// CV: Constant Velocity (9-state, acceleration = 0)
// ============================================================================
function cvTransition(x, dt) {
    return [
        x[0] + x[3] * dt, x[1] + x[4] * dt, x[2] + x[5] * dt,
        x[3], x[4], x[5],
        0, 0, 0, // acceleration forced to 0
    ];
}
function cvMeasurement(x) { return [x[0], x[1], x[2]]; }
function cvDefaultQ(dt) {
    const Q = zeros(9, 9);
    const qv = 0.1 * dt;
    for (let i = 0; i < 3; i++) {
        Q[i][i] = qv * dt * dt / 4;
        Q[3 + i][3 + i] = qv;
        Q[i][3 + i] = qv * dt / 2;
        Q[3 + i][i] = qv * dt / 2;
    }
    return Q;
}
// ============================================================================
// CA: Constant Acceleration (9-state, already in ukf.ts)
// ============================================================================
function caTransition(x, dt) {
    const nx = new Array(9).fill(0);
    for (let i = 0; i < 3; i++)
        nx[i] = x[i] + x[3 + i] * dt + 0.5 * x[6 + i] * dt * dt;
    for (let i = 0; i < 3; i++)
        nx[3 + i] = x[3 + i] + x[6 + i] * dt;
    for (let i = 0; i < 3; i++)
        nx[6 + i] = x[6 + i];
    return nx;
}
function caMeasurement(x) { return [x[0], x[1], x[2]]; }
function caDefaultQ(dt) {
    // Non-diagonal: continuous white-noise jerk model
    // Q = q * [[dt⁵/20, dt⁴/8, dt³/6], [dt⁴/8, dt³/3, dt²/2], [dt³/6, dt²/2, dt]]
    // per axis (3×3 block), repeated 3 times along diagonal
    const Q = zeros(9, 9);
    const q = 0.5; // jerk spectral density
    const dt2 = dt * dt, dt3 = dt2 * dt, dt4 = dt3 * dt, dt5 = dt4 * dt;
    for (let axis = 0; axis < 3; axis++) {
        const p = axis, v = axis + 3, a = axis + 6;
        Q[p][p] = q * dt5 / 20;
        Q[p][v] = q * dt4 / 8;
        Q[p][a] = q * dt3 / 6;
        Q[v][p] = q * dt4 / 8;
        Q[v][v] = q * dt3 / 3;
        Q[v][a] = q * dt2 / 2;
        Q[a][p] = q * dt3 / 6;
        Q[a][v] = q * dt2 / 2;
        Q[a][a] = q * dt;
    }
    return Q;
}
// ============================================================================
// CT: Coordinated Turn (9-state, turn rate stored as cross-axial acceleration)
// ============================================================================
function ctTransition(x, dt) {
    // Derive turn rate from acceleration cross-product
    // If (ax, ay) is consistent with a turn, omega = (vx*ay - vy*ax) / (vx² + vy²)
    const speed2 = x[3] * x[3] + x[4] * x[4];
    let omega = 0;
    if (speed2 > 0.01) {
        omega = (x[3] * x[6 + 1] - x[4] * x[6]) / speed2; // (vx*ay - vy*ax) / v²
    }
    const angle = omega * dt;
    const cosA = Math.cos(angle);
    const sinA = Math.sin(angle);
    // Rotate velocity in xy plane
    const vx_new = x[3] * cosA - x[4] * sinA + x[6] * dt;
    const vy_new = x[3] * sinA + x[4] * cosA + x[7] * dt;
    const vz_new = x[5] + x[8] * dt;
    // Integrate position
    return [
        x[0] + vx_new * dt, x[1] + vy_new * dt, x[2] + vz_new * dt,
        vx_new, vy_new, vz_new,
        x[6], x[7], x[8], // acceleration constant (turn rate encoded via velocity rotation)
    ];
}
function ctMeasurement(x) { return [x[0], x[1], x[2]]; }
function ctDefaultQ(dt) {
    const Q = zeros(9, 9);
    const q = 0.3;
    const dt2 = dt * dt, dt3 = dt2 * dt, dt4 = dt3 * dt, dt5 = dt4 * dt;
    for (let axis = 0; axis < 3; axis++) {
        const p = axis, v = axis + 3, a = axis + 6;
        Q[p][p] = q * dt5 / 20;
        Q[p][v] = q * dt4 / 8;
        Q[p][a] = q * dt3 / 6;
        Q[v][p] = q * dt4 / 8;
        Q[v][v] = q * dt3 / 3;
        Q[v][a] = q * dt2 / 2;
        Q[a][p] = q * dt3 / 6;
        Q[a][v] = q * dt2 / 2;
        Q[a][a] = q * dt;
    }
    return Q;
}
// ============================================================================
// Singer: Exponentially Correlated Acceleration
// a' = a * exp(-dt/τ) + w, where w ~ N(0, σ²_a * (1 - exp(-2dt/τ)))
// ============================================================================
const SINGER_TAU = 10.0; // correlation time (seconds)
const SINGER_SIGMA_A = 3.0; // acceleration std (m/s²)
function singerTransition(x, dt) {
    const alpha = Math.exp(-dt / SINGER_TAU);
    const nx = new Array(9).fill(0);
    // Position: x + v*dt + 0.5*a*dt² (same as CA for position/velocity)
    for (let i = 0; i < 3; i++)
        nx[i] = x[i] + x[3 + i] * dt + 0.5 * x[6 + i] * dt * dt;
    for (let i = 0; i < 3; i++)
        nx[3 + i] = x[3 + i] + x[6 + i] * dt;
    // Acceleration: a' = a * exp(-dt/τ) (exponential decay)
    for (let i = 0; i < 3; i++)
        nx[6 + i] = x[6 + i] * alpha;
    return nx;
}
function singerMeasurement(x) { return [x[0], x[1], x[2]]; }
function singerDefaultQ(dt) {
    const Q = zeros(9, 9);
    const tau = SINGER_TAU;
    const sa2 = SINGER_SIGMA_A * SINGER_SIGMA_A;
    const alpha = Math.exp(-dt / tau);
    const ea2 = alpha * alpha;
    const ea4 = alpha * alpha * alpha * alpha;
    for (let axis = 0; axis < 3; axis++) {
        const p = axis, v = axis + 3, a = axis + 6;
        // Singer process noise (Bar-Shalom eq 6.3-78)
        Q[p][p] = sa2 * (2 * ea2 * dt - 4 * alpha * dt + 2 * dt - (4 * Math.pow(alpha, 3) * dt) / (3) + (ea4 * dt) / (6) + dt * ea2 / 2 + (2 * dt) / (3) + dt * ea2 / 2) / (2 * Math.pow(1 / tau, 4));
        Q[v][v] = sa2 * (dt - 2 * dt * alpha + dt * ea2) / (2 * Math.pow(1 / tau, 2));
        Q[a][a] = sa2 * (1 - ea2);
        // Cross terms (simplified — full Singer Q has complex cross-covariances)
        Q[p][v] = Q[v][p] = sa2 * (1 - 2 * alpha + ea2) / (2 * Math.pow(1 / tau, 3));
        Q[p][a] = Q[a][p] = sa2 * (1 - ea2 - 2 * alpha * dt / tau + 2 * ea2 * dt / tau) / (2 * Math.pow(1 / tau, 2));
        Q[v][a] = Q[a][v] = sa2 * (1 - ea2) / (2 * (1 / tau));
    }
    return Q;
}
// ============================================================================
// Common measurement noise (all models use 3D position)
// ============================================================================
function defaultR() {
    const R = zeros(3, 3);
    for (let i = 0; i < 3; i++)
        R[i][i] = 1.0;
    return R;
}
// ============================================================================
// Matrix helpers
// ============================================================================
function zeros(r, c = r) {
    return Array.from({ length: r }, () => new Array(c).fill(0));
}
function identity(n) {
    const M = zeros(n, n);
    for (let i = 0; i < n; i++)
        M[i][i] = 1;
    return M;
}
exports.motionModels = {
    CV: { name: 'CV', transition: cvTransition, measurement: cvMeasurement, defaultQ: cvDefaultQ, defaultR: defaultR },
    CA: { name: 'CA', transition: caTransition, measurement: caMeasurement, defaultQ: caDefaultQ, defaultR: defaultR },
    CT: { name: 'CT', transition: ctTransition, measurement: ctMeasurement, defaultQ: ctDefaultQ, defaultR: defaultR },
    Singer: { name: 'Singer', transition: singerTransition, measurement: singerMeasurement, defaultQ: singerDefaultQ, defaultR: defaultR },
};
function initialState() {
    return { x: new Array(9).fill(0), P: identity(9).map(r => r.map(v => v * 10.0)) };
}
