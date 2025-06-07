from django.urls import path
from apps.user.views import goals, user

app_name = "user"

urlpatterns = [
    path('', user.UserObjectView.as_view(), name="user"),
    path('create/', user.UserCreateView.as_view(), name="user_create"),
    path('update/', user.UserUpdateView.as_view(), name="user_update"),

    path('goals/', goals.GoalsObjectView.as_view(), name="user_goals"),
    path('goals/update/', goals.GoalsUpdateView.as_view(), name="user_goals_update"),
]