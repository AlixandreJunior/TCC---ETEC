from rest_framework import serializers
from apps.physical_health.models.hydratation import HydrationLog

class HydrationLogSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = HydrationLog
        fields = ['id', 'user', 'quantity', 'date']