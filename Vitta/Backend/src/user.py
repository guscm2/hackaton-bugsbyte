from streak import Streak
from objectives import Objective

class User:
    def __init__ (self, name,streak = Streak(), objectives = []):
        self.name = name
        self.streak = streak
        self.objectives = objectives
    
    def set_name(self, name):
        self.name = name
        
    def set_objectives(self, objectives):
        self.objectives = objectives

    def add_objective (self, objective):
        self.objectives.append(objective)

    def get_name(self):
        return self.name
    
    def get_streak(self):
        return self.streak

    def get_objectives(self):
        return self.objectives    