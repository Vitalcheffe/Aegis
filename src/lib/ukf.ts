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

// ============================================================================
// Types
// ============================================================================

export type Matrix = number[][];        // row-major: M[row][col]
export type Vector = number[];           // 1-D
export type State = {
  x: Vector;      // state estimate (length L)
  P: Matrix;       // state covariance (L×L)
};

// Sigma points and their weights
export type SigmaPoints = {
  points: Vector[];     // length 2L+1, each Vector of length L
  Wm: Vector;            // mean weights, length 2L+1
  Wc: Vector;            // covariance weights, length 2L+1
};

// ============================================================================
// UKF configuration
// ============================================================================

export const UKF_CONFIG = {
  L: 9,                  // state dimension
  alpha: 1e-3,           // sigma point spread (small for Gaussian)
  beta: 2,               // optimal for Gaussian prior
  kappa: 0,              // secondary scaling parameter
} as const;

// Compute λ = α²(L+κ) - L
export function computeLambda(L: number, alpha: number, kappa: number): number {
  return alpha * alpha * (L + kappa) - L;
}

// ============================================================================
// Matrix helpers (no external dep — pure TypeScript)
// ============================================================================

export function zeros(rows: number, cols: number = rows): Matrix {
  return Array.from({ length: rows }, () => new Array(cols).fill(0));
}

export function identity(n: number): Matrix {
  const M = zeros(n, n);
  for (let i = 0; i < n; i++) M[i][i] = 1;
  return M;
}

export function matmul(A: Matrix, B: Matrix): Matrix {
  const rows = A.length;
  const inner = A[0].length;
  const cols = B[0].length;
  const C = zeros(rows, cols);
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let sum = 0;
      for (let k = 0; k < inner; k++) sum += A[i][k] * B[k][j];
      C[i][j] = sum;
    }
  }
  return C;
}

export function transpose(A: Matrix): Matrix {
  const rows = A.length;
  const cols = A[0].length;
  const T = zeros(cols, rows);
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) T[j][i] = A[i][j];
  }
  return T;
}

export function matadd(A: Matrix, B: Matrix): Matrix {
  const rows = A.length;
  const cols = A[0].length;
  const C = zeros(rows, cols);
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) C[i][j] = A[i][j] + B[i][j];
  }
  return C;
}

export function matsub(A: Matrix, B: Matrix): Matrix {
  const rows = A.length;
  const cols = A[0].length;
  const C = zeros(rows, cols);
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) C[i][j] = A[i][j] - B[i][j];
  }
  return C;
}

export function matscale(A: Matrix, s: number): Matrix {
  const rows = A.length;
  const cols = A[0].length;
  const C = zeros(rows, cols);
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) C[i][j] = A[i][j] * s;
  }
  return C;
}

export function matvec(A: Matrix, v: Vector): Vector {
  const rows = A.length;
  const cols = A[0].length;
  const out = new Array(rows).fill(0);
  for (let i = 0; i < rows; i++) {
    let sum = 0;
    for (let j = 0; j < cols; j++) sum += A[i][j] * v[j];
    out[i] = sum;
  }
  return out;
}

export function vecadd(a: Vector, b: Vector): Vector {
  return a.map((x, i) => x + b[i]);
}

export function vecsub(a: Vector, b: Vector): Vector {
  return a.map((x, i) => x - b[i]);
}

export function vecscale(a: Vector, s: number): Vector {
  return a.map((x) => x * s);
}

export function outer(a: Vector, b: Vector): Matrix {
  const rows = a.length;
  const cols = b.length;
  const M = zeros(rows, cols);
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) M[i][j] = a[i] * b[j];
  }
  return M;
}

// Cholesky decomposition: A = L·L^T (lower triangular L)
// Used to compute the matrix square root for sigma point generation.
export function cholesky(A: Matrix): Matrix {
  const n = A.length;
  const L = zeros(n, n);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j <= i; j++) {
      let sum = A[i][j];
      for (let k = 0; k < j; k++) sum -= L[i][k] * L[j][k];
      if (i === j) {
        if (sum <= 0) {
          // Add small jitter for numerical stability
          sum = 1e-10;
        }
        L[i][j] = Math.sqrt(sum);
      } else {
        L[i][j] = sum / L[j][j];
      }
    }
  }
  return L;
}

