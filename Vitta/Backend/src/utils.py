from user import User
from objectives import Objective
from streak import Streak

def compare_points(user1, user2):
    points1 = user1.get_points()
    points2 = user2.get_points()
    if points1 > points2:
        return 1
    elif points1 < points2:
        return -1
    else:
        return 0

def calcleaderboard(users):
    leaderboard = sorted(users, key = compare_points, reverse = True)
    return leaderboard