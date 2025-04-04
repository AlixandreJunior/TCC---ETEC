from django.db import models
from apps.user.models import User

CHOICES = [('Ruim', 'Ruim'), ('Medio', 'Medio'), ('Bom', 'Bom')]

class Hydration(models.Model):
    class Meta:
        verbose_name = 'Hydration'
        verbose_name_plural = "Hydration"

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    goal_achieved = models.BooleanField()
    date = models.DateField()

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
    energy_level = models.IntegerField()
    sleep_quality = models.CharField(max_length=50, choices=CHOICES)
    healthy_eating = models.CharField(max_length=50, choices=CHOICES )
    activity_level = models.IntegerField()
    is_pain = models.BooleanField()
    is_smoked = models.BooleanField()
    is_alcohol = models.BooleanField()
    checkin_date = models.DateField()

    def __str__(self):
        return f"Check In Fisico de {self.user.username} em {self.checkin_date}"

class Steps(models.Model):
    class Meta:
        verbose_name = 'Exercise Log'
        verbose_name_plural = "Exercise Logs"

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    steps = models.IntegerField()
    goal_achieved = models.BooleanField()
    date = models.DateField()

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

class PhysicalJournalEntry(models.Model):
    checkin = models.ForeignKey(PhysicalCheckin, on_delete=models.CASCADE, related_name="journal_entries")
    description = models.TextField()  
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Registro de {self.checkin.user.username} - {self.created_at}"
