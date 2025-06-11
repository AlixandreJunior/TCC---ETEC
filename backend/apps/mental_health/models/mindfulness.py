from django.db import models
from django.utils import timezone
from django.dispatch import receiver
from django.core.validators import MinValueValidator, MaxValueValidator
from apps.user.models import User

class Mindfulness(models.Model):
    class TypeChoices(models.TextChoices):
        RESPIRACAO_CONSCIENTE = 'Respiração Consciente', 'Respiração Consciente'
        MEDITACAO_MINDFULNESS = 'Meditação Mindfulness', 'Meditação Mindfulness'
        CONSCIENCIA_EMOCIONAL = 'Consciência Emocional', 'Consciência Emocional'
        ATIVIDADES_COTIDIANAS = 'Atenção nas Atividades', 'Atenção nas Atividades'

    class Meta:
        verbose_name = 'Mindfulness'
        verbose_name_plural = "Mindfulness"

    name = models.CharField(max_length=255)
    type = models.CharField(max_length=22, choices = TypeChoices.choices)

    def __str__(self):
        return f"Mindfulness {self.name}"
    
class MindfulnessLog(models.Model):
    class Meta:
        verbose_name = 'Mindfulness Log'
        verbose_name_plural = "Mindfulness Logs"

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    mindfulness = models.ForeignKey(Mindfulness, on_delete=models.CASCADE)
    duration = models.PositiveIntegerField()
    description = models.TextField(max_length=200)
    datetime = models.DateTimeField(default = timezone.now)

    def __str__(self):
        return f"Registro de Midnfullnes de {self.user.username} em {self.created_at}"