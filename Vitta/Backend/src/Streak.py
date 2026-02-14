from datetime import date, timedelta

class Streak :
    def innit(self, freezes = 0):
        self.count = 0
        self.last_completed = None
        self.streak_freezes = freezes

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
