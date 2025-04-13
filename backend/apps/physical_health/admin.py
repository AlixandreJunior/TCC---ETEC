from django.contrib import admin
from .models import (Hydration, Exercise,PhysicalCheckin,Steps,ExerciseLog,PhysicalRecommendation,)

@admin.register(Hydration)
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
    list_display = ("user", "date", "energy_level", "activity_level", "score")
    list_filter = ("sleep_quality", "healthy_eating", "is_pain", "is_smoked", "is_alcohol", "date")
    search_fields = ("user__username",)

@admin.register(Steps)
class StepsAdmin(admin.ModelAdmin):
    list_display = ("user", "steps", "goal_achieved", "date")
    list_filter = ("goal_achieved", "date")
    search_fields = ("user__username",)

@admin.register(ExerciseLog)
class ExerciseLogAdmin(admin.ModelAdmin):
    list_display = ("user", "exercise", "created_at", "rating")
    list_filter = ("created_at", "rating")
    search_fields = ("user__username", "exercise__name")

@admin.register(PhysicalRecommendation)
class PhysicalRecommendationAdmin(admin.ModelAdmin):
    list_display = ("checkin", "created_at")
    search_fields = ("checkin__user__username",)
    readonly_fields = ("created_at",)
