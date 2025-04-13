from rest_framework import serializers
from .models import (
    Hydration,
    Exercise,
    PhysicalCheckin,
    Steps,
    ExerciseLog,
    PhysicalRecommendation
)


class HydrationSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Hydration
        fields = ['id', 'user', 'quantity', 'goal_achieved', 'date']


class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = ['id', 'name', 'duration', 'type', 'description', 'difficulty']


class PhysicalCheckinSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)

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
        ]


class StepsSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Steps
        fields = ['id', 'user', 'steps', 'goal_achieved', 'date']


class ExerciseLogSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    exercise = ExerciseSerializer(read_only=True)

    class Meta:
        model = ExerciseLog
        fields = ['id', 'user', 'exercise', 'rating', 'created_at']


class PhysicalRecommendationSerializer(serializers.ModelSerializer):
    checkin = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = PhysicalRecommendation
        fields = ['id', 'checkin', 'recommendation_text', 'created_at']
