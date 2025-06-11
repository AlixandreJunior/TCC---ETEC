from django.contrib import admin
from backend.apps.physical_health.models.hydratation import HydrationLog

@admin.register(HydrationLog)
class HydrationAdmin(admin.ModelAdmin):
    list_display = ("user", "quantity", "date")
    list_filter = ("date")
    search_fields = ("user__username",)