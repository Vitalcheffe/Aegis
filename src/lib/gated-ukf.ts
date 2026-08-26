// Gated UKF — outlier rejection wrapper

import { ukfPredict, ukfUpdate, State, generateSigmaPoints, UKF_CONFIG } from './ukf';
import { gateMeasurement } from './chi-square-gate';

export interface GatedUKFResult {
  state: State;
  accepted: boolean;
  nis: number;       // normalized innovation squared
  threshold: number; // chi² threshold
  rejectedCount: number;  // cumulative rejected measurements
}

export function gatedUKFStep(
  state: State,
  z: number[],
  dt: number,
  Q: number[][],
  R: number[][]
): GatedUKFResult {
  // Predict step (always runs)
  const predicted = ukfPredict(state, dt, Q);
  
  // Generate sigma points from predicted state to compute z_pred and S
  const { points, Wm, Wc } = generateSigmaPoints(predicted.x, predicted.P);
  
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
  const S: number[][] = Array.from({length: m}, () => new Array(m).fill(0));
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
  const gate = gateMeasurement(innov, S);
  
  if (gate.accepted) {
    // Normal update
    const updated = ukfUpdate(predicted, z, R);
    return {
      state: updated,
      accepted: true,
      nis: gate.nis,
      threshold: gate.threshold,
      rejectedCount: 0,
    };
  } else {
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

// Run gated UKF for multiple steps, tracking total rejected measurements.
export function runGatedUKF(
  initialState: State,
  measurements: number[][],
  dt: number,
  Q: number[][],
  R: number[][]
): { finalState: State; rejected: number; accepted: number; nisHistory: number[] } {
  let state = initialState;
  let rejected = 0;
  let accepted = 0;
  const nisHistory: number[] = [];
  
  for (const z of measurements) {
    const result = gatedUKFStep(state, z, dt, Q, R);
    state = result.state;
    nisHistory.push(result.nis);
    if (result.accepted) {
      accepted++;
    } else {
      rejected++;
    }
  }
  
  return { finalState: state, rejected, accepted, nisHistory };
}
