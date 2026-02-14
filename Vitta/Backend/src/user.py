from streak import Streak
from objectives import Objective

class User:
    def __init__ (self, name,streak = Streak(), objectives = []):
        self.name = name
        self.streak = streak
        self.Objectives = objectives
    
    def set_objectives(self, objectives):
        self.Objectives = objectives

    def add_objective (self, objective):
        self.Objectives.append(objective)

    def get_name(self):
        return self.name
    
    def get_streak(self):
        return self.streak
    