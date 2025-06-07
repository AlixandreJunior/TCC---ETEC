from django.db import models
from apps.user.models import User

class Achievement(models.Model):
    class Meta:
        verbose_name = 'Achievement'
        verbose_name_plural = "Achievements"

    name = models.CharField(max_length=100)
    icon = models.ImageField(upload_to='achievements/', null=True, blank=True)
    category = models.CharField(max_length=50)
    condition = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return f"Conquista: {self.name}"

class AchievementLog(models.Model):
    class Meta:
        verbose_name = 'Achievement Log'
        verbose_name_plural = "Achievement Logs"
        
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    achievement = models.ForeignKey(Achievement, on_delete=models.CASCADE)
    date_awarded = models.DateField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'achievement')

    def __str__(self):
        return f"Conquista de {self.user.username}"