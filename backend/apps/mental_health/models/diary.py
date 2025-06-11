from django.db import models
from django.utils import timezone
from apps.user.models import User

class Activity(models.Model):
    class Meta:
        verbose_name = "Atividade"
        verbose_name_plural = "Atividades"

    name = models.CharField(max_length=50)

class Diary(models.Model):
    class MoodChoices(models.TextChoices):
        EXCELENTE = 'Excelente', 'Excelente'
        BOM = 'Bom', 'Bom'
        NEUTRO = 'Neutro', 'Neutro'
        RUIM = 'Ruim', 'Ruim'
        PESSIMO = 'Péssimo', 'Péssimo'

    class Meta:
        verbose_name = "Diário"
        verbose_name_plural = "Diários"

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    content = models.TextField()
    datetime = models.DateTimeField(default=timezone.now)
    mood = models.CharField(max_length=20, choices=MoodChoices.choices)
    activities = models.ManyToManyField(Activity, blank=True)
    photo = models.ImageField(upload_to='diary/photos/', null=True, blank=True)

    def __str__(self):
        return f"Diário de {self.user.username} em {self.date.strftime('%d/%m/%Y')}"