from django.contrib import admin
from apps.physical_health.models.steps import StepsLog

@admin.register(StepsLog)
class StepsAdmin(admin.ModelAdmin):
    list_display = ("user", "steps", "date")
    list_filter = ("date",)
    search_fields = ("user__username",)
