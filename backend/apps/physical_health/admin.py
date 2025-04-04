from django.contrib import admin
from . import models

# Cadastro de Hidratação
@admin.register(models.Hydration)
class HydrationAdmin(admin.ModelAdmin):
    list_display = ('user', 'quantity', 'goal_achieved', 'date')
    search_fields = ('user__username',)
    list_filter = ('date', 'goal_achieved')

# Cadastro de Exercícios
@admin.register(models.Exercise)
class ExerciseAdmin(admin.ModelAdmin):
    list_display = ('id', 'type', 'duration', 'difficulty')
    search_fields = ('user__username', 'type')
    list_filter = ('difficulty',)

# Cadastro de Check-in de Saúde Física
@admin.register(models.PhysicalCheckin)
class PhysicalCheckInAdmin(admin.ModelAdmin):
    list_display = ('user', 'energy_level', 'sleep_quality', 'healthy_eating', 'activity_level', 'is_pain', 'checkin_date')
    search_fields = ('user__username',)
    list_filter = ('energy_level', 'sleep_quality', 'healthy_eating', 'activity_level', 'is_pain', 'checkin_date')

# Cadastro de Monitoramento de Passos
@admin.register(models.Steps)
class StepTrackerAdmin(admin.ModelAdmin):
    list_display = ('user', 'steps', 'goal_achieved', 'date')
    search_fields = ('user__username',)
    list_filter = ('date', 'goal_achieved')

# Cadastro de Registros de Exercício
@admin.register(models.ExerciseLog)
class ExerciseLogAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'exercise', 'created_at')
    search_fields = ('user__username',)
    list_filter = ('created_at',)

# Cadastro de Diário Físico
@admin.register(models.PhysicalJournalEntry)
class PhysicalJournalEntryAdmin(admin.ModelAdmin):
    list_display = ('checkin', 'created_at', 'description', )
    search_fields = ('checkin__user__username', 'description')
    list_filter = ('created_at',)
