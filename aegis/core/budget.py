class EnergyBudget:
    def __init__(self):
        self.usable_wh = 177.6
        self.reserve_rtb = 40.0
        self.reserve_combat = 60.0
        
    def can_engage(self, current_wh: float) -> bool:
        return current_wh > (self.reserve_rtb + self.reserve_combat)
