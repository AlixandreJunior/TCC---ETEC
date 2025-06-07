from django.db import models
from apps.user.models import User

class Exercise(models.Model):
    class TypeChoices(models.TextChoices):
        FORCA = 'Força', 'Força'
        FLEXIBILIDADE = 'Flexibilidade', 'Flexibilidade'
        AEROBICO = 'Aeróbico', 'Aeróbico'
        RESISTENCIA = 'Resistência', 'Resistência'
    
    class DifficultyChoices(models.TextChoices):
        DIFICIL = 'Díficil', 'Díficil'
        INTERMEDIARIO = 'Intermediário', 'Intermediário'
        FACIL = 'Fácil', 'Fácil'

    class Meta:
        verbose_name = 'Exercise'
        verbose_name_plural = "Exercises"

    name = models.CharField(max_length=255)
    duration = models.PositiveIntegerField()
    type = models.CharField(max_length=100, choices=TypeChoices.choices)
    description = models.TextField()
    difficulty = models.CharField(max_length=50, choices = DifficultyChoices.choices)

    def __str__(self):
        return f"Exercicio {self.name}"
     
class ExerciseLog(models.Model):
    class Meta:
        verbose_name = 'Exercise Log'
        verbose_name_plural = "Exercise Logs"

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    exercise = models.ForeignKey(Exercise, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Registro de Exercircio de {self.user.username}"
