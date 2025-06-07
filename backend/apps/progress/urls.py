from django.urls import path
from apps.progress.views import objetives, progress, achievement

app_name = 'progress'

urlpatterns = [
    path('', progress.ProgressView.as_view(), name='progress'),
    path('objective/', objetives.ObjectiveListView.as_view(), name="objective"),
    path('objective/create/', objetives.ObjectiveCreateView.as_view(), name="objective_create"),

    path('achievements/', achievement.AchievementsView.as_view(), name="achievements"),
    path('achievements/user/', achievement.AchievementsUserView.as_view(), name="achievements_user"),
]