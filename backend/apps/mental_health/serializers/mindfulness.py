from django.utils import timezone
from rest_framework import serializers
from apps.mental_health.models.mindfulness import Mindfulness, MindfulnessLog
from utils.generate_recomendation import mental_generate_recommendation

class MindfulnessSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mindfulness
        fields = ['id', 'name', 'duration', 'type', 'description', 'difficulty']

class MindfulnessLogSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = MindfulnessLog
        fields = ['id', 'user', 'mindfulness', 'created_at']