import math
from aegis.oc_types import Vec3

class ProximityLock:
    def __init__(self):
        self.is_locked = True
        self.sphere_rad = 15.0
        self.cone_depth = 60.0
        self.cone_cos = math.cos(math.radians(45.0))

    def verify_clearance(self, pos: Vec3, heading: Vec3, allies: list) -> bool:
        for ally in allies:
            if pos.dist(ally) < self.sphere_rad: return False
            rx, ry, rz = ally.x - pos.x, ally.y - pos.y, ally.z - pos.z
            rdist = math.sqrt(rx**2 + ry**2 + rz**2)
            if rdist < self.cone_depth:
                dot = (rx*heading.x + ry*heading.y + rz*heading.z) / rdist
                if dot > self.cone_cos: return False
        return True
class HumanLoopGate:
    def __init__(self, sim_mode=False):
        self.sim_mode = sim_mode
    def request_auth(self):
        return True if self.sim_mode else False
