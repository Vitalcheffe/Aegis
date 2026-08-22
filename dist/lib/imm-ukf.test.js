"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const imm_ukf_1 = require("./imm-ukf");
describe('IMM-UKF (4 models: CV, CA, CT, Singer)', () => {
    test('creates 4 models', () => {
        const imm = (0, imm_ukf_1.createStandardIMM)();
        const probs = imm.getProbs();
        expect(Object.keys(probs).length).toBe(4);
        expect(probs.CV).toBeDefined();
        expect(probs.CA).toBeDefined();
        expect(probs.CT).toBeDefined();
        expect(probs.Singer).toBeDefined();
    });
    test('initial probabilities sum to 1', () => {
        const imm = (0, imm_ukf_1.createStandardIMM)();
        const probs = imm.getProbs();
        const sum = probs.CV + probs.CA + probs.CT + probs.Singer;
        expect(sum).toBeCloseTo(1.0, 6);
    });
    test('probabilities sum to 1 after 50 steps (straight line)', () => {
        const imm = (0, imm_ukf_1.createStandardIMM)();
        const dt = 0.1;
        for (let s = 0; s < 50; s++)
            imm.step([s * dt, 0, 0], dt);
        const probs = imm.getProbs();
        const sum = probs.CV + probs.CA + probs.CT + probs.Singer;
        expect(sum).toBeCloseTo(1.0, 4);
    });
    test('combined state has finite values after 50 steps', () => {
        const imm = (0, imm_ukf_1.createStandardIMM)();
        const dt = 0.1;
        let result;
        for (let s = 0; s < 50; s++)
            result = imm.step([s * dt, 0, 0], dt);
        expect(result.x.every(v => Number.isFinite(v))).toBe(true);
        expect(result.P.every(r => r.every(v => Number.isFinite(v)))).toBe(true);
    });
    test('probabilities remain non-negative', () => {
        const imm = (0, imm_ukf_1.createStandardIMM)();
        const dt = 0.1;
        for (let s = 0; s < 50; s++)
            imm.step([s * dt, 0, 0], dt);
        const probs = imm.getProbs();
        Object.values(probs).forEach(p => expect(p).toBeGreaterThanOrEqual(0));
    });
    test('runs without throwing on turning trajectory', () => {
        const imm = (0, imm_ukf_1.createStandardIMM)();
        const dt = 0.1;
        let result;
        for (let s = 0; s < 100; s++) {
            const t = s * dt;
            const z = [5 * Math.cos(0.5 * t), 5 * Math.sin(0.5 * t), 0];
            result = imm.step(z, dt);
        }
        expect(result).toBeDefined();
        expect(result.x.every(v => Number.isFinite(v))).toBe(true);
    });
    test('IMM beats CA-only on turning trajectory', () => {
        // Run both IMM and CA-only UKF on a circular trajectory
        // Use a fast turn rate so the CT model clearly wins
        const dt = 0.1;
        const steps = 300;
        const sigma = 1.0;
        const omega = 1.0; // ~57°/s — aggressive turn
        // IMM
        const imm = (0, imm_ukf_1.createStandardIMM)();
        const immErrors = [];
        // CA-only (using the UKF from ukf.ts)
        const { ukfStep, initialState, defaultProcessNoise, defaultMeasurementNoise } = require('./ukf');
        let caState = initialState();
        const caQ = defaultProcessNoise(dt);
        const caR = defaultMeasurementNoise();
        const caErrors = [];
        // Use deterministic PRNG for reproducibility
        let seed = 42;
        function nextRand() { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; }
        for (let s = 0; s < steps; s++) {
            const t = s * dt;
            const trueX = 5 * Math.cos(omega * t);
            const trueY = 5 * Math.sin(omega * t);
            const trueZ = 0;
            const z = [trueX + (nextRand() - 0.5) * 2 * sigma, trueY + (nextRand() - 0.5) * 2 * sigma, trueZ + (nextRand() - 0.5) * 2 * sigma];
            // IMM step
            const immResult = imm.step(z, dt);
            if (s >= 50) {
                const err = Math.sqrt((immResult.x[0] - trueX) ** 2 + (immResult.x[1] - trueY) ** 2 + (immResult.x[2] - trueZ) ** 2);
                immErrors.push(err);
            }
            // CA-only step
            caState = ukfStep(caState, z, dt, caQ, caR);
            if (s >= 50) {
                const err = Math.sqrt((caState.x[0] - trueX) ** 2 + (caState.x[1] - trueY) ** 2 + (caState.x[2] - trueZ) ** 2);
                caErrors.push(err);
            }
        }
        const immRMSE = Math.sqrt(immErrors.reduce((s, e) => s + e * e, 0) / immErrors.length);
        const caRMSE = Math.sqrt(caErrors.reduce((s, e) => s + e * e, 0) / caErrors.length);
        console.log(`IMM RMSE: ${immRMSE.toFixed(3)}m, CA RMSE: ${caRMSE.toFixed(3)}m`);
        // IMM should beat CA on a turning trajectory (CT model captures the turn)
        expect(immRMSE).toBeLessThan(caRMSE);
    });
});
