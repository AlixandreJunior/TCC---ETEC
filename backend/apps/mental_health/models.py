from django.db import models
from django.dispatch import receiver
from django.core.validators import MinValueValidator, MaxValueValidator
from apps.user.models import User

class Mindfulness(models.Model):
    class TypeChoices(models.TextChoices):
        ATENCAO_PLENA_RESPIRACAO = 'Foco na Respiração', 'Foco na Respiração'
        BODY_SCAN = 'Escaneamento Corporal', 'Escaneamento Corporal'
        MINDFULNESS_MOVIMENTO = 'Em Movimento', 'Em Movimento'
        PENSAMENTOS_EMOCOES = 'Pensamentos e Emoções', 'Pensamentos e Emoções'

    class DifficultyChoices(models.TextChoices):
        DIFICIL = 'Díficil', 'Díficil'
        INTERMEDIARIO = 'Intermediário', 'Intermediário'
        FACIL = 'Fácil', 'Fácil'

    class Meta:
        verbose_name = 'Mindfulness'
        verbose_name_plural = "Mindfulness"

    name = models.CharField(max_length=255)
    duration = models.PositiveIntegerField()
    type = models.CharField(max_length=100, choices=TypeChoices.choices)
    description = models.TextField()
    difficulty = models.CharField(max_length=50, choices = DifficultyChoices.choices)

    def __str__(self):
        return f"Mindfulness {self.name}"

class MentalCheckin(models.Model):
    class MoodChoices(models.TextChoices):
        MUITO_FELIZ = 'Muito Feliz', 'Muito Feliz'
        FELIZ = 'Feliz', 'Feliz'
        NEUTRO = 'Neutro', 'Neutro'
        TRISTE = 'Triste', 'Triste'
        MUITO_TRISTE = 'Muito Triste', 'Muito Triste'

    class Meta:
        verbose_name = 'Wellness Check-In'
        verbose_name_plural = "Wellness Check-ins"

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    mood = models.CharField(max_length=50, choices=MoodChoices.choices)
    stress_level = models.PositiveIntegerField(validators=[MinValueValidator(0), MaxValueValidator(10)])
    anxiety_level = models.PositiveIntegerField(validators=[MinValueValidator(0), MaxValueValidator(10)])
    is_feeling_lonely = models.BooleanField() 
    is_low_self_esteem = models.BooleanField() 
    is_overwhelmed = models.BooleanField() 
    notes = models.TextField(blank=True, null=True)
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"Check-In Menatal de {self.user.username} em {self.date}"

class MindfulnessLog(models.Model):
    class Meta:
        verbose_name = 'Mindfulness Log'
        verbose_name_plural = "Mindfulness Logs"

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    mindfulness = models.ForeignKey(Mindfulness, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Registro de Midnfullnes de {self.user.username} em {self.created_at}"
    
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