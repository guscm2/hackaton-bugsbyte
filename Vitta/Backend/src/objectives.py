from datetime import date 
from user import User

today = date.today()
class Objective:
    def __init__ (self, name, atual, value, completed_today = False, status = "In Progress"):
        self.name = name
        self.atual = atual
        self.value = value
        self.completed_today = completed_today
        self.status = status

    def get_name(self):
        return self.name
    
    def get_atual(self):
         return self.atual
    
    def get_status(self):
        return self.status
    
    def get_value(self):
        return self.value

    def set_objective_name(self,name):
        self.name = name

    def set_atual(self, atual):
        self.atual = atual
    
    def set_value(self, value):
        self.value = value

    def set_completed_today(self, completed_today):
        self.completed_today = completed_today
    
    def set_status(self, status):
        self.status = status

    def update_peso_objective(self, peso):
        if self.name == "Peso":
            self.atual = peso
            self.completed_today = True
        if self.atual <= self.value:
            self.status = "Completed"

    def completed_objective(self):
        if self.atual >= self.value:
            self.status = "Completed"

    def update_objective(self):
        if self.completed_today:
            return
        else:
            self.completed_today = True
            if self.name != "Peso":
                self.atual += 1
                self.completed_objective()
                if today.isoweekday() == 7:
                    self.atual = 0
        
            else:
                self.update_peso_objective(self, self.atual)

    pass