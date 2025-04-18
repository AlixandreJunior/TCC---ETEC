from django.contrib import admin
from .models import User, Goal
from django.utils.translation import gettext_lazy as _

class UserAdmin(admin.ModelAdmin):
    model = User
    list_display = ('id', 'username', 'email', 'is_active', 'notifications', 'created_at', 'gender', 'birth_date')
    list_filter = ('is_active', 'notifications', 'gender')
    search_fields = ('username', 'email')
    ordering = ('id',)
    readonly_fields = ('created_at',)

    fieldsets = (
        (None, {'fields': ('username', 'email', 'password')}),
        (_('Informações Pessoais'), {'fields': ('birth_date', 'gender', 'avatar')}),
        (_('Permissões'), {'fields': ('is_active', 'is_staff', 'is_superuser')}),
        (_('Preferências'), {'fields': ('notifications',)}),
        (_('Datas Importantes'), {'fields': ('last_login', 'date_joined', 'created_at')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'password1', 'password2', 'birth_date', 'gender', 'avatar', 'notifications', 'is_active', 'is_staff', 'is_superuser'),
        }),
    )

    def save_model(self, request, obj, form, change):
        if not obj.pk:
            # Garantir que a criação de um novo usuário tenha metas associadas
            Goal.objects.get_or_create(user=obj)
        super().save_model(request, obj, form, change)

admin.site.register(User, UserAdmin)

class GoalAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'hydration_goal', 'steps_goal', 'exercise_goal', 'mindfulness_goal')
    search_fields = ('user__username', 'user__email')
    list_filter = ('hydration_goal', 'steps_goal', 'exercise_goal', 'mindfulness_goal')
    ordering = ('id',)

admin.site.register(Goal, GoalAdmin)
