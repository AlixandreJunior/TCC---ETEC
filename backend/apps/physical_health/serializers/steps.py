from rest_framework import serializers
from apps.physical_health.models.steps import StepsLog

class StepsLogSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = StepsLog
        fields = ['id', 'user', 'steps', 'date']