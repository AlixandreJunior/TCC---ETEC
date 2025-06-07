from django.contrib import admin
from apps.mental_health.models.checkin import MentalCheckin

@admin.register(MentalCheckin)
class MentalCheckinAdmin(admin.ModelAdmin):
    list_display = ('user', 'date', 'mood', 'stress_level', 'anxiety_level')
    list_filter = ('mood', 'date')
    search_fields = ('user__username',)