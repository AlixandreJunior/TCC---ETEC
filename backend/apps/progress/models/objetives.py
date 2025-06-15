from django.db import models
from apps.user.models import User
from apps.mental_health.models.diary import Activity

class Objective(models.Model):
    class Meta:
        verbose_name = 'Objective'
        verbose_name_plural = "Objectives"

    class PeriodChoices(models.TextChoices):
        ONE_WEEK = '1w', '1 semana'
        TWO_WEEKS = '2w', '2 semanas'
        THREE_WEEKS = '3w', '3 semanas'

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    activity = models.ForeignKey(Activity, on_delete=models.CASCADE)
    period = models.CharField(max_length=2, choices=PeriodChoices.choices, default=PeriodChoices.ONE_WEEK)
    deadline = models.DateField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Objetivos de {self.user.username}"
