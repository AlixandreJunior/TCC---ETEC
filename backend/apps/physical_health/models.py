from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django.dispatch import receiver
from apps.user.models import User, Goal

class HydrationLog(models.Model):
    class Meta:
        verbose_name = 'Hydration'
        verbose_name_plural = "Hydration"

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    goal_achieved = models.BooleanField()
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"Monitoramento de hidratação de {self.user.username} em {self.date}"

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

class StepsLog(models.Model):
    class Meta:
        verbose_name = 'Exercise Log'
        verbose_name_plural = "Exercise Logs"

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    steps = models.IntegerField()
    goal_achieved = models.BooleanField()
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"Monitoramneto de passos dados por {self.user.username} em {self.date}"
     
class ExerciseLog(models.Model):
    class Meta:
        verbose_name = 'Exercise Log'
        verbose_name_plural = "Exercise Logs"

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    exercise = models.ForeignKey(Exercise, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Registro de Exercircio de {self.user.username}"

#Signals

@receiver(models.signals.post_save, sender= HydrationLog)
def hydratation_goal_achieved(sender, instance, created, **kwargs):
    goals_user = Goal.objects.filter(user = instance.user).first()

    if instance.quantity >= goals_user.hydration_goal and not instance.goal_achieved:
        instance.goal_achieved = True
        instance.save(update_fields=["goal_achieved"])

@receiver(models.signals.post_save, sender= StepsLog)
def steps_goal_achieved(sender, instance, created, **kwargs):
    goals_user = Goal.objects.filter(user = instance.user).first()

    if instance.steps >= goals_user.steps_goal and not instance.goal_achieved:
        instance.goal_achieved = True
        instance.save(update_fields=["goal_achieved"])