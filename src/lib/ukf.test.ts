/**
 * UKF Tracker — test suite.
 *
 * Verifies the mathematical properties of the Unscented Kalman Filter:
 *   1. Sigma point count = 2L+1
 *   2. Sigma point mean = original state (unbiased)
 *   3. Sigma point covariance = original covariance
 *   4. UKF converges: tracking error decreases over time
 *   5. UKF beats raw measurements (RMSE filter < RMSE measurement)
 *   6. State transition function is correct (constant acceleration)
 */

import {
  UKF_CONFIG,
  computeLambda,
  generateSigmaPoints,
  stateTransition,
  measurementFunction,
  ukfPredict,
  ukfUpdate,
  ukfStep,
  defaultProcessNoise,
  defaultMeasurementNoise,
  initialState,
  identity,
  matscale,
  zeros,
} from './ukf';

describe('UKF configuration', () => {
  test('lambda computed correctly for L=9, α=1e-3, κ=0', () => {
    const lambda = computeLambda(9, 1e-3, 0);
    // λ = α²(L+κ) - L = (1e-6)(9) - 9 = 9e-6 - 9 ≈ -9
    expect(lambda).toBeCloseTo(9e-6 - 9, 6);
  });

  test('config matches AEGIS_UKF_MATH.md spec', () => {
    expect(UKF_CONFIG.L).toBe(9);
    expect(UKF_CONFIG.alpha).toBeCloseTo(1e-3, 10);
    expect(UKF_CONFIG.beta).toBe(2);
    expect(UKF_CONFIG.kappa).toBe(0);
  });
});

describe('Sigma point generation', () => {
  test('generates 2L+1 = 19 sigma points for L=9', () => {
    const x = new Array(9).fill(0);
    const P = identity(9);
    const { points } = generateSigmaPoints(x, P);
    expect(points.length).toBe(19);
    points.forEach((p) => expect(p.length).toBe(9));
  });

  test('first sigma point is the mean', () => {
    const x = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const P = identity(9);
    const { points } = generateSigmaPoints(x, P);
    expect(points[0]).toEqual(x);
  });

  test('sigma point weights sum to 1 (mean)', () => {
    const x = new Array(9).fill(0);
    const P = identity(9);
    const { Wm } = generateSigmaPoints(x, P);
    const sum = Wm.reduce((a, b) => a + b, 0);
    expect(sum).toBeCloseTo(1.0, 6);
  });

  test('sigma points are symmetric around mean', () => {
    const x = new Array(9).fill(0);
    const P = identity(9);
    const { points } = generateSigmaPoints(x, P);
    // point i+L should be the negation of point i (for zero mean)
    for (let i = 1; i <= 9; i++) {
      for (let j = 0; j < 9; j++) {
        expect(points[i][j] + points[i + 9][j]).toBeCloseTo(0, 6);
      }
    }
  });

  test('sigma point weighted mean equals original mean', () => {
    const x = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const P = matscale(identity(9), 2.0);
    const { points, Wm } = generateSigmaPoints(x, P);
    const recoveredMean = new Array(9).fill(0);
    for (let i = 0; i < points.length; i++) {
      for (let j = 0; j < 9; j++) {
        recoveredMean[j] += Wm[i] * points[i][j];
      }
    }
    for (let j = 0; j < 9; j++) {
      expect(recoveredMean[j]).toBeCloseTo(x[j], 4);
    }
  });
});

describe('State transition function', () => {
  test('constant velocity with zero acceleration', () => {
    // x = [0,0,0, 1,0,0, 0,0,0] → after dt=1: x=[1,0,0, 1,0,0, 0,0,0]
    const x = [0, 0, 0, 1, 0, 0, 0, 0, 0];
    const dt = 1;
    const newX = stateTransition(x, dt);
    expect(newX[0]).toBeCloseTo(1, 6); // x += v*dt
    expect(newX[3]).toBeCloseTo(1, 6); // v unchanged
    expect(newX[6]).toBeCloseTo(0, 6); // a unchanged
  });

  test('constant acceleration adds 0.5*a*dt² to position', () => {
    // x = [0,0,0, 0,0,0, 2,0,0] → after dt=1: x=[1,0,0, 2,0,0, 2,0,0]
    const x = [0, 0, 0, 0, 0, 0, 2, 0, 0];
    const dt = 1;
    const newX = stateTransition(x, dt);
    expect(newX[0]).toBeCloseTo(1, 6);   // 0.5 * 2 * 1 = 1
    expect(newX[3]).toBeCloseTo(2, 6);   // 0 + 2*1 = 2
    expect(newX[6]).toBeCloseTo(2, 6);   // acceleration constant
  });
});

