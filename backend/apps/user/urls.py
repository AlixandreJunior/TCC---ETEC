from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.UserObjectView.as_view()),
    path('create/', views.UserCreateView.as_view()),
    path('update/', views.UserUpdateView.as_view()),
    path('delete/', views.UserDeleteView.as_view()),

    path('goals/', views.GoalsObjectView.as_view()),
    path('goals/update/', views.GoalsUpdateView.as_view()),
]