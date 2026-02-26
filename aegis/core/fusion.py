from typing import List
from aegis.oc_types import Vec3, TargetClass

class FusedTarget:
    def __init__(self, tid: str, pos: Vec3):
        self.target_id = tid
        self.pos = pos
        self.votes = 1

class SpectralFusion:
    def __init__(self):
        self.targets: List[FusedTarget] = []
        self.next_id = 100
        self.CLUSTER_RADIUS = 25.0
