from datetime import date 

class Streak :
    def innit(self):
        self.count = 0
        self.last_completed = None
        self.streak_freezes = 0

    def reset_streak(self):
        self.count = 0
        self.last_completed = None

    def update_streak(self):
        today = date.today()
        if self.last_completed == today:
            return
        if self.last_completed - today == 1:
            self.count += 1
        if self.last_completed - today > 1 and self.streak_freezes <= 0:
            self.reset_streak()
        else:
            self.count = 1
        self.last_completed = today


