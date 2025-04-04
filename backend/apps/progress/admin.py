from django.contrib import admin
from . import models
# Cadastro de Objetivos
@admin.register(models.Objective)
class ObjectivesAdmin(admin.ModelAdmin):
    list_display = ('user', 'name', 'status')
    search_fields = ('user__username', 'name')
    list_filter = ('status',)

# Cadastro de Conquistas
@admin.register(models.Achievement)
class AchievementsAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'description')
    search_fields = ('name', 'category')

# Cadastro de Mensagens Motivacionais
@admin.register(models.MotivationalMessage)
class MotivationalMessageAdmin(admin.ModelAdmin):
    list_display = ('id', 'message', 'category')
    search_fields = ('message',)
    list_filter = ('category',)

# Cadastro de Registro de Conquistas
@admin.register(models.AchievementLog)
class AchievementLogAdmin(admin.ModelAdmin):
    list_display = ('user', 'achievement', 'created_at')
    search_fields = ('user__username', 'achievement__name')
    list_filter = ('created_at',)

# Cadastro de Regras de Conquistas
@admin.register(models.AchievementRule)
class AchievementRulesAdmin(admin.ModelAdmin):
    list_display = ('id', 'achievement', 'min_event_count', 'streak_required')
    search_fields = ('achievement__name',)
