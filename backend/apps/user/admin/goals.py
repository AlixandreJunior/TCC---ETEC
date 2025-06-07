from django.contrib import admin
from apps.user.models.user import Goal

class GoalAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'hydration_goal', 'steps_goal', 'exercise_goal', 'mindfulness_goal')
    search_fields = ('user__username', 'user__email')
    list_filter = ('hydration_goal', 'steps_goal', 'exercise_goal', 'mindfulness_goal')
    ordering = ('id',)

admin.site.register(Goal, GoalAdmin)
