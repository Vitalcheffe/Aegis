/**
 * IMM-UKF (Interacting Multiple Model Unscented Kalman Filter)
 *
 * This is the REAL implementation of what the marketing pages previously
 * claimed falsely. It switches between multiple motion models (CV, CA, CT)
 * based on which model best explains the current observations.
 *
 * Algorithm (Bar-Shalom et al. 2001, Chapter 11):
 *   1. Interaction/Mixing: mix model states based on transition probability
 *   2. Filtering: run each model's UKF independently
 *   3. Model probability update: compute likelihood of each model
 *   4. Combination: weighted sum of model outputs
 *
 * The transition probability matrix (TPM) defines how likely the target
 * is to switch from model i to model j. The Markov chain is:
 *   μ_{k-1}(j|i) = p_{ij} * μ_{k-1}(i) / c_i
 * where c_i is the normalization constant.
 *
 * References:
 *   Bar-Shalom, Y., Li, X. R., & Kirubarajan, T. (2001).
 *   "Estimation with Applications to Tracking and Navigation."
 *   Wiley. Chapter 11.
 *
 *   Blom, H. A. P., & Bar-Shalom, Y. (1988).
 *   "The interacting multiple model algorithm for systems with
 *   Markovian switching coefficients." IEEE TAC, 33(8), 780-783.
 */

import {
  cvTransition, cvMeasurement, cvDefaultQ, cvDefaultR, cvInitialState, CV_DIM,
  caTransition, caMeasurement, caDefaultQ, caDefaultR,
  ctTransition, ctMeasurement, ctDefaultQ, ctDefaultR, ctInitialState, CT_DIM,
  MotionModel,
} from './models/motion-models';

// ============================================================================
// Types
// ============================================================================

export interface ModelState {
  name: MotionModel;
  x: number[];           // state estimate
  P: number[][];         // covariance
  transition: (x: number[], dt: number) => number[];
  measurement: (x: number[]) => number[];
  Q: (dt: number) => number[][];
  R: number[][];
  initialState: () => { x: number[]; P: number[][] };
  stateDim: number;
}

export interface IMMResult {
  x: number[];           // combined state estimate (in the reference model's frame)
  P: number[][];         // combined covariance
  modelProbs: Record<MotionModel, number>;  // probability of each model
  models: Array<{
    name: MotionModel;
    x: number[];
    P: number[][];
    likelihood: number;
    prob: number;
  }>;
}

// ============================================================================
// Matrix helpers
// ============================================================================

function zeros(r: number, c: number = r): number[][] {
  return Array.from({ length: r }, () => new Array(c).fill(0));
}

function identity(n: number): number[][] {
  const M = zeros(n, n);
  for (let i = 0; i < n; i++) M[i][i] = 1;
  return M;
}

function matadd(A: number[][], B: number[][]): number[][] {
  const r = A.length, c = A[0].length;
  const C = zeros(r, c);
  for (let i = 0; i < r; i++) for (let j = 0; j < c; j++) C[i][j] = A[i][j] + B[i][j];
  return C;
}

function matsub(A: number[][], B: number[][]): number[][] {
  const r = A.length, c = A[0].length;
  const C = zeros(r, c);
  for (let i = 0; i < r; i++) for (let j = 0; j < c; j++) C[i][j] = A[i][j] - B[i][j];
  return C;
}

function matscale(A: number[][], s: number): number[][] {
  const r = A.length, c = A[0].length;
  const C = zeros(r, c);
  for (let i = 0; i < r; i++) for (let j = 0; j < c; j++) C[i][j] = A[i][j] * s;
  return C;
}

function matvec(A: number[][], v: number[]): number[] {
  const r = A.length, c = A[0].length;
  const out = new Array(r).fill(0);
  for (let i = 0; i < r; i++) {
    let s = 0;
    for (let j = 0; j < c; j++) s += A[i][j] * v[j];
    out[i] = s;
  }
  return out;
}

function vecadd(a: number[], b: number[]): number[] {
  return a.map((x, i) => x + b[i]);
}

function vecsub(a: number[], b: number[]): number[] {
  return a.map((x, i) => x - b[i]);
}

function outer(a: number[], b: number[]): number[][] {
  const r = a.length, c = b.length;
  const M = zeros(r, c);
  for (let i = 0; i < r; i++) for (let j = 0; j < c; j++) M[i][j] = a[i] * b[j];
  return M;
}

