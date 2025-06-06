from django.contrib import admin
from apps.physical_health.models.checkin import PhysicalCheckin

@admin.register(PhysicalCheckin)
class PhysicalCheckinAdmin(admin.ModelAdmin):
    list_display = ("user", "date", "energy_level", "activity_level",)
    list_filter = ("sleep_quality", "healthy_eating", "is_pain", "date")
    search_fields = ("user__username",)