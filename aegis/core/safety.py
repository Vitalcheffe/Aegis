import math
from aegis.oc_types import Vec3

class ProximityLock:
    def __init__(self):
        self.is_locked = True
        self.sphere_rad = 15.0
        self.cone_depth = 60.0
        self.cone_cos = math.cos(math.radians(45.0))
