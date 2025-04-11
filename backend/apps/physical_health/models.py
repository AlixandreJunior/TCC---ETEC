from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django.dispatch import receiver
from apps.user.models import User, Goal

from utils.generate_recomendation import physic_generate_recommendation

CHOICES = [('Ruim', 'Ruim'), ('Medio', 'Medio'), ('Bom', 'Bom')]

class Hydration(models.Model):
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
    class Meta:
        verbose_name = 'Exercise'
        verbose_name_plural = "Exercises"

    name = models.CharField(max_length=255)
    duration = models.IntegerField()
    type = models.CharField(max_length=100)
    description = models.TextField()
    difficulty = models.CharField(max_length=50)

    def __str__(self):
        return f"Exercicio {self.name}"

class PhysicalCheckin(models.Model):
    class Meta:
        verbose_name = 'Physical Check-In'
        verbose_name_plural = "Physical Check-Ins"

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    height = models.FloatField(null=True, blank=True, validators=[MinValueValidator(0.5), MaxValueValidator(2.5)])
    weight = models.FloatField(null=True, blank=True, validators=[MinValueValidator(10), MaxValueValidator(300)])
    energy_level = models.PositiveIntegerField(validators=[MinValueValidator(1), MaxValueValidator(10)])
    activity_level = models.PositiveIntegerField(validators=[MinValueValidator(1), MaxValueValidator(10)])
    sleep_quality = models.CharField(max_length=50, choices=CHOICES)
    healthy_eating = models.CharField(max_length=50, choices=CHOICES )
    is_pain = models.BooleanField()
    is_smoked = models.BooleanField()
    is_alcohol = models.BooleanField()
    notes = models.TextField(blank=True, null=True)
    score = models.PositiveIntegerField(validators=[MinValueValidator(0), MaxValueValidator(100)])
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"Check In Fisico de {self.user.username} em {self.checkin_date}"

class Steps(models.Model):
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
    rating = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)], null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Registro de Exercircio de {self.user.username}"

class PhysicalRecommendation(models.Model):
    checkin = models.ForeignKey(PhysicalCheckin, on_delete=models.CASCADE,)
    recommendation_text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Recomendação para {self.checkin.user.username} em {self.created_at.date()}"

#Signals

@receiver(models.signals.post_save, sender=PhysicalCheckin)
def create_physical_recommendation(sender, instance, created, **kwargs):
    if created:
        recommendation_text = physic_generate_recommendation(instance)
        PhysicalRecommendation.objects.create(checkin=instance, text=recommendation_text)

@receiver(models.signals.post_save, sender= Hydration)
def hydratation_goal_achieved(sender, instance, created, **kwargs):
    goals_user = Goal.objects.filter(user = instance.user).first()

    if instance.quantity >= goals_user.hydration_goal and not instance.goal_achieved:
        instance.goal_achieved = True
        instance.save(update_fields=["goal_achieved"])

@receiver(models.signals.post_save, sender= Steps)
def steps_goal_achieved(sender, instance, created, **kwargs):
    goals_user = Goal.objects.filter(user = instance.user).first()

    if instance.steps >= goals_user.steps_goal and not instance.goal_achieved:
        instance.goal_achieved = True
        instance.save(update_fields=["goal_achieved"])