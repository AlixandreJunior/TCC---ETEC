from django.db import models
from django.utils import timezone
from apps.user.models.user import User

class HydrationLog(models.Model):
    def today():
        return timezone.now().date()

    class Meta:
        verbose_name = 'Hydration'
        verbose_name_plural = "Hydration"

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    date = models.DateField(default = today)

    def __str__(self):
        return f"Monitoramento de hidratação de {self.user.username} em {self.date}"