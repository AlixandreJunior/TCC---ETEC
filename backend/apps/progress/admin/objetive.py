from django.contrib import admin
from apps.progress.models.objetives import Objective

@admin.register(Objective)
class ObjectiveAdmin(admin.ModelAdmin):
    list_display = ('name', 'user', 'status')
    list_filter = ('status',)
    search_fields = ('name', 'description', 'user__username')