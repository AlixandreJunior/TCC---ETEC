from django.urls import path
from . import views

app_name = "user"

urlpatterns = [
    path('', views.UserObjectView.as_view(), name="user"),
    path('create/', views.UserCreateView.as_view(), name="user_create"),
    path('update/', views.UserUpdateView.as_view(), name="user_update"),

    path('goals/', views.GoalsObjectView.as_view(), name="user_goals"),
    path('goals/update/', views.GoalsUpdateView.as_view(), name="user_goals_update"),
]