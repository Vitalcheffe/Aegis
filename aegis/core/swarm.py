import numpy as np
from aegis.oc_types import Vec3

class ElasticNet:
    def __init__(self):
        self.spacing = 45.0
        self.k_spring = 0.12
        self.k_repulse = 500.0
