from apps.progress.models import Achievement, AchievementLog, UserProgress
from apps.user.models import User
from apps.physical_health.models import ExerciseLog, PhysicalCheckin
from apps.mental_health.models import MindfulnessLog, MentalCheckin
from django.utils.timezone import now, timedelta

class CheckAchievements:
    CONDITION_HANDLERS = {}

    @classmethod
    def register_handlers(cls, handlers):
        cls.CONDITION_HANDLERS.update(handlers)

    @staticmethod
    def check_achievements_for_user(user):
        unlocked = []  # Conquistas recém-desbloqueadas

        try:
            for achievement in Achievement.objects.all():
                if AchievementLog.objects.filter(user=user, achievement=achievement).exists():
                    continue  # Já desbloqueada

                condition = achievement.condition
                handler = CheckAchievements.CONDITION_HANDLERS.get(condition)

                if handler and handler(user):
                    AchievementLog.objects.create(user=user, achievement=achievement)
                    unlocked.append(achievement)

        except Exception as e:
            print(f"[Erro em check_achievements_for_user]: {e}")

        return unlocked


# ----------------------------------------
# Handlers para conquistas de Check-in
# ----------------------------------------

class CheckAchievementsProgress(CheckAchievements):
    ...


CheckAchievements.register_handlers({
    
})


# ----------------------------------------
# Handlers para conquistas de Progress
# ----------------------------------------

