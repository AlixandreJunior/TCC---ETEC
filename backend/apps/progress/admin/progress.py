from django.contrib import admin
from apps.progress.models.progress import UserProgress

@admin.register(UserProgress)
class UserProgressAdmin(admin.ModelAdmin):
    list_display = ('user', 'score', 'streak', 'max_streak', 'last_checkin_date', 'total_check_ins')
    list_filter = ('last_checkin_date',)
    search_fields = ('user__username',)