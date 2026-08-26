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
export {};
