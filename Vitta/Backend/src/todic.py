from user import User
from objectives import Objective
from streak import Streak
import json
from datetime import date

def objective_to_dict(objective):
    return {
        "name": objective.get_name(),
        "atual": objective.get_atual(),
        "value": objective.get_value(),
        "status": objective.get_status()
    }

def streak_to_dict(streak):
    return {
        "count": streak.get_streak_count(),
        "last_completed": streak.get_last_completed(),
        "streak_freezes": streak.get_streak_freezes()
    }

def user_to_dict(user):
    return {
        "name": user.get_name(),
        "streak": streak_to_dict(user.get_streak()),
        "objectives": [objective_to_dict(obj) for obj in user.get_objectives()]
    }

def save_user_to_json(user, filename):
    if filename == "":
        filename = "user_data.json"
    with open(filename, 'a') as f:
        json.dump(user_to_dict(user), f)
        f.write('\n')

def load_user_from_json(filename, usersarray):
    with open (filename, 'r') as f:
        for line in f:
            if line.strip():
                data = json.loads(line)
                user = User(data["name"])
                user.objectives = []
                user.set_name(data["name"])
                user.get_streak().set_count(int(data["streak"]["count"]))
                user.get_streak().set_last_completed(date.fromisoformat(data["streak"]["last_completed"]))
                user.get_streak().set_streak_freezes(int(data["streak"]["streak_freezes"]))
                for obj_data in data["objectives"]:
                    objective = Objective()
                    objective.set_objective_name(obj_data["name"])
                    objective.set_atual(int(obj_data["atual"]))
                    objective.set_value(int(obj_data["value"]))
                    objective.set_status(obj_data["status"])
                    user.add_objective(objective)
                    usersarray.append(user)

