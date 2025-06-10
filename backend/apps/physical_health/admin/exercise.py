from django.contrib import admin
from apps.physical_health.models.exercise import Exercise, ExerciseLog

@admin.register(Exercise)
class ExerciseAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'type', 'is_distance']
    list_filter = ['type', 'is_distance']
    search_fields = ['name']


@admin.register(ExerciseLog)
class ExerciseLogAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'exercise', 'duration', 'distance', 'datetime']
    list_filter = ['datetime', 'exercise__type']
    search_fields = ['user__username', 'exercise__name', 'description']
    autocomplete_fields = ['user', 'exercise']
    date_hierarchy = 'datetime'
