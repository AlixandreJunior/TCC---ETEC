from django.urls import path
from . import views

urlpatterns = [
    path('check-in/', views.CheckInListView.as_view()),
    path('check-in/create/', views.CheckInCreateView.as_view()),
    path('steps/', views.StepsView.as_view()),
    path('hydratation/', views.HydratationView.as_view()),
    path('exercise/', views.ExerciseListView.as_view()),
    path('exercise/log/', views.ExerciseLogView.as_view()),
    path('exercise/log/register/', views.ExerciseLogRegisterView.as_view()),
]