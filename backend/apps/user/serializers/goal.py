from rest_framework import serializers
from apps.user.models.goals import Goal  

class GoalSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Goal
        fields = [
            'id',
            'user',
            'hydration_goal',
            'steps_goal',
            'exercise_goal',
            'mindfulness_goal',
        ]
