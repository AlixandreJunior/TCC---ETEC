from django.contrib import admin
from apps.mental_health.models.mindfulness import Mindfulness, MindfulnessLog

@admin.register(Mindfulness)
class MindfulnessAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'type']
    list_filter = ['type']
    search_fields = ['name']


@admin.register(MindfulnessLog)
class MindfulnessLogAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'mindfulness', 'duration', 'datetime']
    list_filter = ['datetime', 'mindfulness__type']
    search_fields = ['user__username', 'mindfulness__name', 'description']
    autocomplete_fields = ['user', 'mindfulness']
    date_hierarchy = 'datetime'
