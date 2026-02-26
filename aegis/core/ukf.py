import numpy as np
from aegis.oc_types import Vec3

class UKFTracker:
    def __init__(self, dt: float = 0.02):
        self.n = 9
        self.dt = dt
        self.x = np.zeros(self.n)
        self.P = np.eye(self.n) * 10.0
        self.Q = np.eye(self.n) * 0.1
