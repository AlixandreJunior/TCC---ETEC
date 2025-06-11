from rest_framework import serializers
from apps.physical_health.models.exercise import Exercise, ExerciseLog

class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = ['id', 'name', 'type', 'is_distance']

class ExerciseLogReadSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    exercise = ExerciseSerializer(read_only=True)

    class Meta:
        model = ExerciseLog
        fields = [
            'id',
            'user',
            'exercise',
            'duration',
            'distance',
            'description',
            'datetime',
        ]
        read_only_fields = fields  

class ExerciseLogWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExerciseLog
        fields = [
            'exercise',
            'duration',
            'distance',
            'description',
        ]
