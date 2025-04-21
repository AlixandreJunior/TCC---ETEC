from rest_framework import serializers
from .models import (
    HydrationLog,
    Exercise,
    PhysicalCheckin,
    StepsLog,
    ExerciseLog,
)
from utils.generate_recomendation import physic_generate_recommendation

class HydrationLogSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = HydrationLog
        fields = ['id', 'user', 'quantity', 'goal_achieved', 'date']

class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = ['id', 'name', 'duration', 'type', 'description', 'difficulty']

class PhysicalCheckinSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    recommendation = serializers.SerializerMethodField()

    class Meta:
        model = PhysicalCheckin
        fields = [
            'id',
            'user',
            'energy_level',
            'activity_level',
            'sleep_quality',
            'healthy_eating',
            'is_pain',
            'is_took_medicine',
            'is_used_screen_too_much',
            'notes',
            'date',
            'recommendation'
        ]

    def get_recommendation(self, obj):
        physic_generate_recommendation(obj)

class StepsLogSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = StepsLog
        fields = ['id', 'user', 'steps', 'goal_achieved', 'date']


class ExerciseLogSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    exercise = ExerciseSerializer(read_only=True)

    class Meta:
        model = ExerciseLog
        fields = ['id', 'user', 'exercise', 'rating', 'created_at']
