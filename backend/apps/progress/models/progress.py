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
            
#Signals

@receiver(models.signals.post_save, sender = UserProgress)
def set_max_streak(sender, instance, **kwargs):
    max_streak = instance.max_streak
    streak = instance.streak

    if streak > max_streak:
        max_streak = streak
        instance.save(update_fields=["max_streak"])

@receiver(models.signals.post_save, sender = User)
def set_max_streak(sender, instance, created, **kwargs):
    if created:
        UserProgress.objects.get_or_create(user = instance)