from django.db import models
from django.dispatch import receiver
from django.core.validators import MinValueValidator, MaxValueValidator
from apps.user.models import User

class Diary(models.Model):
    class Meta:
        verbose_name = "Diário Pessoal"
        verbose_name_plural = "Diários Pessoais"
        ordering = ['-date']

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    content = models.TextField()
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"Diário de {self.user.username} em {self.date.strftime('%d/%m/%Y')}"