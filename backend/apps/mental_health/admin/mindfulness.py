from django.contrib import admin
from apps.mental_health.models.mindfulness import Mindfulness, MindfulnessLog

@admin.register(Mindfulness)
class MindfulnessAdmin(admin.ModelAdmin):
    list_display = ('name', 'duration', 'type', 'difficulty')
    search_fields = ('name', 'type', 'difficulty')
    list_filter = ('type', 'difficulty')

@admin.register(MindfulnessLog)
class MindfulnessLogAdmin(admin.ModelAdmin):
    list_display = ('user', 'mindfulness', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('user__username', 'mindfulness__name')