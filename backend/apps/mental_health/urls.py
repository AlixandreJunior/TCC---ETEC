from django.urls import path
from . import views

app_name = 'mental_health'

urlpatterns = [
    path('check-in/', views.CheckInListView.as_view(), name='checkin_list'),
    path('check-in/create/', views.CheckInCreateView.as_view(), name = 'checkin_create'),

    path('diary/', views.DiaryListView.as_view(), name='diary_list'),
    path('diary/<str:date>/', views.DiaryObjectView.as_view(), name = 'diary_object'),
    path('diary/create/', views.DiaryCreateView.as_view(), name = 'diary_create'),

    path('mindfulness/', views.MindfulnessListView.as_view(), name='mindfulness_list'),
    path('mindfulness/log/', views.MindfulnessLogListView.as_view(), name='mindfulness_log'),
    path('mindfulness/log/register/', views.MindfulnessLogRegisterView.as_view(), name='mindfulness_log_register'),
]