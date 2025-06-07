from django.contrib import admin
from apps.physical_health.models.exercise import Exercise, ExerciseLog

@admin.register(Exercise)
class ExerciseAdmin(admin.ModelAdmin):
    list_display = ("name", "type", "duration", "difficulty")
    search_fields = ("name", "type")
    list_filter = ("difficulty",)

@admin.register(ExerciseLog)
class ExerciseLogAdmin(admin.ModelAdmin):
    list_display = ("user", "exercise", "created_at",)
    list_filter = ("created_at",)
    search_fields = ("user__username", "exercise__name")