// ============================================================================
// Sigma point generation
// ============================================================================

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
export function generateSigmaPoints(
  x: Vector,
  P: Matrix,
  config: typeof UKF_CONFIG = UKF_CONFIG
): SigmaPoints {
  const { L, alpha, beta, kappa } = config;
  const lambda = computeLambda(L, alpha, kappa);

  // Scale covariance: (L + λ) * P
  const scaledP = matscale(P, L + lambda);

  // Square root via Cholesky
  const sqrtP = cholesky(scaledP);

  // First sigma point is the mean
  const points: Vector[] = [x.slice()];

  // Next L sigma points: x + column i of sqrtP
  for (let i = 0; i < L; i++) {
    const offset: Vector = new Array(L).fill(0);
    for (let j = 0; j < L; j++) offset[j] = sqrtP[j][i];
    points.push(vecadd(x, offset));
  }

  // Final L sigma points: x - column i of sqrtP
  for (let i = 0; i < L; i++) {
    const offset: Vector = new Array(L).fill(0);
    for (let j = 0; j < L; j++) offset[j] = sqrtP[j][i];
    points.push(vecsub(x, offset));
  }

  // Weights
  const Wm: Vector = new Array(2 * L + 1).fill(0);
  const Wc: Vector = new Array(2 * L + 1).fill(0);

  Wm[0] = lambda / (L + lambda);
  Wc[0] = Wm[0] + (1 - alpha * alpha + beta);

  const w = 1 / (2 * (L + lambda));
  for (let i = 1; i <= 2 * L; i++) {
    Wm[i] = w;
    Wc[i] = w;
  }

  return { points, Wm, Wc };
}

// ============================================================================
// State transition and measurement functions
// ============================================================================

/**
 * Constant-acceleration state transition.
 *   x_k+1 = x_k + v_k*dt + 0.5*a_k*dt²
 *   v_k+1 = v_k + a_k*dt
 *   a_k+1 = a_k  (constant)
 *
 * State layout: [x, y, z, vx, vy, vz, ax, ay, az]
 */
export function stateTransition(x: Vector, dt: number): Vector {
  const newX: Vector = new Array(9).fill(0);
  // Position: x + v*dt + 0.5*a*dt²
  for (let i = 0; i < 3; i++) {
    newX[i] = x[i] + x[3 + i] * dt + 0.5 * x[6 + i] * dt * dt;
  }
  // Velocity: v + a*dt
  for (let i = 0; i < 3; i++) {
    newX[3 + i] = x[3 + i] + x[6 + i] * dt;
  }
  // Acceleration: constant
  for (let i = 0; i < 3; i++) {
    newX[6 + i] = x[6 + i];
  }
  return newX;
}

/**
 * Measurement function: position-only observation.
 *   z = [x, y, z]  (first 3 components of state)
 */
export function measurementFunction(x: Vector): Vector {
  return [x[0], x[1], x[2]];
}

