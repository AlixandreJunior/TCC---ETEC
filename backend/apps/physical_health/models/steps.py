from django.db import models
from django.dispatch import receiver
from apps.user.models.user import User, Goal

class StepsLog(models.Model):
    class Meta:
        verbose_name = 'Exercise Log'
        verbose_name_plural = "Exercise Logs"

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    steps = models.IntegerField()
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"Monitoramneto de passos dados por {self.user.username} em {self.date}"