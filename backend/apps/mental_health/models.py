from django.db import models
from apps.user.models import User

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

class WellnessCheckin(models.Model):
    class Meta:
        verbose_name = 'Wellness Check-In'
        verbose_name_plural = "Wellness Check-ins"

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    mood = models.CharField(max_length=50, blank=True, null=True)
    mood_intensity = models.IntegerField()
    stress_level = models.IntegerField()
    anxiety_level = models.IntegerField()
    score = models.IntegerField()
    date = models.DateField()

    def __str__(self):
        return f"Check-In Menatal de {self.user.username} em {self.date}"

class MindfulnessLog(models.Model):
    class Meta:
        verbose_name = 'Mindfulness Log'
        verbose_name_plural = "Mindfulness Logs"

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    mindfulness = models.ForeignKey(Mindfulness, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Registro de Midnfullnes de {self.user.username} em {self.created_at}"

class EmotionalJournal(models.Model):
    class Meta:
        verbose_name = 'Emotional Journal'
        verbose_name_plural = "Emotional Journals"

    checkin = models.ForeignKey(WellnessCheckin, on_delete=models.CASCADE)
    content = models.TextField()

    def __str__(self):
        return f"Diario Emocional incluso no {self.checkin}"
