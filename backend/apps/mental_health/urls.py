from django.urls import path
from apps.mental_health.views import checkin, diary, mindfulness

app_name = 'mental_health'

urlpatterns = [
    path('check-in/', checkin.CheckInListView.as_view(), name='checkin_list'),
    path('check-in/create/', checkin.CheckInCreateView.as_view(), name = 'checkin_create'),

    path('diary/', diary.DiaryListView.as_view(), name='diary_list'),
    path('diary/detail/<str:date>/', diary.DiaryObjectView.as_view(), name = 'diary_object'),
    path('diary/detail/<str:date>/update/', diary.DiaryUpdateView.as_view(), name = 'diary_update'),
    path('diary/create/', diary.DiaryCreateView.as_view(), name = 'diary_create'),

    path('mindfulness/', mindfulness.MindfulnessListView.as_view(), name='mindfulness_list'),
    path('mindfulness/log/', mindfulness.MindfulnessLogListView.as_view(), name='mindfulness_log_list'),
    path('mindfulness/log/register/', mindfulness.MindfulnessLogRegisterView.as_view(), name='mindfulness_log_register'),
]