import { createStandardIMM } from './imm-ukf';

describe('IMM-UKF (4 models: CV, CA, CT, Singer)', () => {
  test('creates 4 models', () => {
    const imm = createStandardIMM();
    const probs = imm.getProbs();
    expect(Object.keys(probs).length).toBe(4);
    expect(probs.CV).toBeDefined();
    expect(probs.CA).toBeDefined();
    expect(probs.CT).toBeDefined();
    expect(probs.Singer).toBeDefined();
  });

  test('initial probabilities sum to 1', () => {
    const imm = createStandardIMM();
    const probs = imm.getProbs();
    const sum = probs.CV + probs.CA + probs.CT + probs.Singer;
    expect(sum).toBeCloseTo(1.0, 6);
  });

  test('probabilities sum to 1 after 50 steps (straight line)', () => {
    const imm = createStandardIMM();
    const dt = 0.1;
    for (let s = 0; s < 50; s++) imm.step([s*dt, 0, 0], dt);
    const probs = imm.getProbs();
    const sum = probs.CV + probs.CA + probs.CT + probs.Singer;
    expect(sum).toBeCloseTo(1.0, 4);
  });

  test('combined state has finite values after 50 steps', () => {
    const imm = createStandardIMM();
    const dt = 0.1;
    let result;
    for (let s = 0; s < 50; s++) result = imm.step([s*dt, 0, 0], dt);
    expect(result.x.every(v => Number.isFinite(v))).toBe(true);
    expect(result.P.every(r => r.every(v => Number.isFinite(v)))).toBe(true);
  });

  test('probabilities remain non-negative', () => {
    const imm = createStandardIMM();
    const dt = 0.1;
    for (let s = 0; s < 50; s++) imm.step([s*dt, 0, 0], dt);
    const probs = imm.getProbs();
    Object.values(probs).forEach(p => expect(p).toBeGreaterThanOrEqual(0));
  });

  test('runs without throwing on turning trajectory', () => {
    const imm = createStandardIMM();
    const dt = 0.1;
    let result;
    for (let s = 0; s < 100; s++) {
      const t = s * dt;
      const z = [5*Math.cos(0.5*t), 5*Math.sin(0.5*t), 0];
      result = imm.step(z, dt);
    }
    expect(result).toBeDefined();
    expect(result.x.every(v => Number.isFinite(v))).toBe(true);
  });

  test('IMM beats CA-only on turning trajectory', () => {
    // Run both IMM and CA-only UKF on a circular trajectory
    const dt = 0.1;
    const steps = 200;
    const sigma = 1.0;

    // IMM
    const imm = createStandardIMM();
    const immErrors: number[] = [];

    // CA-only (using the UKF from ukf.ts)
    const { ukfStep, initialState, defaultProcessNoise, defaultMeasurementNoise } = require('./ukf');
    let caState = initialState();
    const caQ = defaultProcessNoise(dt);
    const caR = defaultMeasurementNoise();

    const caErrors: number[] = [];

    for (let s = 0; s < steps; s++) {
      const t = s * dt;
      const trueX = 5*Math.cos(0.5*t);
      const trueY = 5*Math.sin(0.5*t);
      const trueZ = 0;
      const z = [trueX + (Math.random()-0.5)*2*sigma, trueY + (Math.random()-0.5)*2*sigma, trueZ + (Math.random()-0.5)*2*sigma];

      // IMM step
      const immResult = imm.step(z, dt);
      if (s >= 50) {
        const err = Math.sqrt((immResult.x[0]-trueX)**2 + (immResult.x[1]-trueY)**2 + (immResult.x[2]-trueZ)**2);
        immErrors.push(err);
      }

      // CA-only step
      caState = ukfStep(caState, z, dt, caQ, caR);
      if (s >= 50) {
        const err = Math.sqrt((caState.x[0]-trueX)**2 + (caState.x[1]-trueY)**2 + (caState.x[2]-trueZ)**2);
        caErrors.push(err);
      }
    }

    const immRMSE = Math.sqrt(immErrors.reduce((s,e)=>s+e*e,0)/immErrors.length);
    const caRMSE = Math.sqrt(caErrors.reduce((s,e)=>s+e*e,0)/caErrors.length);
    console.log(`IMM RMSE: ${immRMSE.toFixed(3)}m, CA RMSE: ${caRMSE.toFixed(3)}m`);
    expect(immRMSE).toBeLessThan(caRMSE);
  });
});
