from django.urls import path
from . import views

urlpatterns = [
    path('', views.ProgressView.as_view()),
    path('objective/', views.ObjectiveListView.as_view()),
    path('objective/create/', views.ObjectiveCreateView.as_view()),

    path('achievements/', views.AchievementsView.as_view()),
    path('achievements/user/', views.AchievementsUserView.as_view()),
]