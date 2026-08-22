/**
 * Multiple Measurement Models
 *
 * 1. Position: h(x) = [x, y, z]
 * 2. Bearing-only: h(x) = [atan2(y, x)]  (azimuth from sensor at origin)
 * 3. Range-rate: h(x) = (x·vx + y·vy) / sqrt(x² + y²)
 * 4. Combined: h(x) = [x, y, z, bearing, range_rate]  (5D)
 *
 * The UKF handles nonlinear measurement functions natively via sigma points
 * — no Jacobian needed.
 */

export function positionMeasurement(x: number[]): number[] {
  return [x[0], x[1], x[2]];
}

export function bearingMeasurement(x: number[]): number[] {
  // Azimuth angle from origin to target (radians)
  // atan2(y, x) — protected against x=y=0
  const r2 = x[0] * x[0] + x[1] * x[1];
  if (r2 < 1e-10) return [0];
  return [Math.atan2(x[1], x[0])];
}

export function rangeRateMeasurement(x: number[]): number[] {
  // Radial velocity: (x·vx + y·vy) / sqrt(x² + y²)
  const r2 = x[0] * x[0] + x[1] * x[1];
  if (r2 < 1e-10) return [0];
  const r = Math.sqrt(r2);
  return [(x[0] * x[3] + x[1] * x[4]) / r];
}

export function combinedMeasurement(x: number[]): number[] {
  // 5D: [x, y, z, bearing, range_rate]
  const r2 = x[0] * x[0] + x[1] * x[1];
  const bearing = r2 < 1e-10 ? 0 : Math.atan2(x[1], x[0]);
  const rangeRate = r2 < 1e-10 ? 0 : (x[0] * x[3] + x[1] * x[4]) / Math.sqrt(r2);
  return [x[0], x[1], x[2], bearing, rangeRate];
}

// Measurement noise for each type
export function positionR(sigma: number = 1.0): number[][] {
  return [[sigma*sigma, 0, 0], [0, sigma*sigma, 0], [0, 0, sigma*sigma]];
}

export function bearingR(sigmaRad: number = 0.05): number[][] {
  // 0.05 rad ≈ 3° bearing error
  return [[sigmaRad * sigmaRad]];
}

export function combinedR(
  posSigma: number = 1.0,
  bearingSigma: number = 0.05,
  rangeRateSigma: number = 0.5
): number[][] {
  return [
    [posSigma*posSigma, 0, 0, 0, 0],
    [0, posSigma*posSigma, 0, 0, 0],
    [0, 0, posSigma*posSigma, 0, 0],
    [0, 0, 0, bearingSigma*bearingSigma, 0],
    [0, 0, 0, 0, rangeRateSigma*rangeRateSigma],
  ];
}
