from apps.user.auth.views import LoginView, LogoutView, RefreshView, VerifyView
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/mental/', include('apps.mental_health.urls')),
    path('api/physical/', include('apps.physical_health.urls')),
    path('api/progress/', include('apps.progress.urls')),    
    path('api/user/', include('apps.user.urls')),

    path('api/login/', LoginView.as_view(), name="login"),
    path('api/logout/', LogoutView.as_view(), name="logout"),
    path('api/refresh/', RefreshView.as_view(), name="refresh"),
    path('api/verify/', VerifyView.as_view(), name="verify"),
]