from django.utils import timezone
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
    def validate(self, data):
        """
        Valida se o último Check-In foi feito há menos de 24 horas.

        - Obtém o último Check-In da bolha associada.
        - Se o último Check-In tiver menos de 24 horas, impede a criação de um novo.
        """
        user = data.get('user')  
        ultimo_checkin = PhysicalCheckin.objects.filter(user = user).order_by('-date').first()

        if ultimo_checkin:
            tempo_desde_ultimo = timezone.now() - ultimo_checkin.date
            if tempo_desde_ultimo < timezone.timedelta(days=1):
                raise serializers.ValidationError("Um novo Check-in só pode ser feito após 24 horas.")

        return data
    
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
