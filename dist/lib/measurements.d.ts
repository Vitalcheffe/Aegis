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
export declare function positionMeasurement(x: number[]): number[];
export declare function bearingMeasurement(x: number[]): number[];
export declare function rangeRateMeasurement(x: number[]): number[];
export declare function combinedMeasurement(x: number[]): number[];
export declare function positionR(sigma?: number): number[][];
export declare function bearingR(sigmaRad?: number): number[][];
export declare function combinedR(posSigma?: number, bearingSigma?: number, rangeRateSigma?: number): number[][];
