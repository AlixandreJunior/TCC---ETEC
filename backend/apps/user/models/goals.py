from django.db import models


class Goal(models.Model):
    class Meta:
        verbose_name = "Goal"
        verbose_name_plural = "Goals"

    user = models.ForeignKey('User', on_delete=models.CASCADE)
    hydration_goal = models.IntegerField(default=1000)
    steps_goal = models.IntegerField(default=5000)
    exercise_goal = models.IntegerField(default=10)
    mindfulness_goal = models.IntegerField(default=10)

    def __str__(self):
        return f'Metas de {self.user.username}'
    