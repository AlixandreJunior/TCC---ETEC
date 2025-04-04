from django.db import models
from apps.user.models import User

class Hydration(models.Model):
    class Meta:
        verbose_name = 'Hydration'
        verbose_name_plural = "Hydration"

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    goal_achieved = models.BooleanField()
    date = models.DateField()

class Exercise(models.Model):
    class Meta:
        verbose_name = 'Exercise'
        verbose_name_plural = "Exercises"

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    duration = models.IntegerField()
    type = models.CharField(max_length=100)
    description = models.TextField()
    difficulty = models.CharField(max_length=50)

    def __str__(self):
        return f"Sintomas Fisicos relatados no Check-In {self.checkin}"

class PhysicalCheckin(models.Model):
    class Meta:
        verbose_name = 'Physical Check-In'
        verbose_name_plural = "Physical Check-Ins"

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    energy_level = models.IntegerField()
    sleep_quality = models.CharField(max_length=50)
    healthy_eating = models.CharField(max_length=50)
    activity_level = models.IntegerField()
    is_pain = models.BooleanField()
    is_smoked = models.BooleanField()
    is_alcohol = models.BooleanField()
    checkin_date = models.DateField()

    def __str__(self):
        return f"Sintomas Fisicos relatados no Check-In {self.checkin}"

class Steps(models.Model):
    class Meta:
        verbose_name = 'Exercise Log'
        verbose_name_plural = "Exercise Logs"

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    steps = models.IntegerField()
    goal_achieved = models.BooleanField()
    date = models.DateField()

    def __str__(self):
        return f"Sintomas Fisicos relatados no Check-In {self.checkin}"
    

class ExerciseLog(models.Model):
    class Meta:
        verbose_name = 'Exercise Log'
        verbose_name_plural = "Exercise Logs"

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    exercise = models.ForeignKey(Exercise, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Registro de Exercircio de {self.user.username}"

class PhysicalSymptom(models.Model):
    class Meta:
        verbose_name = 'Physical Symptom'
        verbose_name_plural = "Physical Symptons"

    checkin = models.ForeignKey(PhysicalCheckin, on_delete=models.CASCADE)
    symptom = models.CharField(max_length=100)
    pain_level = models.IntegerField()

    def __str__(self):
        return f"Sintomas Fisicos relatados no Check-In {self.checkin}"
