from apps.progress.models import Achievement,UserProgress,AchievementLog
from django.utils.deprecation import MiddlewareMixin
from apps.progress.models import UserProgress, Achievement, AchievementLog

def check_achievements_for_user(user):
    try:
        progress = UserProgress.objects.get(user=user)
    except UserProgress.DoesNotExist:
        return

    achievements_to_check = [
        {"condition": "checkin_7_days", "streak_needed": 7},
        {"condition": "score_100", "score_needed": 100},
    ]

    for item in achievements_to_check:
        try:
            ach = Achievement.objects.get(condition=item["condition"])
            if AchievementLog.objects.filter(user=user, achievement=ach).exists():
                continue

            if item["condition"] == "checkin_7_days" and progress.streak >= item["streak_needed"]:
                AchievementLog.objects.create(user=user, achievement=ach)

            if item["condition"] == "score_100" and progress.score >= item["score_needed"]:
                AchievementLog.objects.create(user=user, achievement=ach)

        except Achievement.DoesNotExist:
            continue


class AchievementCheckMiddleware(MiddlewareMixin):
    def process_view(self, request, view_func, view_args, view_kwargs):
        user = getattr(request, 'user', None)

        if user and user.is_authenticated and request.method in ["POST", 'PATCH']:
            try:
                if not hasattr(request, '_achievements_checked'):
                    request._achievements_checked = True
                    check_achievements_for_user(user)
            except Exception as e:
                print(f"Erro ao checar conquistas: {e}")
        return None