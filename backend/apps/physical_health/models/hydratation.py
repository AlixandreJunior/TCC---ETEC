from django.db import models
from django.dispatch import receiver
from apps.user.models.user import User, Goal

class HydrationLog(models.Model):
    class Meta:
        verbose_name = 'Hydration'
        verbose_name_plural = "Hydration"

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    goal_achieved = models.BooleanField()
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"Monitoramento de hidratação de {self.user.username} em {self.date}"
    
@receiver(models.signals.post_save, sender= HydrationLog)
def hydratation_goal_achieved(sender, instance, created, **kwargs):
    goals_user = Goal.objects.filter(user = instance.user).first()

    if instance.quantity >= goals_user.hydration_goal and not instance.goal_achieved:
        instance.goal_achieved = True
        instance.save(update_fields=["goal_achieved"])