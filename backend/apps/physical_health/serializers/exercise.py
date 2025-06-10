from rest_framework import serializers
from apps.physical_health.models.exercise import Exercise, ExerciseLog

class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = ['id', 'name', 'type', 'is_distance']

class ExerciseLogSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    exercise = ExerciseSerializer(read_only=True)
    exercise_id = serializers.PrimaryKeyRelatedField(
        queryset=Exercise.objects.all(), write_only=True, source='exercise'
    )

    class Meta:
        model = ExerciseLog
        fields = [
            'id',
            'user',
            'exercise',
            'exercise_id',
            'duration',
            'distance',
            'description',
            'datetime',
        ]
        read_only_fields = ['id', 'user', 'datetime']