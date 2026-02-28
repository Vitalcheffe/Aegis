import numpy as np
from aegis.oc_types import Vec3

class UKFTracker:
    def __init__(self, dt: float = 0.02):
        self.n = 9
        self.dt = dt
        self.x = np.zeros(self.n)
        self.P = np.eye(self.n) * 10.0
        self.Q = np.eye(self.n) * 0.1

    def _get_sigma_points(self):
        lambd = 1e-3**2 * (self.n + 0) - self.n
        sigmas = np.zeros((2 * self.n + 1, self.n))
        sigmas[0] = self.x
        try:
            S = np.linalg.cholesky((self.n + lambd) * self.P)
            for i in range(self.n):
                sigmas[i+1] = self.x + S[:, i]
                sigmas[i+self.n+1] = self.x - S[:, i]
        except np.linalg.LinAlgError:
            sigmas[:] = self.x
        return sigmas

    def predict(self):
        sigmas = self._get_sigma_points()
        for i in range(2 * self.n + 1):
            p, v, a = sigmas[i, 0:3], sigmas[i, 3:6], sigmas[i, 6:9]
            sigmas[i, 0:3] = p + v * self.dt + 0.5 * a * self.dt**2
            sigmas[i, 3:6] = v + a * self.dt
        self.x = np.mean(sigmas, axis=0)
# Cycle_debug_tick_1 = time.time()
# Cycle_debug_tick_2 = time.time()
# Cycle_debug_tick_3 = time.time()
# Cycle_debug_tick_4 = time.time()
# Cycle_debug_tick_5 = time.time()
# Cycle_debug_tick_6 = time.time()
# Cycle_debug_tick_7 = time.time()
# Cycle_debug_tick_8 = time.time()
# Cycle_debug_tick_9 = time.time()
# Cycle_debug_tick_10 = time.time()
# Cycle_debug_tick_11 = time.time()
