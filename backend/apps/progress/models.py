from django.db import models
from django.utils import timezone
from django.dispatch import receiver
from apps.user.models import User

class UserProgress(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='progress')
    score = models.IntegerField(default=0)
    streak = models.IntegerField(default=0)
    max_streak = models.IntegerField(default=0)

    last_checkin_date = models.DateField(null=True, blank=True)
    total_check_ins = models.IntegerField(default=0)

    def __str__(self):
        return f"Progresso de {self.user.username}"

    def decrease_score(self):
        today = timezone.now().date()

        if self.last_check_in and (today - self.last_check_in).days >= 2:
            self.score = max(0, self.score - 5)
            self.streak = 0
            self.save()
    

class Objective(models.Model):
    class Meta:
        verbose_name = 'Objective'
        verbose_name_plural = "Objectives"
    
    STATUS_CHOICES = [
        ('pendente', 'Pendente'),
        ('em_andamento', 'Em Andamento'),
        ('concluido', 'Concluído'),
        ('cancelado', 'Cancelado'),
        ('atrasado', 'Atrasado')
    ]

    PRIORITY_CHOICES = [
        ('baixa', 'Baixa'),
        ('media', 'Média'),
        ('alta', 'Alta'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    description = models.TextField()
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='pendente')
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES, default='media')
    deadline = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"Objetivos de {self.user.username}"

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
    
#Signals

@receiver(models.signals.post_save, sender = UserProgress)
def set_max_streak(sender, instance, **kwargs):
    max_streak = instance.max_streak
    streak = instance.streak

    if streak > max_streak:
        max_streak = streak
        instance.save(update_fields=["max_streak"])