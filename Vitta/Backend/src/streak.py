from datetime import date, timedelta

class Streak :
    def innit(self, freezes = 0):
        self.count = 0
        self.last_completed = None
        self.streak_freezes = freezes

    def set_count(self, count):
        self.count = count
        
    def set_last_completed(self, last_completed):
        self.last_completed = last_completed

    def set_streak_freezes(self, streak_freezes):
        self.streak_freezes = streak_freezes

    def get_streak_count(self):
        return self.count
    
    def get_streak_freezes(self):
        return self.streak_freezes
    
    def get_last_completed(self):
        return self.last_completed
    
    def add_streak_freeze(self):
        self.streak_freezes += 1
    
    def reset_streak(self):
        self.count = 0

    def update_streak(self):
        today = date.today()

        if self.last_completed is None:
            self.count = 1
            self.last_completed = today
            return
        delta_days = (today - self.last_completed).days

        if delta_days == 0:
            return
        if delta_days == 1:
            self.count += 1
        elif delta_days <= 2 and self.streak_freezes > 0:
            self.streak_freezes -= 1

        else:
            self.reset_streak()

        self.last_completed = today

    pass