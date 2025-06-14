from django.contrib import admin
from apps.user.models.user import User, Goal
from django.utils.translation import gettext_lazy as _

class UserAdmin(admin.ModelAdmin):
    model = User
    list_display = ('id', 'username', 'email', 'is_active', 'notifications', 'created_at', )
    list_filter = ('is_active', 'notifications')
    search_fields = ('username', 'email')
    ordering = ('id',)
    readonly_fields = ('created_at',)

    fieldsets = (
        (None, {'fields': ('username', 'email', 'password')}),
        (_('Permissões'), {'fields': ('is_active', 'is_staff', 'is_superuser')}),
        (_('Preferências'), {'fields': ('notifications',)}),
        (_('Datas Importantes'), {'fields': ('last_login', 'date_joined', 'created_at')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'password1', 'password2', 'notifications', 'is_active', 'is_staff', 'is_superuser'),
        }),
    )

    def save_model(self, request, obj, form, change):
        if not obj.pk:
            Goal.objects.get_or_create(user=obj)
        super().save_model(request, obj, form, change)

admin.site.register(User, UserAdmin)

