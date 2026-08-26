import { chi2Critical, mahalanobisDistance, gateMeasurement } from './chi-square-gate';

describe('Chi-Square Gate', () => {
  test('chi2 critical values correct', () => {
    expect(chi2Critical(3)).toBeCloseTo(7.815, 3);
    expect(chi2Critical(2)).toBeCloseTo(5.991, 3);
    expect(chi2Critical(5)).toBeCloseTo(11.070, 3);
  });

  test('mahalanobis distance of zero innovation is 0', () => {
    const S = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
    const d2 = mahalanobisDistance([0, 0, 0], S);
    expect(d2).toBeCloseTo(0, 6);
  });

  test('mahalanobis distance of unit innovation with identity S is 3', () => {
    const S = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
    const d2 = mahalanobisDistance([1, 1, 1], S);
    expect(d2).toBeCloseTo(3, 6);
  });

  test('mahalanobis distance respects S scaling', () => {
    const S = [[4, 0, 0], [0, 4, 0], [0, 0, 4]];
    const d2 = mahalanobisDistance([2, 2, 2], S);
    // d² = (2²/4)*3 = 3
    expect(d2).toBeCloseTo(3, 6);
  });

  test('gate accepts measurement within threshold', () => {
    const S = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
    const innov = [1, 1, 1];  // d² = 3 < 7.815
    const result = gateMeasurement(innov, S);
    expect(result.accepted).toBe(true);
    expect(result.nis).toBeCloseTo(3, 6);
    expect(result.threshold).toBeCloseTo(7.815, 3);
  });

  test('gate rejects outlier measurement', () => {
    const S = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
    const innov = [5, 5, 5];  // d² = 75 >> 7.815
    const result = gateMeasurement(innov, S);
    expect(result.accepted).toBe(false);
    expect(result.nis).toBeCloseTo(75, 4);
  });

  test('gate at exact threshold (boundary)', () => {
    const S = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
    // d² = 7.815 → innov = sqrt(7.815/3) ≈ 1.613 per axis
    const v = Math.sqrt(7.815 / 3);
    const innov = [v, v, v];
    const result = gateMeasurement(innov, S);
    expect(result.accepted).toBe(true);  // ≤ threshold → accept
  });

  test('gate works with 2D measurement', () => {
    const S = [[1, 0], [0, 1]];
    const innov = [1, 1];  // d² = 2 < 5.991
    const result = gateMeasurement(innov, S);
    expect(result.accepted).toBe(true);
  });

  test('gate works with 5D measurement', () => {
    const S = [
      [1, 0, 0, 0, 0],
      [0, 1, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 1, 0],
      [0, 0, 0, 0, 1],
    ];
    const innov = [1, 1, 1, 1, 1];  // d² = 5 < 11.070
    const result = gateMeasurement(innov, S);
    expect(result.accepted).toBe(true);
  });

  test('gate rejects 5D outlier', () => {
    const S = [
      [1, 0, 0, 0, 0],
      [0, 1, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 1, 0],
      [0, 0, 0, 0, 1],
    ];
    const innov = [5, 5, 5, 5, 5];  // d² = 125 >> 11.070
    const result = gateMeasurement(innov, S);
    expect(result.accepted).toBe(false);
  });

  test('mahalanobis with non-diagonal S (correlated noise)', () => {
    // S with off-diagonal correlation
    const S = [[2, 1, 0], [1, 2, 0], [0, 0, 1]];
    const innov = [1, 0, 0];
    // S⁻¹ = [[2/3, -1/3, 0], [-1/3, 2/3, 0], [0, 0, 1]]
    // d² = 1 * 2/3 * 1 = 2/3
    const d2 = mahalanobisDistance(innov, S);
    expect(d2).toBeCloseTo(2/3, 4);
  });

  test('gate handles singular-ish S gracefully', () => {
    // Near-singular S (very small eigenvalue)
    const S = [[1e-10, 0, 0], [0, 1, 0], [0, 0, 1]];
    const innov = [1, 0, 0];
    // d² should be huge (1/1e-10 = 1e10)
    const result = gateMeasurement(innov, S);
    expect(result.accepted).toBe(false);
    expect(result.nis).toBeGreaterThan(1e5);
  });
});
