# UKF Tracker - Mathematical Specification

## 9-State Unscented Kalman Filter for AEGIS

### State Vector Definition

$$\mathbf{x} = [x, y, z, v_x, v_y, v_z, a_x, a_y, a_z]^T$$

Where:
- $(x, y, z)$ - Position in 3D space (meters)
- $(v_x, v_y, v_z)$ - Velocity components (m/s)
- $(a_x, a_y, a_z)$ - Acceleration components (m/s²)

### Sigma Point Selection (Merwe-Optimized)

For a state vector of dimension $L = 9$ and scaling parameters $\alpha = 10^{-3}$, $\kappa = 0$, $\beta = 2$:

$$\lambda = \alpha^2(L + \kappa) - L$$

$$2L + 1 = 19 \text{ sigma points}$$

Sigma points computed as:
$$\mathcal{X}_{k|k}^{(0)} = \hat{x}_{k|k}$$

$$\mathcal{X}_{k|k}^{(i)} = \hat{x}_{k|k} + \left(\sqrt{(L + \lambda)P_{k|k}}\right)_i \quad i = 1, \ldots, L$$

$$\mathcal{X}_{k|k}^{(i+L)} = \hat{x}_{k|k} - \left(\sqrt{(L + \lambda)P_{k|k}}\right)_i \quad i = 1, \ldots, L$$

### Weight Calculation

$$W_m^{(0)} = \frac{\lambda}{L + \lambda}$$

$$W_m^{(i)} = W_c^{(i)} = \frac{1}{2(L + \lambda)} \quad i = 1, \ldots, 2L$$

$$W_c^{(0)} = W_m^{(0)} + (1 - \alpha^2 + \beta)$$

### Prediction Step

#### State Transition Function

For constant acceleration model with process noise:

$$\mathbf{x}_{k+1|k} = f(\mathbf{x}_{k|k}, \Delta t) + \mathbf{w}_k$$

Where $\mathbf{w}_k \sim \mathcal{N}(0, Q_k)$ is process noise.

#### Predicted State Mean

$$\hat{x}_{k+1|k} = \sum_{i=0}^{2L} W_m^{(i)} \mathcal{X}_{k+1|k}^{(i)}$$

#### Predicted Covariance

$$P_{k+1|k} = \sum_{i=0}^{2L} W_c^{(i)} [\mathcal{X}_{k+1|k}^{(i)} - \hat{x}_{k+1|k}][\mathcal{X}_{k+1|k}^{(i)} - \hat{x}_{k+1|k}]^T + Q_k$$

### Update Step

#### Measurement Model

$$\mathbf{z}_k = H\mathbf{x}_k + \mathbf{v}_k$$

Where $\mathbf{v}_k \sim \mathcal{N}(0, R_k)$ is measurement noise.

#### Predicted Measurements

$$\hat{z}_{k|k-1} = \sum_{i=0}^{2L} W_m^{(i)} \mathcal{Z}_{k|k-1}^{(i)}$$

Where $\mathcal{Z}_{k|k-1}^{(i)} = h(\mathcal{X}_{k|k-1}^{(i)})$

#### Innovation Covariance

$$P_{zz} = \sum_{i=0}^{2L} W_c^{(i)} [\mathcal{Z}_{k|k-1}^{(i)} - \hat{z}_{k|k-1}][\mathcal{Z}_{k|k-1}^{(i)} - \hat{z}_{k|k-1}]^T + R_k$$

#### Cross-Covariance

$$P_{xz} = \sum_{i=0}^{2L} W_c^{(i)} [\mathcal{X}_{k|k-1}^{(i)} - \hat{x}_{k|k-1}][\mathcal{Z}_{k|k-1}^{(i)} - \hat{z}_{k|k-1}]^T$$

#### Kalman Gain

$$K_k = P_{xz} P_{zz}^{-1}$$

#### State Update

$$\hat{x}_{k|k} = \hat{x}_{k|k-1} + K_k(\mathbf{z}_k - \hat{z}_{k|k-1})$$

#### Covariance Update

$$P_{k|k} = P_{k|k-1} - K_k P_{zz} K_k^T$$

## Performance Characteristics

### Error Convergence
- Initial error bound: ±50m
- After 2 seconds: ±1.5m
- Convergence rate: < 7 ticks for Shahed-136 interception

### Computational Complexity
- Sigma points: 19 per iteration
- Matrix operations: $(2L+1) \times O(9^2)$ for state propagation
- Total per tick: ~0.8ms on target hardware

## References

1. Julier, S. J., & Uhlmann, J. K. (1997). "A new extension of the Kalman filter to nonlinear systems."
2. Wan, E. A., & Van Der Merwe, R. (2000). "The unscented Kalman filter for nonlinear estimation."
3. Simon, D. (2006). "Optimal State Estimation: Kalman, H Infinity, and Nonlinear Approaches."