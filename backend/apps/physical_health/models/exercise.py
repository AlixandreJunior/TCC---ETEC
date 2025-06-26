from django.db import models
from django.dispatch import receiver
from django.utils import timezone
from apps.user.models import User

class Exercise(models.Model):
    class TypeChoices(models.TextChoices):
        FORCA = 'Força', 'Força'
        FLEXIBILIDADE = 'Flexibilidade', 'Flexibilidade'
        AEROBICO = 'Aeróbico', 'Aeróbico'
        RESISTENCIA = 'Resistência', 'Resistência'

    class Meta:
        verbose_name = 'Exercise'
        verbose_name_plural = "Exercises"

    name = models.CharField(max_length=255)
    type = models.CharField(max_length=20, choices = TypeChoices.choices)
    is_distance = models.BooleanField(default=False)

    def __str__(self):
        return f"Exercicio {self.name}"
     
class ExerciseLog(models.Model):
    class Meta:
        verbose_name = 'Registro de Exercircio'
        verbose_name_plural = "Registros de Exercircio"

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    exercise = models.ForeignKey(Exercise, on_delete=models.CASCADE)
    duration = models.PositiveIntegerField()
    distance = models.PositiveIntegerField(blank=True, null=True)
    description = models.TextField(max_length=200, blank=True)
    datetime = models.DateTimeField(default = timezone.now)

    def __str__(self):
        return f"Registro de Exercircio de {self.user.username}"
    

@receiver(models.signals.post_migrate)
def create_default_exercises(sender, **kwargs):
    default_exercises = [
        {'name': 'Corrida', 'type': Exercise.TypeChoices.AEROBICO, 'is_distance': True},
        {'name': 'Caminhada', 'type': Exercise.TypeChoices.AEROBICO, 'is_distance': True},
        {'name': 'Treino', 'type': Exercise.TypeChoices.FORCA, 'is_distance': False},
        {'name': 'Natação', 'type': Exercise.TypeChoices.AEROBICO, 'is_distance': True},
        {'name': 'Bicicleta', 'type': Exercise.TypeChoices.AEROBICO, 'is_distance': True},
        {'name': 'Esporte', 'type': Exercise.TypeChoices.AEROBICO, 'is_distance': False},
    ]

    for exercise_data in default_exercises:
        Exercise.objects.get_or_create(
            name=exercise_data['name'],
            defaults={
                'type': exercise_data['type'],
                'is_distance': exercise_data['is_distance']
            }
        )

