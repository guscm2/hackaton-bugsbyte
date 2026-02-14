from objectives import Objective

class Contibutions:
    def __init__ (self, data, objetivo):
        self.data = data
        self.objetivo = objetivo
    
    def get_data(self):
        return self.data
    
    def get_objetivo(self):
        return self.objetivo
    
    def set_data(self, data):
        self.data = data
    
    def set_objetivo(self, objetivo):
        self.objetivo = objetivo
    def count_contribution(self):
        return len(self.objetivo.contributions)

    def count_contribution_date(self, data, count):
        if self.data == data:
            count += 1
        return count
    
    pass