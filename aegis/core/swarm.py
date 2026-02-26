import numpy as np
from aegis.oc_types import Vec3

class ElasticNet:
    def __init__(self):
        self.spacing = 45.0
        self.k_spring = 0.12
        self.k_repulse = 500.0

    def compute_forces(self, agent_pos, neighbors):
        force = np.zeros(3)
        for nb in neighbors:
            dist_vec = agent_pos - nb
            dist = np.linalg.norm(dist_vec)
            if dist < 0.001: continue
            
            error = dist - self.spacing
            force -= (self.k_spring * error) * (dist_vec / dist)
            if dist < self.spacing * 0.5:
                force += (self.k_repulse / dist**2) * (dist_vec / dist)
                
        mag = np.linalg.norm(force)
        if mag > 5.0: force = (force / mag) * 5.0
        return force
