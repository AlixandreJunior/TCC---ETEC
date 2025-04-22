from django.utils import timezone
from rest_framework import serializers
from apps.mental_health.models import Mindfulness, MentalCheckin, MindfulnessLog, Diary 
from utils.generate_recomendation import mental_generate_recommendation

class MindfulnessSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mindfulness
        fields = ['id', 'name', 'duration', 'type', 'description', 'difficulty']

class MentalCheckinSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    recommendation = serializers.SerializerMethodField()

    class Meta:
        model = MentalCheckin
        fields = ['id',
            'user',
            'mood',
            'stress_level',
            'anxiety_level',
            'is_feeling_lonely',
            'is_low_self_esteem',
            'is_overwhelmed',
            'notes',
            'score',
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
        ultimo_checkin = MentalCheckin.objects.filter(user = user).order_by('-date').first()

        if ultimo_checkin:
            tempo_desde_ultimo = timezone.now() - ultimo_checkin.date
            if tempo_desde_ultimo < timezone.timedelta(days=1):
                raise serializers.ValidationError("Um novo Check-in só pode ser feito após 24 horas.")

        return data

    def get_recommendation(self, obj):
        mental_generate_recommendation(obj)

class MindfulnessLogSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    mindfulness = MindfulnessSerializer(read_only=True)

    class Meta:
        model = MindfulnessLog
        fields = ['id', 'user', 'mindfulness', 'rating', 'created_at']

class DiarySerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Diary
        fields = ['id', 'user', 'title', 'content', 'date']