function cholesky(A: number[][]): number[][] {
  const n = A.length;
  const L = zeros(n, n);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j <= i; j++) {
      let s = A[i][j];
      for (let k = 0; k < j; k++) s -= L[i][k] * L[j][k];
      if (i === j) L[i][j] = Math.sqrt(Math.max(s, 1e-10));
      else L[i][j] = s / L[j][j];
    }
  }
  return L;
}

function transpose(A: number[][]): number[][] {
  const r = A.length, c = A[0].length;
  const T = zeros(c, r);
  for (let i = 0; i < r; i++) for (let j = 0; j < c; j++) T[j][i] = A[i][j];
  return T;
}

function matmul(A: number[][], B: number[][]): number[][] {
  const r = A.length, k = A[0].length, c = B[0].length;
  const C = zeros(r, c);
  for (let i = 0; i < r; i++) for (let j = 0; j < c; j++) {
    let s = 0;
    for (let m = 0; m < k; m++) s += A[i][m] * B[m][j];
    C[i][j] = s;
  }
  return C;
}

// ============================================================================
// UKF predict + update (model-agnostic, works with any state dimension)
// ============================================================================

const ALPHA = 1e-3, BETA = 2, KAPPA = 0;

function computeLambda(L: number): number {
  return ALPHA * ALPHA * (L + KAPPA) - L;
}

function generateSigmaPoints(x: number[], P: number[][], L: number) {
  const lambda = computeLambda(L);
  const scaledP = matscale(P, L + lambda);
  const sqrtP = cholesky(scaledP);
  const points: number[][] = [x.slice()];
  for (let i = 0; i < L; i++) {
    const off = new Array(L).fill(0);
    for (let j = 0; j < L; j++) off[j] = sqrtP[j][i];
    points.push(vecadd(x, off));
  }
  for (let i = 0; i < L; i++) {
    const off = new Array(L).fill(0);
    for (let j = 0; j < L; j++) off[j] = sqrtP[j][i];
    points.push(vecsub(x, off));
  }
  const Wm = new Array(2 * L + 1).fill(0);
  const Wc = new Array(2 * L + 1).fill(0);
  Wm[0] = lambda / (L + lambda);
  Wc[0] = Wm[0] + (1 - ALPHA * ALPHA + BETA);
  const w = 1 / (2 * (L + lambda));
  for (let i = 1; i <= 2 * L; i++) { Wm[i] = w; Wc[i] = w; }
  return { points, Wm, Wc };
}

interface UKFResult {
  x: number[];
  P: number[][];
  z_pred: number[];
  S: number[][];
  likelihood: number;
}

