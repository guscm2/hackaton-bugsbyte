from streak import Streak
from objectives import Objective
from datetime import date

today = date.today()
class User:
    def __init__ (self,id, name, weight, height, streak = Streak(), points = 0, objectives = []):
        self.id = id
        self.name = name
        self.weight = weight
        self.height = height
        self.streak = streak
        self.points = points
        self.objectives = objectives
    
    def set_id(self, id):
        self.id = id

    def set_name(self, name):
        self.name = name

    def set_weight(self, weight):
        self.weight = weight

    def set_height(self, height):
        self.height = height

    def set_points(self, points):
        self.points = points

    def set_objectives(self, objectives):
        self.objectives = objectives

    def add_objective (self, objective):
        self.objectives.append(objective)

    def remove_objective(self, objective_name):
        self.objectives = [obj for obj in self.objectives if obj.get_name() != objective_name]

    def get_id(self):
        return self.id

    def get_name(self):
        return self.name
    
    def get_streak(self):
        return self.streak
    
    def get_points(self):
        return self.points
    
    def get_weight(self):
        return self.weight
    
    def get_height(self):
        return self.height
    
    def get_objectives(self):
        return self.objectives
    
    def update_weight(self):
        for obj in self.objectives:
            if obj.get_name() == "Peso":
                if obj.get_atual() != self.weight:
                    self.weight = obj.get_atual()
                    break

    def calc_points(self):
        streak_mult = 1 + (self.streak.get_streak_count() * 0.01)
        delta_days = (today - self.streak.get_last_completed()).days
        if delta_days >= 1:
            return
        objective_points = 0
        for obj in self.objectives:
            if obj.get_completed_today() == True:
                if obj.get_name() == "Peso":
                    objective_points += (100 - (obj.get_atual() - obj.get_value()) * 0.5)
                else:
                    objective_points += (10 - (obj.get_value() - obj.get_atual()))
        self.points += int(objective_points * streak_mult)

    pass       