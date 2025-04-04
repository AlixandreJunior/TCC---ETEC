from django.contrib import admin
from . import models

@admin.register(models.User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'username', 'first_name', 'last_name', 'email', 'is_active', 'created_at')
    search_fields = ('username', 'email', 'first_name', 'last_name')
    list_filter = ('is_active', 'created_at')

# Cadastro de Metas
@admin.register(models.Goal)
class GoalsAdmin(admin.ModelAdmin):
    list_display = ('user', 'hydration_goal', 'steps_goal', 'exercise_goal', 'mindfulness_goal')
    search_fields = ('user__username',)
    list_filter = ('user',)