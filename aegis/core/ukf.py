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