function ukfPredictUpdate(
  state: { x: number[]; P: number[][] },
  z: number[],
  dt: number,
  transition: (x: number[], dt: number) => number[],
  measurement: (x: number[]) => number[],
  Q: number[][],
  R: number[][]
): UKFResult {
  const x = state.x;
  const P = state.P;
  const L = x.length;
  const m = z.length;  // measurement dimension

  // --- Predict ---
  const { points: predPoints, Wm, Wc } = generateSigmaPoints(x, P, L);
  const propPoints = predPoints.map(p => transition(p, dt));
  const x_pred = new Array(L).fill(0);
  for (let i = 0; i < propPoints.length; i++)
    for (let j = 0; j < L; j++) x_pred[j] += Wm[i] * propPoints[i][j];
  const P_pred = zeros(L, L);
  for (let i = 0; i < propPoints.length; i++) {
    const d = vecsub(propPoints[i], x_pred);
    const od = outer(d, d);
    for (let r = 0; r < L; r++) for (let c = 0; c < L; c++) P_pred[r][c] += Wc[i] * od[r][c];
  }
  const P_withQ = matadd(P_pred, Q);

  // --- Update ---
  const { points: updatePoints } = generateSigmaPoints(x_pred, P_withQ, L);
  const propMeas = updatePoints.map(p => measurement(p));
  const z_pred = new Array(m).fill(0);
  for (let i = 0; i < propMeas.length; i++)
    for (let j = 0; j < m; j++) z_pred[j] += Wm[i] * propMeas[i][j];
  const S = zeros(m, m);
  for (let i = 0; i < propMeas.length; i++) {
    const d = vecsub(propMeas[i], z_pred);
    const od = outer(d, d);
    for (let r = 0; r < m; r++) for (let c = 0; c < m; c++) S[r][c] += Wc[i] * od[r][c];
  }
  for (let r = 0; r < m; r++) for (let c = 0; c < m; c++) S[r][c] += R[r][c];
  const Pxz = zeros(L, m);
  for (let i = 0; i < updatePoints.length; i++) {
    const sd = vecsub(updatePoints[i], x_pred);
    const md = vecsub(propMeas[i], z_pred);
    const od = outer(sd, md);
    for (let r = 0; r < L; r++) for (let c = 0; c < m; c++) Pxz[r][c] += Wc[i] * od[r][c];
  }

  // Invert S (2x2 or 3x3)
  let Sinv: number[][];
  if (m === 2) {
    const [[a, b], [c, d]] = S;
    const det = a * d - b * c;
    Sinv = [[d / det, -b / det], [-c / det, a / det]];
  } else if (m === 3) {
    const [[a, b, c], [d, e, f], [g, h, i]] = S;
    const A = e * i - f * h, B = -(d * i - f * g), C = d * h - e * g;
    const det = a * A + b * B + c * C;
    const invDet = 1 / det;
    Sinv = [
      [A * invDet, B * invDet, C * invDet],
      [(-(b * i - c * h)) * invDet, (a * i - c * g) * invDet, (-(a * h - b * g)) * invDet],
      [(b * f - c * e) * invDet, (-(a * f - c * d)) * invDet, (a * e - b * d) * invDet],
    ];
  } else {
    throw new Error(`Measurement dimension ${m} not supported`);
  }

  const K = matmul(Pxz, Sinv);
  const innov = vecsub(z, z_pred);
  const Kinnov = matvec(K, innov);
  const x_new = vecadd(x_pred, Kinnov);
  const KSt = matmul(K, transpose(S));
  const KSKt = matmul(KSt, transpose(K));
  const P_new = matsub(P_withQ, KSKt);

  // Likelihood: Gaussian pdf of innovation
  // L = N(0; z - z_pred, S) = (2π)^(-m/2) |S|^(-1/2) exp(-0.5 * innov^T S^-1 innov)
  let detS = 1;
  for (let i = 0; i < m; i++) detS *= S[i][i];
  const innovSinv = matvec(Sinv, innov);
  let quadForm = 0;
  for (let i = 0; i < m; i++) quadForm += innov[i] * innovSinv[i];
  const logLik = -0.5 * m * Math.log(2 * Math.PI) - 0.5 * Math.log(Math.abs(detS)) - 0.5 * quadForm;
  const likelihood = Math.exp(logLik);

  return { x: x_new, P: P_new, z_pred, S, likelihood };
}

// ============================================================================
// IMM-UKF
// ============================================================================

export class IMMUKF {
  private models: ModelState[];
  private probs: number[];  // model probabilities
  private tpm: number[][];  // transition probability matrix [i][j]
  private refModelIdx: number;  // reference model (for combined output)

  constructor(
    models: ModelState[],
    initialProbs?: number[],
    tpm?: number[][]
  ) {
    this.models = models;
    const n = models.length;

    // Default: equal probabilities
    this.probs = initialProbs || new Array(n).fill(1 / n);

    // Default TPM: high self-transition, low cross-transition
    // p_ii = 0.9, p_ij = 0.1/(n-1) for i≠j
    this.tpm = tpm || this.defaultTPM(n);

    // Reference model: the one with the largest state dimension (CA, 9-state)
    // This is where the combined output lives. Other models' states are
    // projected into this frame for combination.
    this.refModelIdx = models.reduce((maxIdx, m, i, arr) =>
      m.stateDim > arr[maxIdx].stateDim ? i : maxIdx, 0);
  }

