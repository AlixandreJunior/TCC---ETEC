from django.db import models
from django.dispatch import receiver
from apps.user.models.user import User, Goal

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
    
@receiver(models.signals.post_save, sender= StepsLog)
def steps_goal_achieved(sender, instance, created, **kwargs):
    goals_user = Goal.objects.filter(user = instance.user).first()

    if instance.steps >= goals_user.steps_goal and not instance.goal_achieved:
        instance.goal_achieved = True
        instance.save(update_fields=["goal_achieved"])