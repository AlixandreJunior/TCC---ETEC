from django.urls import path
from . import views

app_name = 'progress'

urlpatterns = [
    path('', views.ProgressView.as_view(), name='progress'),
    path('objective/', views.ObjectiveListView.as_view(), name="objective"),
    path('objective/create/', views.ObjectiveCreateView.as_view(), name="objective_create"),

    path('achievements/', views.AchievementsView.as_view(), name="achievements"),
    path('achievements/user/', views.AchievementsUserView.as_view(), name="achievements_user"),
]