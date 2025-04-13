from django.contrib import admin
from .models import Mindfulness, MentalCheckin, MindfulnessLog, MentalRecommendation

@admin.register(Mindfulness)
class MindfulnessAdmin(admin.ModelAdmin):
    list_display = ('name', 'duration', 'type', 'difficulty')
    search_fields = ('name', 'type', 'difficulty')
    list_filter = ('type', 'difficulty')

@admin.register(MentalCheckin)
class MentalCheckinAdmin(admin.ModelAdmin):
    list_display = ('user', 'date', 'mood', 'stress_level', 'anxiety_level', 'score')
    list_filter = ('mood', 'date')
    search_fields = ('user__username',)
    readonly_fields = ('score',)

@admin.register(MindfulnessLog)
class MindfulnessLogAdmin(admin.ModelAdmin):
    list_display = ('user', 'mindfulness', 'rating', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('user__username', 'mindfulness__name')

@admin.register(MentalRecommendation)
class MentalRecommendationAdmin(admin.ModelAdmin):
    list_display = ('checkin', 'get_user', 'created_at')
    search_fields = ('checkin__user__username',)
    readonly_fields = ('created_at',)

    def get_user(self, obj):
        return obj.checkin.user.username
    get_user.short_description = 'User'
