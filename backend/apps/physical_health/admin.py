from django.contrib import admin
from .models import (HydrationLog, Exercise,PhysicalCheckin,StepsLog,ExerciseLog)

@admin.register(HydrationLog)
class HydrationAdmin(admin.ModelAdmin):
    list_display = ("user", "quantity", "goal_achieved", "date")
    list_filter = ("goal_achieved", "date")
    search_fields = ("user__username",)

@admin.register(Exercise)
class ExerciseAdmin(admin.ModelAdmin):
    list_display = ("name", "type", "duration", "difficulty")
    search_fields = ("name", "type")
    list_filter = ("difficulty",)

@admin.register(PhysicalCheckin)
class PhysicalCheckinAdmin(admin.ModelAdmin):
    list_display = ("user", "date", "energy_level", "activity_level",)
    list_filter = ("sleep_quality", "healthy_eating", "is_pain", "date")
    search_fields = ("user__username",)

@admin.register(StepsLog)
class StepsAdmin(admin.ModelAdmin):
    list_display = ("user", "steps", "goal_achieved", "date")
    list_filter = ("goal_achieved", "date")
    search_fields = ("user__username",)

@admin.register(ExerciseLog)
class ExerciseLogAdmin(admin.ModelAdmin):
    list_display = ("user", "exercise", "created_at",)
    list_filter = ("created_at",)
    search_fields = ("user__username", "exercise__name")
