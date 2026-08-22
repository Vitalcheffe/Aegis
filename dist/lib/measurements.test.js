"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const measurements_1 = require("./measurements");
describe('Position Measurement', () => {
    test('returns first 3 components', () => {
        expect((0, measurements_1.positionMeasurement)([5, 6, 7, 1, 0, 0, 0, 0, 0])).toEqual([5, 6, 7]);
    });
});
describe('Bearing Measurement', () => {
    test('bearing of target on +x axis is 0', () => {
        const x = [10, 0, 0, 1, 0, 0, 0, 0, 0];
        expect((0, measurements_1.bearingMeasurement)(x)[0]).toBeCloseTo(0, 9);
    });
    test('bearing of target on +y axis is π/2', () => {
        const x = [0, 10, 0, 0, 1, 0, 0, 0, 0];
        expect((0, measurements_1.bearingMeasurement)(x)[0]).toBeCloseTo(Math.PI / 2, 9);
    });
    test('bearing of target on -x axis is π', () => {
        const x = [-10, 0, 0, -1, 0, 0, 0, 0, 0];
        expect((0, measurements_1.bearingMeasurement)(x)[0]).toBeCloseTo(Math.PI, 9);
    });
    test('bearing of target at 45° is π/4', () => {
        const x = [5, 5, 0, 1, 1, 0, 0, 0, 0];
        expect((0, measurements_1.bearingMeasurement)(x)[0]).toBeCloseTo(Math.PI / 4, 9);
    });
    test('bearing at origin is 0 (protected against division by zero)', () => {
        const x = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        expect((0, measurements_1.bearingMeasurement)(x)[0]).toBe(0);
    });
});
describe('Range-Rate Measurement', () => {
    test('approaching target (vx < 0, x > 0) has negative range-rate', () => {
        const x = [10, 0, 0, -1, 0, 0, 0, 0, 0]; // moving toward origin
        const rr = (0, measurements_1.rangeRateMeasurement)(x)[0];
        expect(rr).toBeCloseTo(-1.0, 6); // vx = -1, radial velocity = -1
    });
    test('receding target (vx > 0, x > 0) has positive range-rate', () => {
        const x = [10, 0, 0, 1, 0, 0, 0, 0, 0]; // moving away
        const rr = (0, measurements_1.rangeRateMeasurement)(x)[0];
        expect(rr).toBeCloseTo(1.0, 6);
    });
    test('perpendicular motion has ~0 range-rate', () => {
        // Target moving in +y at [10, 0] → radial velocity is 0
        const x = [10, 0, 0, 0, 1, 0, 0, 0, 0];
        const rr = (0, measurements_1.rangeRateMeasurement)(x)[0];
        expect(Math.abs(rr)).toBeLessThan(0.01);
    });
    test('range-rate at origin is 0 (protected)', () => {
        const x = [0, 0, 0, 1, 1, 0, 0, 0, 0];
        expect((0, measurements_1.rangeRateMeasurement)(x)[0]).toBe(0);
    });
    test('45° diagonal approach: correct projection', () => {
        // Target at [5, 5] moving in [-1, -1] direction
        // Radial velocity = (5*(-1) + 5*(-1)) / sqrt(50) = -10 / 7.071 = -1.414
        const x = [5, 5, 0, -1, -1, 0, 0, 0, 0];
        const rr = (0, measurements_1.rangeRateMeasurement)(x)[0];
        expect(rr).toBeCloseTo(-Math.sqrt(2), 4);
    });
});
describe('Combined Measurement (5D)', () => {
    test('returns [x, y, z, bearing, range_rate]', () => {
        const x = [10, 0, 5, 1, 0, 0, 0, 0, 0];
        const z = (0, measurements_1.combinedMeasurement)(x);
        expect(z.length).toBe(5);
        expect(z[0]).toBeCloseTo(10, 6);
        expect(z[1]).toBeCloseTo(0, 6);
        expect(z[2]).toBeCloseTo(5, 6);
        expect(z[3]).toBeCloseTo(0, 6); // bearing
        expect(z[4]).toBeCloseTo(1, 6); // range-rate
    });
    test('bearing and range-rate consistent with individual functions', () => {
        const x = [3, 4, 0, 1, 1, 0, 0, 0, 0];
        const combined = (0, measurements_1.combinedMeasurement)(x);
        const bearing = (0, measurements_1.bearingMeasurement)(x)[0];
        const rr = (0, measurements_1.rangeRateMeasurement)(x)[0];
        expect(combined[3]).toBeCloseTo(bearing, 9);
        expect(combined[4]).toBeCloseTo(rr, 9);
    });
});
describe('Measurement Noise Matrices', () => {
    test('positionR is 3×3', () => {
        const R = (0, measurements_1.positionR)(1.0);
        expect(R.length).toBe(3);
        expect(R[0][0]).toBe(1.0);
    });
    test('bearingR is 1×1', () => {
        const R = (0, measurements_1.bearingR)(0.05);
        expect(R.length).toBe(1);
        expect(R[0][0]).toBeCloseTo(0.0025, 6);
    });
    test('combinedR is 5×5', () => {
        const R = (0, measurements_1.combinedR)(1.0, 0.05, 0.5);
        expect(R.length).toBe(5);
        expect(R[0][0]).toBe(1.0);
        expect(R[3][3]).toBeCloseTo(0.0025, 6);
        expect(R[4][4]).toBeCloseTo(0.25, 6);
    });
    test('combinedR is diagonal', () => {
        const R = (0, measurements_1.combinedR)(1.0, 0.05, 0.5);
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                if (i !== j)
                    expect(R[i][j]).toBe(0);
            }
        }
    });
});
