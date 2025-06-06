from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from apps.user.models import User

class PhysicalCheckin(models.Model):
    class QualityChoices(models.TextChoices):
        EXCELENTE = 'excelente', 'Excelente'
        BOA = 'boa', 'Boa'
        REGULAR = 'regular', 'Regular'
        RUIM = 'ruim', 'Ruim'
        PESSIMO = 'pessimo', 'Pessimo'

    class Meta:
        verbose_name = 'Physical Check-In'
        verbose_name_plural = "Physical Check-Ins"

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    energy_level = models.PositiveIntegerField(validators=[MinValueValidator(1), MaxValueValidator(10)])
    activity_level = models.PositiveIntegerField(validators=[MinValueValidator(1), MaxValueValidator(10)])
    sleep_quality = models.CharField(max_length=50, choices=QualityChoices.choices)
    healthy_eating = models.CharField(max_length=50, choices=QualityChoices.choices)
    is_pain = models.BooleanField()
    is_took_medicine = models.BooleanField()
    is_used_screen_too_much = models.BooleanField()
    notes = models.TextField(blank=True, null=True)
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"Check In Fisico de {self.user.username} em {self.date}"