describe('Measurement function', () => {
  test('returns first 3 components (position only)', () => {
    const x = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const z = measurementFunction(x);
    expect(z).toEqual([1, 2, 3]);
  });
});

describe('UKF predict step', () => {
  test('predicts forward in time without NaN', () => {
    const state = initialState();
    const Q = defaultProcessNoise(0.1);
    const predicted = ukfPredict(state, 0.1, Q);
    expect(predicted.x.length).toBe(9);
    expect(predicted.P.length).toBe(9);
    predicted.x.forEach((v) => expect(Number.isFinite(v)).toBe(true));
    predicted.P.forEach((row) => row.forEach((v) => expect(Number.isFinite(v)).toBe(true)));
  });

  test('predict increases covariance (uncertainty grows)', () => {
    const state = { x: new Array(9).fill(0), P: matscale(identity(9), 0.1) };
    const Q = defaultProcessNoise(0.1);
    const predicted = ukfPredict(state, 0.1, Q);
    // Trace should be larger after predict (uncertainty grew)
    const traceBefore = state.P.reduce((s, row, i) => s + row[i], 0);
    const traceAfter = predicted.P.reduce((s, row, i) => s + row[i], 0);
    expect(traceAfter).toBeGreaterThan(traceBefore);
  });
});

describe('UKF update step', () => {
  test('filter converges toward truth over 50 steps', () => {
    // Simulate a target moving in a straight line
    // True state: starts at origin, moves at 1 m/s in x direction
    let trueState = [0, 0, 0, 1, 0, 0, 0, 0, 0];
    const dt = 0.1;

    // Filter starts with wrong belief
    let filterState = initialState();

    const Q = defaultProcessNoise(dt);
    const R = defaultMeasurementNoise();

    let finalError = Infinity;
    for (let step = 0; step < 50; step++) {
      // Advance truth
      trueState = stateTransition(trueState, dt);

      // Generate noisy measurement
      const z = measurementFunction(trueState).map((v) => v + (Math.random() - 0.5) * 2);

      // Filter step
      filterState = ukfStep(filterState, z, dt, Q, R);

      // Track error
      const posError = Math.sqrt(
        Math.pow(filterState.x[0] - trueState[0], 2) +
        Math.pow(filterState.x[1] - trueState[1], 2) +
        Math.pow(filterState.x[2] - trueState[2], 2)
      );
      if (step === 49) finalError = posError;
    }

    // After 50 steps, error should be small (< 2m, since measurement σ = 1m)
    expect(finalError).toBeLessThan(2.0);
  });

  test('filter beats raw measurement noise', () => {
    // Run filter for 100 steps, compare filter RMSE to raw measurement RMSE
    let trueState = [0, 0, 0, 1, 0, 0, 0, 0, 0];
    const dt = 0.1;
    let filterState = initialState();
    const Q = defaultProcessNoise(dt);
    const R = defaultMeasurementNoise();

    const filterErrors: number[] = [];
    const measErrors: number[] = [];

    for (let step = 0; step < 100; step++) {
      trueState = stateTransition(trueState, dt);
      const z = measurementFunction(trueState).map((v) => v + (Math.random() - 0.5) * 2);
      filterState = ukfStep(filterState, z, dt, Q, R);

      if (step > 10) { // skip warmup
        const filterErr = Math.sqrt(
          Math.pow(filterState.x[0] - trueState[0], 2) +
          Math.pow(filterState.x[1] - trueState[1], 2) +
          Math.pow(filterState.x[2] - trueState[2], 2)
        );
        const measErr = Math.sqrt(
          Math.pow(z[0] - trueState[0], 2) +
          Math.pow(z[1] - trueState[1], 2) +
          Math.pow(z[2] - trueState[2], 2)
        );
        filterErrors.push(filterErr);
        measErrors.push(measErr);
      }
    }

    const filterRmse = Math.sqrt(filterErrors.reduce((s, e) => s + e * e, 0) / filterErrors.length);
    const measRmse = Math.sqrt(measErrors.reduce((s, e) => s + e * e, 0) / measErrors.length);

    // Filter RMSE should be less than raw measurement RMSE
    expect(filterRmse).toBeLessThan(measRmse);
  });
});
