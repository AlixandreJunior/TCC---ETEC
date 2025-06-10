from django.urls import path
from apps.mental_health.views import diary, mindfulness

app_name = 'mental_health'

urlpatterns = [
    path('diary/', diary.DiaryListView.as_view(), name='diary_list'),
    path('diary/detail/<str:date>/', diary.DiaryObjectView.as_view(), name = 'diary_object'),
    path('diary/detail/<str:date>/update/', diary.DiaryUpdateView.as_view(), name = 'diary_update'),
    path('diary/create/', diary.DiaryCreateView.as_view(), name = 'diary_create'),

    path('mindfulness/', mindfulness.MindfulnessListView.as_view(), name='mindfulness_list'),
    path('mindfulness/log/', mindfulness.MindfulnessLogListView.as_view(), name='mindfulness_log_list'),
    path('mindfulness/log/register/', mindfulness.MindfulnessLogRegisterView.as_view(), name='mindfulness_log_register'),
]