// ============================================================================
// UKF predict and update steps
// ============================================================================

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
export function ukfPredict(
  state: State,
  dt: number,
  Q: Matrix
): State {
  const { x, P } = state;

  // 1. Generate sigma points
  const { points, Wm, Wc } = generateSigmaPoints(x, P);

  // 2. Propagate through state transition
  const propPoints = points.map((p) => stateTransition(p, dt));

  // 3. Predicted mean
  const x_pred: Vector = new Array(x.length).fill(0);
  for (let i = 0; i < propPoints.length; i++) {
    for (let j = 0; j < x_pred.length; j++) {
      x_pred[j] += Wm[i] * propPoints[i][j];
    }
  }

  // 4. Predicted covariance
  const L = x.length;
  const P_pred = zeros(L, L);
  for (let i = 0; i < propPoints.length; i++) {
    const diff = vecsub(propPoints[i], x_pred);
    const outerDiff = outer(diff, diff);
    for (let r = 0; r < L; r++) {
      for (let c = 0; c < L; c++) {
        P_pred[r][c] += Wc[i] * outerDiff[r][c];
      }
    }
  }

  // Add process noise
  const P_with_noise = matadd(P_pred, Q);

  return { x: x_pred, P: P_with_noise };
}

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
export function ukfUpdate(
  state: State,
  z: Vector,
  R: Matrix
): State {
  const { x, P } = state;
  const L = x.length;

  // 1. Generate sigma points from current state
  const { points, Wm, Wc } = generateSigmaPoints(x, P);

  // 2. Propagate through measurement function
  const propMeas = points.map((p) => measurementFunction(p));

  // 3. Predicted measurement
  const z_pred: Vector = new Array(propMeas[0].length).fill(0);
  for (let i = 0; i < propMeas.length; i++) {
    for (let j = 0; j < z_pred.length; j++) {
      z_pred[j] += Wm[i] * propMeas[i][j];
    }
  }

  // 4. Innovation covariance S
  const m = z_pred.length;
  const S = zeros(m, m);
  for (let i = 0; i < propMeas.length; i++) {
    const diff = vecsub(propMeas[i], z_pred);
    const outerDiff = outer(diff, diff);
    for (let r = 0; r < m; r++) {
      for (let c = 0; c < m; c++) {
        S[r][c] += Wc[i] * outerDiff[r][c];
      }
    }
  }
  // Add measurement noise
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < m; c++) {
      S[r][c] += R[r][c];
    }
  }

  // 5. Cross-covariance Pxz
  const Pxz = zeros(L, m);
  for (let i = 0; i < points.length; i++) {
    const stateDiff = vecsub(points[i], x);
    const measDiff = vecsub(propMeas[i], z_pred);
    const outerDiff = outer(stateDiff, measDiff);
    for (let r = 0; r < L; r++) {
      for (let c = 0; c < m; c++) {
        Pxz[r][c] += Wc[i] * outerDiff[r][c];
      }
    }
  }

  // 6. Kalman gain: K = Pxz * S^-1
  // For position-only (m=3), we invert S via Gaussian elimination
  const K = matmul(Pxz, matrixInverse3x3(S));

  // 7. State and covariance update
  const innovation = vecsub(z, z_pred);
  const K_innov = matvec(K, innovation);
  const x_new = vecadd(x, K_innov);

  // P_new = P - K * S * K^T
  const KSt = matmul(K, transpose(S));
  const KSKt = matmul(KSt, transpose(K));
  const P_new = matsub(P, KSKt);

  return { x: x_new, P: P_new };
}

// 3x3 matrix inverse via cofactors (specific to position-only measurement)
function matrixInverse3x3(M: Matrix): Matrix {
  const [[a, b, c], [d, e, f], [g, h, i]] = M;
  const A = e * i - f * h;
  const B = -(d * i - f * g);
  const C = d * h - e * g;
  const D = -(b * i - c * h);
  const E = a * i - c * g;
  const F = -(a * h - b * g);
  const G = b * f - c * e;
  const H = -(a * f - c * d);
  const I = a * e - b * d;
  const det = a * A + b * B + c * C;
  if (Math.abs(det) < 1e-12) {
    throw new Error('Singular matrix in matrixInverse3x3');
  }
  const invDet = 1 / det;
  return [
    [A * invDet, D * invDet, G * invDet],
    [B * invDet, E * invDet, H * invDet],
    [C * invDet, F * invDet, I * invDet],
  ];
}

// ============================================================================
// Full UKF step (predict + update)
// ============================================================================

export function ukfStep(
  state: State,
  z: Vector,
  dt: number,
  Q: Matrix,
  R: Matrix
): State {
  const predicted = ukfPredict(state, dt, Q);
  const updated = ukfUpdate(predicted, z, R);
  return updated;
}

// ============================================================================
// Default process and measurement noise
// ============================================================================

/**
 * Default process noise Q for the 9-state CA model.
 * Tuned for UAV-class dynamics: position σ ~ 0.1m, velocity σ ~ 0.1m/s.
 */
export function defaultProcessNoise(dt: number): Matrix {
  const Q = zeros(9, 9);
  // Position noise (small)
  for (let i = 0; i < 3; i++) Q[i][i] = 0.01 * dt;
  // Velocity noise
  for (let i = 3; i < 6; i++) Q[i][i] = 0.1 * dt;
  // Acceleration noise (random walk — large to allow tracking maneuvers)
  for (let i = 6; i < 9; i++) Q[i][i] = 1.0 * dt;
  return Q;
}

/**
 * Default measurement noise R for GPS-class position observations.
 * σ = 1m per axis (consumer GPS accuracy).
 */
export function defaultMeasurementNoise(): Matrix {
  const R = zeros(3, 3);
  for (let i = 0; i < 3; i++) R[i][i] = 1.0; // 1m σ
  return R;
}

// ============================================================================
// Initial state
// ============================================================================

export function initialState(): State {
  const x: Vector = new Array(9).fill(0);
  const P = matscale(identity(9), 10.0); // high initial uncertainty
  return { x, P };
}
