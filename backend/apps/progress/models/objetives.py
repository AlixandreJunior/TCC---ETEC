from django.db import models
from django.utils import timezone
from django.dispatch import receiver
from apps.user.models import User

class Objective(models.Model):
    class Meta:
        verbose_name = 'Objective'
        verbose_name_plural = "Objectives"
    
    from django.db import models

    class StatusChoices(models.TextChoices):
        PENDENTE = 'pendente', 'Pendente'
        EM_ANDAMENTO = 'em_andamento', 'Em Andamento'
        CONCLUIDO = 'concluido', 'Concluído'
        CANCELADO = 'cancelado', 'Cancelado'
        ATRASADO = 'atrasado', 'Atrasado'

    class PriorityChoices(models.TextChoices):
        BAIXA = 'baixa', 'Baixa'
        MEDIA = 'media', 'Média'
        ALTA = 'alta', 'Alta'


    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    description = models.TextField()
    status = models.CharField(max_length=50, choices=StatusChoices.choices, default=StatusChoices.PENDENTE)
    priority = models.CharField(max_length=10, choices=PriorityChoices.choices, default=PriorityChoices.MEDIA)
    deadline = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"Objetivos de {self.user.username}"
