from rest_framework import serializers
from apps.mental_health.models.mindfulness import Mindfulness, MindfulnessLog

class MindfulnessSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mindfulness
        fields = ['id', 'name', 'type']

class MindfulnessLogReadSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()
    mindfulness = MindfulnessSerializer()

    class Meta:
        model = MindfulnessLog
        fields = ['id', 'user', 'mindfulness', 'duration', 'description', 'datetime']

class MindfulnessLogWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = MindfulnessLog
        fields = ['mindfulness', 'duration', 'description', 'datetime']
