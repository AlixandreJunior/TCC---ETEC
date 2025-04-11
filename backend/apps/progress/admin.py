from django.contrib import admin
from .models import (Objective, DailyJournal, Achievement, MotivationalMessage, AchievementLog, AchievementRule
)

@admin.register(Objective)
class ObjectiveAdmin(admin.ModelAdmin):
    list_display = ('name', 'user', 'status')
    list_filter = ('status',)
    search_fields = ('name', 'description', 'user__username')

@admin.register(DailyJournal)
class DailyJournalAdmin(admin.ModelAdmin):
    list_display = ('title', 'user', 'date')
    list_filter = ('date',)
    search_fields = ('title', 'content', 'user__username')

@admin.register(Achievement)
class AchievementAdmin(admin.ModelAdmin):
    list_display = ('name', 'category')
    list_filter = ('category',)
    search_fields = ('name', 'description')

@admin.register(MotivationalMessage)
class MotivationalMessageAdmin(admin.ModelAdmin):
    list_display = ('message', 'category')
    list_filter = ('category',)
    search_fields = ('message',)

@admin.register(AchievementLog)
class AchievementLogAdmin(admin.ModelAdmin):
    list_display = ('user', 'achievement', 'created_at')
    list_filter = ('created_at', 'achievement')
    search_fields = ('user__username', 'achievement__name')

@admin.register(AchievementRule)
class AchievementRuleAdmin(admin.ModelAdmin):
    list_display = ('achievement', 'min_event_count', 'streak_required')
    search_fields = ('achievement__name',)
