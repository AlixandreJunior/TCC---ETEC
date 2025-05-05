from django.contrib import admin
from .models import Mindfulness, MentalCheckin, MindfulnessLog

@admin.register(Mindfulness)
class MindfulnessAdmin(admin.ModelAdmin):
    list_display = ('name', 'duration', 'type', 'difficulty')
    search_fields = ('name', 'type', 'difficulty')
    list_filter = ('type', 'difficulty')

@admin.register(MentalCheckin)
class MentalCheckinAdmin(admin.ModelAdmin):
    list_display = ('user', 'date', 'mood', 'stress_level', 'anxiety_level')
    list_filter = ('mood', 'date')
    search_fields = ('user__username',)

@admin.register(MindfulnessLog)
class MindfulnessLogAdmin(admin.ModelAdmin):
    list_display = ('user', 'mindfulness', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('user__username', 'mindfulness__name')