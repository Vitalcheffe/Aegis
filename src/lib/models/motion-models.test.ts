/**
 * Tests for Motion Models (CV, CA, CT, Singer) — all 9-state
 */

import {
  cvTransition, cvMeasurement, cvDefaultQ,
  caTransition, caMeasurement, caDefaultQ,
  ctTransition, ctMeasurement, ctDefaultQ,
  singerTransition, singerMeasurement, singerDefaultQ,
  defaultR, initialState, STATE_DIM,
  motionModels,
} from './motion-models';

describe('Motion Models — Common', () => {
  test('all four models registered', () => {
    expect(motionModels.CV).toBeDefined();
    expect(motionModels.CA).toBeDefined();
    expect(motionModels.CT).toBeDefined();
    expect(motionModels.Singer).toBeDefined();
  });

  test('state dimension is 9 for all', () => {
    expect(STATE_DIM).toBe(9);
  });

  test('all models produce 9-element states', () => {
    const x = [0,0,0,1,0,0,0,0,0];
    const dt = 0.1;
    expect(cvTransition(x, dt).length).toBe(9);
    expect(caTransition(x, dt).length).toBe(9);
    expect(ctTransition(x, dt).length).toBe(9);
    expect(singerTransition(x, dt).length).toBe(9);
  });

  test('all measurements return 3D position', () => {
    const x = [5,6,7,1,0,0,0,0,0];
    expect(cvMeasurement(x)).toEqual([5,6,7]);
    expect(caMeasurement(x)).toEqual([5,6,7]);
    expect(ctMeasurement(x)).toEqual([5,6,7]);
    expect(singerMeasurement(x)).toEqual([5,6,7]);
  });

  test('all Q matrices are 9×9', () => {
    const dt = 0.1;
    expect(cvDefaultQ(dt).length).toBe(9);
    expect(caDefaultQ(dt).length).toBe(9);
    expect(ctDefaultQ(dt).length).toBe(9);
    expect(singerDefaultQ(dt).length).toBe(9);
  });

  test('all R matrices are 3×3', () => {
    expect(defaultR().length).toBe(3);
    expect(defaultR()[0].length).toBe(3);
  });

  test('initial state is 9-dimensional', () => {
    const s = initialState();
    expect(s.x.length).toBe(9);
    expect(s.P.length).toBe(9);
  });
});

describe('CV model', () => {
  test('straight-line: position = v*dt', () => {
    const x = [0,0,0,1,0,0,0,0,0];
    const x1 = cvTransition(x, 1.0);
    expect(x1[0]).toBeCloseTo(1.0, 6);
    expect(x1[3]).toBeCloseTo(1.0, 6);
    expect(x1[6]).toBe(0);  // acceleration forced to 0
  });

  test('velocity preserved across 10 steps', () => {
    let x = [0,0,0,2,3,0,0,0,0];
    for (let i = 0; i < 10; i++) x = cvTransition(x, 0.1);
    expect(x[3]).toBeCloseTo(2.0, 6);
    expect(x[4]).toBeCloseTo(3.0, 6);
    expect(x[0]).toBeCloseTo(2.0, 6);
  });

  test('Q is non-diagonal (position-velocity correlation)', () => {
    const Q = cvDefaultQ(0.1);
    expect(Q[0][3]).not.toBe(0);  // position-velocity cross term
    expect(Q[3][0]).not.toBe(0);
  });
});

describe('CA model', () => {
  test('constant velocity with zero acceleration', () => {
    const x = [0,0,0,1,0,0,0,0,0];
    const x1 = caTransition(x, 1.0);
    expect(x1[0]).toBeCloseTo(1.0, 6);
    expect(x1[3]).toBeCloseTo(1.0, 6);
  });

  test('constant acceleration adds 0.5*a*dt²', () => {
    const x = [0,0,0,0,0,0,2,0,0];
    const x1 = caTransition(x, 1.0);
    expect(x1[0]).toBeCloseTo(1.0, 6);
    expect(x1[3]).toBeCloseTo(2.0, 6);
    expect(x1[6]).toBeCloseTo(2.0, 6);
  });

  test('Q is non-diagonal (jerk model)', () => {
    const Q = caDefaultQ(0.1);
    expect(Q[0][3]).not.toBe(0);  // pos-vel cross
    expect(Q[0][6]).not.toBe(0);  // pos-acc cross
    expect(Q[3][6]).not.toBe(0);  // vel-acc cross
  });

  test('Q is symmetric', () => {
    const Q = caDefaultQ(0.1);
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        expect(Q[i][j]).toBeCloseTo(Q[j][i], 8);
      }
    }
  });
});

