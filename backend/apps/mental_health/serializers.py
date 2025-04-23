from django.utils import timezone
from rest_framework import serializers
from apps.mental_health.models import Mindfulness, MentalCheckin, MindfulnessLog, Diary 
from utils.generate_recomendation import mental_generate_recommendation

class MindfulnessSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mindfulness
        fields = ['id', 'name', 'duration', 'type', 'description', 'difficulty']

class MentalCheckinWriteSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = MentalCheckin
        fields = [
            'id',
            'user',
            'mood',
            'stress_level',
            'anxiety_level',
            'is_feeling_lonely',
            'is_low_self_esteem',
            'is_overwhelmed',
            'notes',
            'date',
        ]
        read_only_fields = ['id', 'user', 'date']

    def validate(self, data):
        user = self.context['request'].user
        today = timezone.now().date()

        if MentalCheckin.objects.filter(user=user, date = today).exists():
            raise serializers.ValidationError("Um novo check-in só pode ser feito após 24 horas.")

        return data

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)

class MentalCheckinReadSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()  # Ou PrimaryKeyRelatedField, se quiser mostrar o ID
    recommendation = serializers.SerializerMethodField()

    class Meta:
        model = MentalCheckin
        fields = [
            'id',
            'user',
            'mood',
            'stress_level',
            'anxiety_level',
            'is_feeling_lonely',
            'is_low_self_esteem',
            'is_overwhelmed',
            'notes',
            'date',
            'recommendation',
        ]

    def get_recommendation(self, obj):
        return mental_generate_recommendation(obj)

class MindfulnessLogSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = MindfulnessLog
        fields = ['id', 'user', 'mindfulness', 'rating', 'created_at']

class DiarySerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Diary
        fields = ['id', 'user', 'title', 'content', 'date']

    def validate(self, data):
        user = self.context['request'].user
        today = timezone.now().date()

        if Diary.objects.filter(user=user, date = today).exists():
            raise serializers.ValidationError("Um novo diario só pode ser feito após 24 horas.")

        return data