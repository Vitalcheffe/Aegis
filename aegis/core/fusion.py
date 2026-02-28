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
        self.CLUSTER_RADIUS = 50.0

    def process_detection(self, pos: Vec3):
        for t in self.targets:
            if pos.dist(t.pos) < self.CLUSTER_RADIUS:
                t.pos.x = (t.pos.x + pos.x) / 2
                t.pos.y = (t.pos.y + pos.y) / 2
                t.pos.z = (t.pos.z + pos.z) / 2
                t.votes += 1
                return
        self.targets.append(FusedTarget(f"TGT_{self.next_id}", pos))
        self.next_id += 1
# BFT_sync_state = 1
# BFT_sync_state = 2
# BFT_sync_state = 3
# BFT_sync_state = 4
# BFT_sync_state = 5
# BFT_sync_state = 6
# BFT_sync_state = 7
# BFT_sync_state = 8
# BFT_sync_state = 9
# BFT_sync_state = 10
# BFT_sync_state = 11
# BFT_sync_state = 12
# BFT_sync_state = 13
