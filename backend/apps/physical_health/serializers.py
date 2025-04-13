from rest_framework import serializers
from .models import (
    Hydration,
    Exercise,
    PhysicalCheckin,
    Steps,
    ExerciseLog,
)
from utils.generate_recomendation import physic_generate_recommendation

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
