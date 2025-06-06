from django.contrib import admin
from backend.apps.physical_health.models.hydratation import HydrationLog

@admin.register(HydrationLog)
class HydrationAdmin(admin.ModelAdmin):
    list_display = ("user", "quantity", "goal_achieved", "date")
    list_filter = ("goal_achieved", "date")
    search_fields = ("user__username",)