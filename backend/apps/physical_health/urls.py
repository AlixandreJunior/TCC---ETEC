from django.urls import path
from apps.physical_health.views import exercise, steps, hydratation

app_name = 'physical_health'

urlpatterns = [
    path('steps/', steps.StepsLogListView.as_view(), name='steps_list'),#
    path('steps/register/', steps.StepsLogRegisterView.as_view(), name= 'steps_register'),#

    path('hydratation/', hydratation.HydratationLogListView.as_view(), name = 'hydratation_list'),#
    path('hydratation/register/', hydratation.HydratationLogRegisterView.as_view(), name = 'hydratation_register'),#

    path('exercise/', exercise.ExerciseListView.as_view(), name='exercise_list'),#
    path('exercise/log/', exercise.ExerciseLogView.as_view(), name='exercise_log_list'),#
    path('exercise/log/register/', exercise.ExerciseLogRegisterView.as_view(), name='exercise_log_register'),#
]