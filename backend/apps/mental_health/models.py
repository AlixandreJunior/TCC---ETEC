from django.db import models
from apps.user.models import User

class EmotionalJournal(models.Model):
    checkin = models.ForeignKey("WellnessCheckin", on_delete=models.CASCADE)
    content = models.TextField()

class Mindfulness(models.Model):
    duration = models.IntegerField()
    type = models.CharField(max_length=100)
    description = models.TextField()
    difficulty = models.CharField(max_length=50, blank=True, null=True)

class WellnessCheckin(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    mood = models.CharField(max_length=50, blank=True, null=True)
    mood_intensity = models.IntegerField()
    stress_level = models.IntegerField()
    anxiety_level = models.IntegerField()
    score = models.IntegerField()
    date = models.DateField()

class MindfulnessLog(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    mindfulness = models.ForeignKey(Mindfulness, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
