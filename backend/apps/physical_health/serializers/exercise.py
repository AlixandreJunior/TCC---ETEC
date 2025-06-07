from rest_framework import serializers
from apps.physical_health.models.exercise import Exercise, ExerciseLog

class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = ['id', 'name', 'duration', 'type', 'description', 'difficulty']

class ExerciseLogSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = ExerciseLog
        fields = ['id', 'user', 'exercise', 'created_at']
