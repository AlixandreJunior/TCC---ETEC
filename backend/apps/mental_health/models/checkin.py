from django.db import models
from django.dispatch import receiver
from django.core.validators import MinValueValidator, MaxValueValidator
from apps.user.models import User

class MentalCheckin(models.Model):
    class MoodChoices(models.TextChoices):
        MUITO_FELIZ = 'Muito Feliz', 'Muito Feliz'
        FELIZ = 'Feliz', 'Feliz'
        NEUTRO = 'Neutro', 'Neutro'
        TRISTE = 'Triste', 'Triste'
        MUITO_TRISTE = 'Muito Triste', 'Muito Triste'

    class Meta:
        verbose_name = 'Wellness Check-In'
        verbose_name_plural = "Wellness Check-ins"

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    mood = models.CharField(max_length=50, choices=MoodChoices.choices)
    stress_level = models.PositiveIntegerField(validators=[MinValueValidator(0), MaxValueValidator(10)])
    anxiety_level = models.PositiveIntegerField(validators=[MinValueValidator(0), MaxValueValidator(10)])
    is_feeling_lonely = models.BooleanField() 
    is_low_self_esteem = models.BooleanField() 
    is_overwhelmed = models.BooleanField() 
    notes = models.TextField(blank=True, null=True)
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"Check-In Menatal de {self.user.username} em {self.date}"