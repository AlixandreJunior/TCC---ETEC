from django.contrib import admin
from . import models
# Cadastro de Diário Emocional
@admin.register(models.EmotionalJournal)
class EmotionalDiaryAdmin(admin.ModelAdmin):
    list_display = ('id', 'checkin', 'content')
    search_fields = ('checkin__user__username', 'content')

# Cadastro de Atividades de Mindfulness
@admin.register(models.Mindfulness)
class MindfulnessActivityAdmin(admin.ModelAdmin):
    list_display = ('id', 'type', 'duration', 'difficulty')
    search_fields = ('user__username', 'type')
    list_filter = ('difficulty',)

# Cadastro de Check-in de Bem-Estar
@admin.register(models.WellnessCheckin)
class WellnessCheckInAdmin(admin.ModelAdmin):
    list_display = ('user', 'mood', 'mood_intensity', 'stress_level', 'anxiety_level', 'score', 'date')
    search_fields = ('user__username',)
    list_filter = ('mood', 'date')

# Cadastro de Registros de Mindfulness
@admin.register(models.MindfulnessLog)
class MindfulnessLogAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'mindfulness', 'created_at')
    search_fields = ('user__username',)
    list_filter = ('created_at',)
