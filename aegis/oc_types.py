import math
from enum import IntEnum
from dataclasses import dataclass

G_EARTH = 9.80665
MISSION_ALT_M = 300.0

RHO_300M = 1.1901
DRONE_S_REF = 0.42
DRONE_CD0 = 0.024
DRONE_K = 0.1738
V_PATROL_MS = 27.5 # 99 km/h (temp)
V_SPRINT_MS = 88.89 # 320 km/h

class TargetClass(IntEnum):
    UNKNOWN = 0
    PROBABLE = 1
    CONFIRMED = 2
    LURE = 3

@dataclass
class Vec3:
    x: float; y: float; z: float
    def dist(self, other: 'Vec3') -> float:
        return math.sqrt((self.x-other.x)**2 + (self.y-other.y)**2 + (self.z-other.z)**2)
