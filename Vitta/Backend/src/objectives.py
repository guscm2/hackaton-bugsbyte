from datetime import date 

today = date.today()
class Objective:
    def __init__ (self, name, atual, value, status = "In Progress"):
        self.name = name
        self.atual = atual
        self.value = value
        self.status = status

    def get_name(self):
        return self.name
    
    def get_atual(self):
         return self.atual
    
    def get_status(self):
        return self.status
    
    def get_value(self):
        return self.value

    def set_atual(self, atual):
        self.atual = atual
    
    def set_value(self, value):
        self.value = value
    
    def update_objective(self):
        self.atual += 1
        if self.name != "Peso":
            if today.isoweekday() == 7:
                self.atual = 0

    def completed_objective(self):
        if self.atual >= self.value:
            self.status = "Completed"
    
    pass