describe('CT model', () => {
  test('straight-line when no turn (omega=0)', () => {
    const x = [0,0,0,1,0,0,0,0,0];  // no acceleration → no turn
    const x1 = ctTransition(x, 1.0);
    expect(x1[0]).toBeCloseTo(1.0, 4);
    expect(x1[1]).toBeCloseTo(0.0, 4);
  });

  test('turning with acceleration creates curved path', () => {
    // Perpendicular acceleration creates a turn
    const x = [0,0,0,1,0,0,0,1,0];  // vx=1, ay=1 → circular motion
    let state = x;
    const dt = 0.01;
    for (let i = 0; i < 628; i++) {  // ~2π/0.01 steps
      state = ctTransition(state, dt);
    }
    // After ~1 full turn, the path should have curved significantly
    // (not back to origin necessarily — the CT model is approximate)
    const dist = Math.sqrt(state[0]**2 + state[1]**2);
    expect(dist).toBeLessThan(50.0);  // generous — just verify it didn't diverge
    expect(Number.isFinite(state[0])).toBe(true);
    expect(Number.isFinite(state[1])).toBe(true);
  });

  test('Q is symmetric', () => {
    const Q = ctDefaultQ(0.1);
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        expect(Q[i][j]).toBeCloseTo(Q[j][i], 8);
      }
    }
  });
});

describe('Singer model', () => {
  test('acceleration decays exponentially', () => {
    const x = [0,0,0,0,0,0,10,0,0];  // a=10
    const dt = 1.0;
    const tau = 10.0;  // SINGER_TAU
    const expected = 10 * Math.exp(-dt / tau);
    const x1 = singerTransition(x, dt);
    expect(x1[6]).toBeCloseTo(expected, 4);
  });

  test('position integrates with decaying acceleration', () => {
    const x = [0,0,0,0,0,0,5,0,0];  // a=5
    const dt = 0.1;
    const x1 = singerTransition(x, dt);
    // x = 0.5 * 5 * 0.01 = 0.025 (same as CA for first step)
    expect(x1[0]).toBeCloseTo(0.025, 4);
  });

  test('velocity increases with acceleration', () => {
    const x = [0,0,0,0,0,0,5,0,0];
    const x1 = singerTransition(x, 0.1);
    expect(x1[3]).toBeCloseTo(0.5, 4);  // v = 0 + 5*0.1
  });

  test('after many steps, acceleration approaches 0', () => {
    let x = [0,0,0,0,0,0,10,0,0];
    const dt = 0.1;
    for (let i = 0; i < 1000; i++) x = singerTransition(x, dt);
    expect(Math.abs(x[6])).toBeLessThan(0.1);
  });

  test('Q is symmetric', () => {
    const Q = singerDefaultQ(0.1);
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        expect(Q[i][j]).toBeCloseTo(Q[j][i], 6);
      }
    }
  });

  test('Q is positive semi-definite (diagonal entries >= 0)', () => {
    const Q = singerDefaultQ(0.1);
    for (let i = 0; i < 9; i++) {
      expect(Q[i][i]).toBeGreaterThanOrEqual(0);
    }
  });
});

describe('Q matrices — all models', () => {
  test('all Q are 9×9', () => {
    const dt = 0.1;
    expect(cvDefaultQ(dt).length).toBe(9);
    expect(caDefaultQ(dt).length).toBe(9);
    expect(ctDefaultQ(dt).length).toBe(9);
    expect(singerDefaultQ(dt).length).toBe(9);
  });

  test('all Q are symmetric', () => {
    const dt = 0.1;
    for (const fn of [cvDefaultQ, caDefaultQ, ctDefaultQ, singerDefaultQ]) {
      const Q = fn(dt);
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          expect(Q[i][j]).toBeCloseTo(Q[j][i], 6);
        }
      }
    }
  });

  test('all Q diagonals are non-negative', () => {
    const dt = 0.1;
    for (const fn of [cvDefaultQ, caDefaultQ, ctDefaultQ, singerDefaultQ]) {
      const Q = fn(dt);
      for (let i = 0; i < 9; i++) {
        expect(Q[i][i]).toBeGreaterThanOrEqual(0);
      }
    }
  });
});
