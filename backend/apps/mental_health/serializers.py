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