  private defaultTPM(n: number): number[][] {
    const tpm = zeros(n, n);
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (i === j) tpm[i][j] = 0.9;
        else tpm[i][j] = 0.1 / (n - 1);
      }
    }
    return tpm;
  }

  /**
   * Run one IMM step:
   *   1. Mixing: compute mixed initial conditions for each model
   *   2. Mode-matched filtering: run UKF for each model
   *   3. Mode probability update: compute likelihood-based probabilities
   *   4. Combination: weighted sum of model estimates
   */
  step(z: number[], dt: number): IMMResult {
    const n = this.models.length;

    // === Step 1: Interaction / Mixing ===
    // Predicted model probabilities (before update)
    const mixedProbs = zeros(n, n);
    const c = new Array(n).fill(0);  // normalization constants
    for (let j = 0; j < n; j++) {
      for (let i = 0; i < n; i++) {
        mixedProbs[i][j] = this.tpm[i][j] * this.probs[i];
        c[j] += mixedProbs[i][j];
      }
    }
    for (let i = 0; i < n; i++)
      for (let j = 0; j < n; j++)
        mixedProbs[i][j] /= c[j];

    // Mixed states and covariances for each model j
    // Note: different models have different state dimensions.
    // For mixing, we project all models into the reference model's frame.
    const refDim = this.models[this.refModelIdx].stateDim;
    const mixedStates: { x: number[]; P: number[][] }[] = [];

    for (let j = 0; j < n; j++) {
      // Weighted sum of model i states projected into ref frame
      const xMixed = new Array(refDim).fill(0);
      for (let i = 0; i < n; i++) {
        const xi = this.projectToRef(this.models[i].x, this.models[i].name);
        for (let k = 0; k < refDim; k++) xMixed[k] += mixedProbs[i][j] * xi[k];
      }

      // Mixed covariance
      let PMixed = zeros(refDim, refDim);
      for (let i = 0; i < n; i++) {
        const xi = this.projectToRef(this.models[i].x, this.models[i].name);
        const Pi = this.projectCovToRef(this.models[i].P, this.models[i].name);
        const diff = vecsub(xi, xMixed);
        PMixed = matadd(PMixed, matscale(matadd(Pi, outer(diff, diff)), mixedProbs[i][j]));
      }
      mixedStates.push({ x: xMixed, P: PMixed });
    }

    // === Step 2: Mode-matched filtering ===
    const filterResults: UKFResult[] = [];
    for (let j = 0; j < n; j++) {
      const model = this.models[j];
      // Use the mixed state (projected back from ref to model j's frame)
      const modelState = this.projectFromRef(mixedStates[j], model.name);
      const Q = model.Q(dt);
      // Ensure R matches measurement dimension (3D for all models)
      const R = model.R;
      const result = ukfPredictUpdate(
        modelState, z, dt,
        model.transition, model.measurement, Q, R
      );
      filterResults.push(result);
    }

    // === Step 3: Model probability update ===
    const likelihoods = filterResults.map(r => Math.max(r.likelihood, 1e-300));
    let totalLik = 0;
    for (let j = 0; j < n; j++) totalLik += c[j] * likelihoods[j];
    const newProbs = new Array(n).fill(0);
    for (let j = 0; j < n; j++) {
      newProbs[j] = (c[j] * likelihoods[j]) / Math.max(totalLik, 1e-300);
    }

    // Update model states and probabilities
    for (let j = 0; j < n; j++) {
      this.models[j].x = filterResults[j].x;
      this.models[j].P = filterResults[j].P;
    }
    this.probs = newProbs;

    // === Step 4: Combination ===
    const refState = mixedStates[this.refModelIdx];
    const xCombined = new Array(refDim).fill(0);
    for (let j = 0; j < n; j++) {
      const xj = this.projectToRef(filterResults[j].x, this.models[j].name);
      for (let k = 0; k < refDim; k++) xCombined[k] += newProbs[j] * xj[k];
    }

    let PCombined = zeros(refDim, refDim);
    for (let j = 0; j < n; j++) {
      const xj = this.projectToRef(filterResults[j].x, this.models[j].name);
      const Pj = this.projectCovToRef(filterResults[j].P, this.models[j].name);
      const diff = vecsub(xj, xCombined);
      PCombined = matadd(PCombined, matscale(matadd(Pj, outer(diff, diff)), newProbs[j]));
    }

    const modelProbs: Record<MotionModel, number> = {} as any;
    for (let j = 0; j < n; j++) {
      modelProbs[this.models[j].name] = newProbs[j];
    }

    return {
      x: xCombined,
      P: PCombined,
      modelProbs,
      models: this.models.map((m, j) => ({
        name: m.name,
        x: filterResults[j].x,
        P: filterResults[j].P,
        likelihood: likelihoods[j],
        prob: newProbs[j],
      })),
    };
  }

  /** Project a state from its native model frame to the reference (CA, 9-state) frame. */
  private projectToRef(x: number[], modelName: MotionModel): number[] {
    // CA is [x, y, z, vx, vy, vz, ax, ay, az]
    // CV is [x, y, z, vx, vy, vz] → pad with zeros for acceleration
    // CT is [x, y, vx, vy, omega, ax, ay] → map to [x, y, 0, vx, vy, 0, ax, ay, 0]
    switch (modelName) {
      case 'CA': return x.slice();
      case 'CV': return [...x, 0, 0, 0];  // pad with zero acceleration
      case 'CT': return [x[0], x[1], 0, x[2], x[3], 0, x[5], x[6], 0];
      default: return x.slice();
    }
  }

  /** Project covariance from native to reference frame. */
  private projectCovToRef(P: number[][], modelName: MotionModel): number[][] {
    const refDim = 9;
    const Pp = zeros(refDim, refDim);
    const mapping = this.getStateMapping(modelName);
    for (let i = 0; i < mapping.length; i++) {
      for (let j = 0; j < mapping.length; j++) {
        Pp[mapping[i]][mapping[j]] = P[i][j];
      }
    }
    return Pp;
  }

  /** Project a mixed state from reference frame back to model j's native frame. */
  private projectFromRef(state: { x: number[]; P: number[][] }, modelName: MotionModel): { x: number[]; P: number[][] } {
    const mapping = this.getStateMapping(modelName);
    const dim = mapping.length;
    const x = new Array(dim).fill(0);
    const P = zeros(dim, dim);
    for (let i = 0; i < dim; i++) {
      x[i] = state.x[mapping[i]];
      for (let j = 0; j < dim; j++) {
        P[i][j] = state.P[mapping[i]][mapping[j]];
      }
    }
    return { x, P };
  }

  private getStateMapping(modelName: MotionModel): number[] {
    // Maps model state indices → reference (CA, 9-state) indices
    // CA: [0,1,2,3,4,5,6,7,8] (identity)
    // CV: [0,1,2,3,4,5] (first 6 of CA)
    // CT: [0,1,3,4,_,7,8] → [0,1,3,4,7,8] but CT has omega...
    // CT state: [x, y, vx, vy, omega, ax, ay] → CA indices: [0,1,3,4,-,7,8]
    // omega doesn't exist in CA — we drop it for mixing
    switch (modelName) {
      case 'CA': return [0, 1, 2, 3, 4, 5, 6, 7, 8];
      case 'CV': return [0, 1, 2, 3, 4, 5];
      case 'CT': return [0, 1, 3, 4, 7, 8];  // drop omega (no CA equivalent)
      default: return [0, 1, 2, 3, 4, 5, 6, 7, 8];
    }
  }

  /** Get current model probabilities. */
  getProbs(): Record<MotionModel, number> {
    const probs: Record<MotionModel, number> = {} as any;
    for (let j = 0; j < this.models.length; j++) {
      probs[this.models[j].name] = this.probs[j];
    }
    return probs;
  }

  /** Initialize model states. */
  initStates() {
    for (const model of this.models) {
      const s = model.initialState();
      model.x = s.x;
      model.P = s.P;
    }
  }
}

