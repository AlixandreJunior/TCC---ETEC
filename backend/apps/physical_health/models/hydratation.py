from django.db import models
from django.dispatch import receiver
from django.utils import timezone
from apps.user.models.user import User, Goal

class HydrationLog(models.Model):
    class Meta:
        verbose_name = 'Hydration'
        verbose_name_plural = "Hydration"

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    date = models.DateField(default = timezone.now)

    def __str__(self):
        return f"Monitoramento de hidratação de {self.user.username} em {self.date}"