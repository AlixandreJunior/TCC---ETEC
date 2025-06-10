from django.contrib import admin
from apps.mental_health.models.diary import Activity, Diary

@admin.register(Activity)
class ActivityAdmin(admin.ModelAdmin):
    list_display = ['id', 'name']
    search_fields = ['name']

@admin.register(Diary)
class DiaryAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'title', 'mood', 'datetime']
    list_filter = ['mood', 'datetime']
    search_fields = ['title', 'content', 'user__username']
    autocomplete_fields = ['user', 'activities']
    date_hierarchy = 'datetime'
