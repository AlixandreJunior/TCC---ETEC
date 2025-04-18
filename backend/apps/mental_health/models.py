from django.db import models
from django.dispatch import receiver
from django.core.validators import MinValueValidator, MaxValueValidator
from apps.user.models import User

MOOD_CHOICES = [("Feliz", "Feliz"), ("Triste", "Triste"), ("Ansioso", "Ansioso"), ("Calmo", "Calmo"), ("Estressado", "Estressado")]

class Mindfulness(models.Model):
    class Meta:
        verbose_name = 'Mindfulness'
        verbose_name_plural = "Mindfulness"

    name = models.CharField(max_length=255)
    duration = models.IntegerField()
    type = models.CharField(max_length=100)
    description = models.TextField()
    difficulty = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        return f"Mindfulness {self.name}"

class MentalCheckin(models.Model):
    class Meta:
        verbose_name = 'Wellness Check-In'
        verbose_name_plural = "Wellness Check-ins"

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    mood = models.CharField(max_length=50, choices=MOOD_CHOICES)
    stress_level = models.PositiveIntegerField(validators=[MinValueValidator(0), MaxValueValidator(10)])
    anxiety_level = models.PositiveIntegerField(validators=[MinValueValidator(0), MaxValueValidator(10)])
    is_feeling_lonely = models.BooleanField() 
    is_low_self_esteem = models.BooleanField() 
    is_overwhelmed = models.BooleanField() 
    notes = models.TextField(blank=True, null=True)
    score = models.PositiveIntegerField(validators=[MinValueValidator(0), MaxValueValidator(100)])
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"Check-In Menatal de {self.user.username} em {self.date}"

class MindfulnessLog(models.Model):
    class Meta:
        verbose_name = 'Mindfulness Log'
        verbose_name_plural = "Mindfulness Logs"

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    mindfulness = models.ForeignKey(Mindfulness, on_delete=models.CASCADE)
    rating = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)], null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Registro de Midnfullnes de {self.user.username} em {self.created_at}"
    
class Diary(models.Model):
    class Meta:
        verbose_name = "Diário Pessoal"
        verbose_name_plural = "Diários Pessoais"
        ordering = ['-date']

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    content = models.TextField()
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Diário de {self.user.username} em {self.date.strftime('%d/%m/%Y')}"