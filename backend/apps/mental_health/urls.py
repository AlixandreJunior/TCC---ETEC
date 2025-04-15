from django.urls import path
from . import views

urlpatterns = [
    path('check-in/', views.CheckInListView.as_view()),
    path('check-in/create/', views.CheckInCreateView.as_view()),

    path('diary/', views.DiaryListView.as_view()),
    path('diary/create/', views.DiaryCreateView.as_view()),

    path('mindfulness/', views.MindfulnessListView.as_view()),
    path('mindfulness/log/', views.MindfulnessObjectView.as_view()),
    path('mindfulness/log/register/', views.MindfulnessCreateView.as_view()),
]