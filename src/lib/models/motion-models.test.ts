/**
 * Tests for Motion Models (CV, CA, CT)
 */

import {
  cvTransition, cvMeasurement, cvDefaultQ,
  caTransition, caMeasurement, caDefaultQ,
  ctTransition, ctMeasurement, ctDefaultQ, ctDefaultR,
  cvInitialState, ctInitialState,
  motionModels,
  CV_DIM, CA_DIM, CT_DIM,
} from './motion-models';

describe('Motion Models', () => {
  test('all three models registered', () => {
    expect(motionModels.CV).toBeDefined();
    expect(motionModels.CA).toBeDefined();
    expect(motionModels.CT).toBeDefined();
  });

  test('state dimensions correct', () => {
    expect(CV_DIM).toBe(6);
    expect(CA_DIM).toBe(9);
    expect(CT_DIM).toBe(7);
  });
});

describe('Constant Velocity (CV) model', () => {
  test('straight-line motion: position = v*dt', () => {
    const x = [0, 0, 0, 1, 0, 0];  // moving in +x at 1 m/s
    const x1 = cvTransition(x, 1.0);
    expect(x1[0]).toBeCloseTo(1.0, 6);  // x = 0 + 1*1
    expect(x1[3]).toBeCloseTo(1.0, 6);  // vx unchanged
  });

  test('velocity preserved across steps', () => {
    let x = [0, 0, 0, 2, 3, 0];
    for (let i = 0; i < 10; i++) {
      x = cvTransition(x, 0.1);
    }
    expect(x[3]).toBeCloseTo(2.0, 6);  // vx still 2
    expect(x[4]).toBeCloseTo(3.0, 6);  // vy still 3
    expect(x[0]).toBeCloseTo(2.0, 6);  // x = 0 + 2*1.0
    expect(x[1]).toBeCloseTo(3.0, 6);  // y = 0 + 3*1.0
  });

  test('measurement returns first 3 components', () => {
    const z = cvMeasurement([5, 6, 7, 8, 9, 10]);
    expect(z).toEqual([5, 6, 7]);
  });

  test('process noise is 6×6 diagonal', () => {
    const Q = cvDefaultQ(0.1);
    expect(Q.length).toBe(6);
    expect(Q[0].length).toBe(6);
    expect(Q[0][0]).toBeGreaterThan(0);
    expect(Q[3][3]).toBeGreaterThan(0);
  });
});

describe('Constant Acceleration (CA) model', () => {
  test('constant velocity with zero acceleration', () => {
    const x = [0, 0, 0, 1, 0, 0, 0, 0, 0];
    const x1 = caTransition(x, 1.0);
    expect(x1[0]).toBeCloseTo(1.0, 6);  // x + v*dt = 1
    expect(x1[3]).toBeCloseTo(1.0, 6);  // v unchanged
  });

  test('constant acceleration adds 0.5*a*dt² to position', () => {
    const x = [0, 0, 0, 0, 0, 0, 2, 0, 0];  // a = 2 m/s²
    const x1 = caTransition(x, 1.0);
    expect(x1[0]).toBeCloseTo(1.0, 6);   // 0.5 * 2 * 1² = 1
    expect(x1[3]).toBeCloseTo(2.0, 6);   // 0 + 2*1 = 2
    expect(x1[6]).toBeCloseTo(2.0, 6);   // acceleration unchanged
  });

  test('measurement returns first 3 components', () => {
    const z = caMeasurement([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    expect(z).toEqual([1, 2, 3]);
  });
});

describe('Coordinated Turn (CT) model', () => {
  test('straight-line motion when omega = 0', () => {
    // No turn rate → should behave like CV in 2D
    const x = [0, 0, 1, 0, 0, 0, 0];  // vx=1, omega=0
    const x1 = ctTransition(x, 1.0);
    expect(x1[0]).toBeCloseTo(1.0, 6);  // x = 0 + vx*dt = 1
    expect(x1[1]).toBeCloseTo(0.0, 6);  // y unchanged (vy=0)
    expect(x1[2]).toBeCloseTo(1.0, 6);  // vx preserved (omega=0, cos(0)=1)
    expect(x1[3]).toBeCloseTo(0.0, 6);  // vy preserved (sin(0)=0)
  });

  test('turning motion rotates velocity', () => {
    // omega = π/2 rad/s → 90° turn per second
    const omega = Math.PI / 2;
    const x = [0, 0, 1, 0, omega, 0, 0];  // vx=1, turn rate = 90°/s
    const x1 = ctTransition(x, 1.0);
    // After 1 second at 90°/s, velocity should rotate from (1,0) to (0,1)
    expect(x1[2]).toBeCloseTo(0.0, 6);  // vx → 0 (cos(90°) = 0)
    expect(x1[3]).toBeCloseTo(1.0, 6);  // vy → 1 (sin(90°) = 1)
  });

  test('full circle returns to start (approximately)', () => {
    // omega = 2π/T, with T=4s → 90° per second, full circle in 4s
    const omega = Math.PI / 2;  // 90° per second
    let x = [0, 0, 1, 0, omega, 0, 0];
    const dt = 0.01;
    for (let i = 0; i < 400; i++) {  // 4 seconds
      x = ctTransition(x, dt);
    }
    // After full circle, position should be near start
    expect(Math.abs(x[0])).toBeLessThan(0.5);  // x near 0
    expect(Math.abs(x[1])).toBeLessThan(0.5);  // y near 0
  });

  test('measurement returns 3D position (z=0 for xy-plane)', () => {
    const z = ctMeasurement([3, 4, 1, 0, 0.5, 0, 0]);
    expect(z).toEqual([3, 4, 0]);
  });

  test('process noise is 7×7 diagonal', () => {
    const Q = ctDefaultQ(0.1);
    expect(Q.length).toBe(7);
    expect(Q[0].length).toBe(7);
    expect(Q[4][4]).toBeGreaterThan(0);  // omega noise
  });

  test('measurement noise R is 3×3 (3D for IMM compatibility)', () => {
    const R = ctDefaultR();
    expect(R.length).toBe(3);
    expect(R[0].length).toBe(3);
    expect(R[0][0]).toBe(1.0);
    expect(R[1][1]).toBe(1.0);
    expect(R[2][2]).toBe(1.0);
  });
});

describe('Initial states', () => {
  test('CV initial state has 6 components', () => {
    const s = cvInitialState();
    expect(s.x.length).toBe(6);
    expect(s.P.length).toBe(6);
  });

  test('CT initial state has 7 components', () => {
    const s = ctInitialState();
    expect(s.x.length).toBe(7);
    expect(s.P.length).toBe(7);
  });
});
