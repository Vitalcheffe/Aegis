/**
 * Motion Models for UKF
 *
 * Three motion models that can be used with the UKF:
 *   1. Constant Velocity (CV) — 6-state: [x, y, z, vx, vy, vz]
 *   2. Constant Acceleration (CA) — 9-state: [x, y, z, vx, vy, vz, ax, ay, az]
 *      (already implemented in ukf.ts as the default)
 *   3. Coordinated Turn (CT) — 7-state: [x, y, vx, vy, omega, ax, ay]
 *      (2D horizontal plane with turn rate)
 *
 * These are the building blocks for a future IMM-UKF (Interacting
 * Multiple Model) that switches between models based on observed
 * target behavior. The IMM itself is NOT implemented yet — these
 * are the individual models.
 *
 * References:
 *   Bar-Shalom, Y., Li, X. R., & Kirubarajan, T. (2001).
 *   "Estimation with Applications to Tracking and Navigation."
 *   Wiley. Chapter 11 (IMM).
 */

export type MotionModel = 'CV' | 'CA' | 'CT';

export interface MotionModelSpec {
  name: MotionModel;
  stateDimension: number;
  stateNames: string[];
  transition: (x: number[], dt: number) => number[];
  measurement: (x: number[]) => number[];
  defaultQ: (dt: number) => number[][];
  defaultR: () => number[][];
}

function zeros(r: number, c: number = r): number[][] {
  return Array.from({ length: r }, () => new Array(c).fill(0));
}

function identity(n: number): number[][] {
  const M = zeros(n, n);
  for (let i = 0; i < n; i++) M[i][i] = 1;
  return M;
}

// ============================================================================
// Constant Velocity (CV) Model — 6-state
// ============================================================================

export const CV_DIM = 6;
export const cvStateNames = ['x', 'y', 'z', 'vx', 'vy', 'vz'];

export function cvTransition(x: number[], dt: number): number[] {
  return [
    x[0] + x[3] * dt,  x[1] + x[4] * dt,  x[2] + x[5] * dt,
    x[3], x[4], x[5],
  ];
}

export function cvMeasurement(x: number[]): number[] { return [x[0], x[1], x[2]]; }

export function cvDefaultQ(dt: number): number[][] {
  const Q = zeros(6, 6);
  const qv = 0.1 * dt;
  for (let i = 0; i < 3; i++) { Q[i][i] = qv * dt * dt / 2; Q[3 + i][3 + i] = qv; }
  return Q;
}

export function cvDefaultR(): number[][] {
  const R = zeros(3, 3); for (let i = 0; i < 3; i++) R[i][i] = 1.0; return R;
}

// ============================================================================
// Constant Acceleration (CA) Model — 9-state
// ============================================================================

export const CA_DIM = 9;
export const caStateNames = ['x', 'y', 'z', 'vx', 'vy', 'vz', 'ax', 'ay', 'az'];

export function caTransition(x: number[], dt: number): number[] {
  const nx = new Array(9).fill(0);
  for (let i = 0; i < 3; i++) nx[i] = x[i] + x[3 + i] * dt + 0.5 * x[6 + i] * dt * dt;
  for (let i = 0; i < 3; i++) nx[3 + i] = x[3 + i] + x[6 + i] * dt;
  for (let i = 0; i < 3; i++) nx[6 + i] = x[6 + i];
  return nx;
}

export function caMeasurement(x: number[]): number[] { return [x[0], x[1], x[2]]; }

export function caDefaultQ(dt: number): number[][] {
  const Q = zeros(9, 9);
  for (let i = 0; i < 3; i++) Q[i][i] = 0.01 * dt;
  for (let i = 3; i < 6; i++) Q[i][i] = 0.1 * dt;
  for (let i = 6; i < 9; i++) Q[i][i] = 1.0 * dt;
  return Q;
}

export function caDefaultR(): number[][] {
  const R = zeros(3, 3); for (let i = 0; i < 3; i++) R[i][i] = 1.0; return R;
}

// ============================================================================
// Coordinated Turn (CT) Model — 7-state, 2D horizontal plane
// ============================================================================

export const CT_DIM = 7;
export const ctStateNames = ['x', 'y', 'vx', 'vy', 'omega', 'ax', 'ay'];

/**
 * CT state transition: coordinated turn model
 *
 * State: [x, y, vx, vy, omega, ax, ay]
 *   (x, y)     — 2D position
 *   (vx, vy)   — 2D velocity
 *   omega      — turn rate (rad/s)
 *   (ax, ay)   — 2D acceleration (constant within step)
 *
 * The velocity rotates by omega * dt:
 *   vx' = vx * cos(ω·dt) - vy * sin(ω·dt) + ax * dt
 *   vy' = vx * sin(ω·dt) + vy * cos(ω·dt) + ay * dt
 *
 * Reference: Bar-Shalom et al. (2001), eq. 11.6-11.7.
 */
export function ctTransition(x: number[], dt: number): number[] {
  const omega = x[4];
  const angle = omega * dt;
  const cosA = Math.cos(angle);
  const sinA = Math.sin(angle);

  const vx_new = x[2] * cosA - x[3] * sinA + x[5] * dt;
  const vy_new = x[2] * sinA + x[3] * cosA + x[6] * dt;
  const x_new = x[0] + vx_new * dt;
  const y_new = x[1] + vy_new * dt;

  return [x_new, y_new, vx_new, vy_new, omega, x[5], x[6]];
}

export function ctMeasurement(x: number[]): number[] { return [x[0], x[1], 0]; /* 3D: z=0 for xy-plane motion */ }

export function ctDefaultQ(dt: number): number[][] {
  const Q = zeros(7, 7);
  Q[0][0] = 0.01 * dt;  Q[1][1] = 0.01 * dt;
  Q[2][2] = 0.1 * dt;   Q[3][3] = 0.1 * dt;
  Q[4][4] = 0.01 * dt;
  Q[5][5] = 1.0 * dt;   Q[6][6] = 1.0 * dt;
  return Q;
}

export function ctDefaultR(): number[][] {
  // 3x3 (z=0 plane, but 3D for IMM compatibility)
  const R = zeros(3, 3); R[0][0] = 1.0; R[1][1] = 1.0; R[2][2] = 1.0; return R;
}

// ============================================================================
// Model Registry
// ============================================================================

export const motionModels: Record<MotionModel, MotionModelSpec> = {
  CV: { name: 'CV', stateDimension: CV_DIM, stateNames: cvStateNames, transition: cvTransition, measurement: cvMeasurement, defaultQ: cvDefaultQ, defaultR: cvDefaultR },
  CA: { name: 'CA', stateDimension: CA_DIM, stateNames: caStateNames, transition: caTransition, measurement: caMeasurement, defaultQ: caDefaultQ, defaultR: caDefaultR },
  CT: { name: 'CT', stateDimension: CT_DIM, stateNames: ctStateNames, transition: ctTransition, measurement: ctMeasurement, defaultQ: ctDefaultQ, defaultR: ctDefaultR },
};

export function cvInitialState() { return { x: new Array(6).fill(0), P: identity(6).map(r => r.map(v => v * 10.0)) }; }
export function ctInitialState() { return { x: new Array(7).fill(0), P: identity(7).map(r => r.map(v => v * 10.0)) }; }
