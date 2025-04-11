from django.db import models
from apps.user.models import User

class Objective(models.Model):
    class Meta:
        verbose_name = 'Objective'
        verbose_name_plural = "Objectives"

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    description = models.TextField()
    status = models.CharField(max_length=50)

    def __str__(self):
        return f"Objetivos de {self.user.username}"
    
class DailyJournal(models.Model):
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

class Achievement(models.Model):
    class Meta:
        verbose_name = 'Achievement'
        verbose_name_plural = "Achievements"

    name = models.CharField(max_length=100)
    category = models.CharField(max_length=50)
    description = models.TextField()

    def __str__(self):
        return f"Conquista: {self.name}"

class MotivationalMessage(models.Model):
    class Meta:
        verbose_name = 'Motivational Message'
        verbose_name_plural = "Motivational Messages"

    message = models.TextField()
    category = models.CharField(max_length=50)

    def __str__(self):
        return f"Mensagem: {self.message}"

class AchievementLog(models.Model):
    class Meta:
        verbose_name = 'Achievement Log'
        verbose_name_plural = "Achievement Logs"
        
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    achievement = models.ForeignKey(Achievement, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Conquista de {self.user.username}"

class AchievementRule(models.Model):
    class Meta:
        verbose_name = 'Achievement Rule'
        verbose_name_plural = "Achievement Rules"

    achievement = models.ForeignKey(Achievement, on_delete=models.CASCADE)
    min_event_count = models.IntegerField()
    streak_required = models.IntegerField(default=0)

    def __str__(self):
        return f"Regras da conquista {self.achievement.name}"
