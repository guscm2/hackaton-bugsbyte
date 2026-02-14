from user import User

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