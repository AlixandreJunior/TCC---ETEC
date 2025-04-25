from django.urls import path
from . import views

app_name = 'physical_health'

urlpatterns = [
    path('check-in/', views.CheckInListView.as_view(), name='checkin_list'),
    path('check-in/create/', views.CheckInCreateView.as_view(), name = 'checkin_create'),

    path('steps/', views.StepsLogListView.as_view(), name='steps_list'),
    path('steps/register/', views.StepsLogRegisterView.as_view(), name= 'steps_register'),

    path('hydratation/', views.HydratationLogListView.as_view(), name = 'hydratation_list'),
    path('hydratation/register/', views.HydratationLogRegisterView.as_view(), name = 'hydratation_register'),

    path('exercise/', views.ExerciseListView.as_view(), name='exercise_list'),
    path('exercise/log/', views.ExerciseLogView.as_view(), name='exercise_log_list'),
    path('exercise/log/register/', views.ExerciseLogRegisterView.as_view(), name='exercise_log_register'),
]