// ============================================================================
// Factory: create a standard 3-model IMM (CV + CA + CT)
// ============================================================================

export function createStandardIMM(): IMMUKF {
  const models: ModelState[] = [
    {
      name: 'CV',
      x: new Array(CV_DIM).fill(0),
      P: matscale(identity(CV_DIM), 10.0),
      transition: cvTransition,
      measurement: cvMeasurement,
      Q: cvDefaultQ,
      R: cvDefaultR(),
      initialState: cvInitialState,
      stateDim: CV_DIM,
    },
    {
      name: 'CA',
      x: new Array(9).fill(0),
      P: matscale(identity(9), 10.0),
      transition: caTransition,
      measurement: caMeasurement,
      Q: caDefaultQ,
      R: caDefaultR(),
      initialState: () => ({ x: new Array(9).fill(0), P: matscale(identity(9), 10.0) }),
      stateDim: 9,
    },
    {
      name: 'CT',
      x: new Array(CT_DIM).fill(0),
      P: matscale(identity(CT_DIM), 10.0),
      transition: ctTransition,
      measurement: ctMeasurement,
      Q: ctDefaultQ,
      R: ctDefaultR(),
      initialState: ctInitialState,
      stateDim: CT_DIM,
    },
  ];

  // Transition probability matrix:
  // High self-transition (0.9), low cross (0.05 each)
  // CT→CT has higher self (0.95) because turns are persistent
  const tpm = [
    [0.90, 0.07, 0.03],  // CV → CV/CA/CT
    [0.05, 0.90, 0.05],  // CA → CV/CA/CT
    [0.03, 0.07, 0.90],  // CT → CV/CA/CT
  ];

  const imm = new IMMUKF(models, [0.33, 0.34, 0.33], tpm);
  imm.initStates();
  return imm;
}
