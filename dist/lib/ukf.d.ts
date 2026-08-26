/**
 * Unscented Kalman Filter (UKF) — Merwe-scaled sigma points.
 *
 * Implements the 9-state UKF specified in AEGIS_UKF_MATH.md:
 *   x = [x, y, z, vx, vy, vz, ax, ay, az]
 *
 * State transition: constant-acceleration model
 *   x_k+1 = x_k + v_k*dt + 0.5*a_k*dt²
 *   v_k+1 = v_k + a_k*dt
 *   a_k+1 = a_k  (constant — acceleration is the random walk)
 *
 * Measurement model: position-only (GPS-like)
 *   z_k = [x, y, z]  (3D position)
 *
 * Sigma points: Merwe-scaled with α=1e-3, κ=0, β=2
 *   λ = α²(L+κ) - L
 *   2L+1 sigma points (19 for L=9)
 *
 * This is a runnable implementation — not documentation. It is exported
 * and unit-tested. The math matches the closed-form spec; the only
 * numerical shortcuts are Cholesky-based square roots (standard).
 *
 * Reference:
 *   Wan, E. A. and Van Der Merwe, R. (2000). "The unscented Kalman
 *   filter for nonlinear estimation." AS-SPCOM 2000.
 *   Merwe, R. et al. (2004). "Sigma-Point Kalman Filters for Integrated
 *   Navigation." Proceedings of ION GPS 2004.
 */
export type Matrix = number[][];
export type Vector = number[];
export type State = {
    x: Vector;
    P: Matrix;
};
export type SigmaPoints = {
    points: Vector[];
    Wm: Vector;
    Wc: Vector;
};
export declare const UKF_CONFIG: {
    readonly L: 9;
    readonly alpha: 0.001;
    readonly beta: 2;
    readonly kappa: 0;
};
export declare function computeLambda(L: number, alpha: number, kappa: number): number;
export declare function zeros(rows: number, cols?: number): Matrix;
export declare function identity(n: number): Matrix;
export declare function matmul(A: Matrix, B: Matrix): Matrix;
export declare function transpose(A: Matrix): Matrix;
export declare function matadd(A: Matrix, B: Matrix): Matrix;
export declare function matsub(A: Matrix, B: Matrix): Matrix;
export declare function matscale(A: Matrix, s: number): Matrix;
export declare function matvec(A: Matrix, v: Vector): Vector;
export declare function vecadd(a: Vector, b: Vector): Vector;
export declare function vecsub(a: Vector, b: Vector): Vector;
export declare function vecscale(a: Vector, s: number): Vector;
export declare function outer(a: Vector, b: Vector): Matrix;
export declare function cholesky(A: Matrix): Matrix;
/**
 * Generate Merwe-scaled sigma points for state (x, P).
 *
 * Returns 2L+1 sigma points and their weights:
 *   χ[0]   = x
 *   χ[i]   = x + (√((L+λ)P))_i     for i = 1..L
 *   χ[i+L] = x - (√((L+λ)P))_i     for i = 1..L
 *
 * Weights:
 *   Wm[0] = λ / (L+λ)
 *   Wm[i] = 1 / (2(L+λ))           for i = 1..2L
 *   Wc[0] = λ / (L+λ) + (1 - α² + β)
 *   Wc[i] = 1 / (2(L+λ))           for i = 1..2L
 */
export declare function generateSigmaPoints(x: Vector, P: Matrix, config?: typeof UKF_CONFIG): SigmaPoints;
/**
 * Constant-acceleration state transition.
 *   x_k+1 = x_k + v_k*dt + 0.5*a_k*dt²
 *   v_k+1 = v_k + a_k*dt
 *   a_k+1 = a_k  (constant)
 *
 * State layout: [x, y, z, vx, vy, vz, ax, ay, az]
 */
export declare function stateTransition(x: Vector, dt: number): Vector;
/**
 * Measurement function: position-only observation.
 *   z = [x, y, z]  (first 3 components of state)
 */
export declare function measurementFunction(x: Vector): Vector;
/**
 * UKF predict step.
 *
 * 1. Generate sigma points from current state (x, P)
 * 2. Propagate each through state transition: χ_k+1 = f(χ_k, dt)
 * 3. Compute predicted mean: x_pred = Σ Wm[i] * χ_k+1[i]
 * 4. Compute predicted covariance:
 *      P_pred = Σ Wc[i] * (χ_k+1[i] - x_pred) * (χ_k+1[i] - x_pred)^T
 *    + Q (process noise)
 */
export declare function ukfPredict(state: State, dt: number, Q: Matrix): State;
/**
 * UKF update step.
 *
 * 1. Generate sigma points from predicted state
 * 2. Propagate through measurement function: ζ_k = h(χ_k)
 * 3. Predicted measurement: z_pred = Σ Wm[i] * ζ_k[i]
 * 4. Innovation covariance:
 *      S = Σ Wc[i] * (ζ_k[i] - z_pred) * (ζ_k[i] - z_pred)^T + R
 * 5. Cross-covariance:
 *      Pxz = Σ Wc[i] * (χ_k[i] - x_pred) * (ζ_k[i] - z_pred)^T
 * 6. Kalman gain: K = Pxz * S^-1
 * 7. State update: x = x_pred + K * (z - z_pred)
 *    Covariance update: P = P_pred - K * S * K^T
 */
export declare function ukfUpdate(state: State, z: Vector, R: Matrix): State;
export declare function ukfStep(state: State, z: Vector, dt: number, Q: Matrix, R: Matrix): State;
/**
 * Default process noise Q for the 9-state CA model.
 * Tuned for UAV-class dynamics: position σ ~ 0.1m, velocity σ ~ 0.1m/s.
 */
export declare function defaultProcessNoise(dt: number): Matrix;
/**
 * Default measurement noise R for GPS-class position observations.
 * σ = 1m per axis (consumer GPS accuracy).
 */
export declare function defaultMeasurementNoise(): Matrix;
export declare function initialState(): State;
