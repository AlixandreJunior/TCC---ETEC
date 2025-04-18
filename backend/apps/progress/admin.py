from django.contrib import admin
from .models import (Objective, Achievement, AchievementLog )

@admin.register(Objective)
class ObjectiveAdmin(admin.ModelAdmin):
    list_display = ('name', 'user', 'status')
    list_filter = ('status',)
    search_fields = ('name', 'description', 'user__username')

@admin.register(Achievement)
class AchievementAdmin(admin.ModelAdmin):
    list_display = ('name', 'category')
    list_filter = ('category',)
    search_fields = ('name', 'description')

@admin.register(AchievementLog)
class AchievementLogAdmin(admin.ModelAdmin):
    list_display = ('user', 'achievement',) 
    list_filter = ( 'achievement',)
    search_fields = ('user__username', 'achievement__name')

