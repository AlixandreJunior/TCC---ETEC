from django.utils import timezone
from rest_framework import serializers
from apps.physical_health.models.checkin import PhysicalCheckin
from utils.generate_recomendation import physic_generate_recommendation

class PhysicalCheckinReadSerializer(serializers.ModelSerializer):
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
        read_only_fields = ('date', 'user')

    def get_recommendation(self, obj):
        return physic_generate_recommendation(obj)

class PhysicalCheckinWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = PhysicalCheckin
        fields = [
            'energy_level',
            'activity_level',
            'sleep_quality',
            'healthy_eating',
            'is_pain',
            'is_took_medicine',
            'is_used_screen_too_much',
            'notes',
        ]

    def validate(self, data):
        user = self.context['request'].user
        today = timezone.localdate()

        if PhysicalCheckin.objects.filter(user=user, date=today).exists():
            raise serializers.ValidationError("Um novo check-in só pode ser feito após 24 horas.")

        return data
