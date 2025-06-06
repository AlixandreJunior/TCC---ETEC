from django.utils import timezone
from rest_framework import serializers
from apps.mental_health.models.diary import Diary
from utils.generate_recomendation import mental_generate_recommendation

class DiarySerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    content = serializers.CharField(required=True) 

    class Meta:
        model = Diary
        fields = ['id', 'user', 'title', 'content', 'date']

    def validate(self, data):
        if self.instance is None:
            user = self.context['request'].user
            today = timezone.localdate()

            if Diary.objects.filter(user=user, date=today).exists():
                raise serializers.ValidationError("Um novo diário só pode ser feito após 24 horas.")

        return data