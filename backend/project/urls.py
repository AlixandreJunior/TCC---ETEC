from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/mental/', include('apps.mental_health.urls')),
    path('api/physical/', include('apps.physical_health.urls')),
    path('api/progress/', include('apps.progress.urls')),    
    path('api/user/', include('apps.user.urls')),
]