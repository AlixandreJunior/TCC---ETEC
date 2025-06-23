from rest_framework import serializers
from django.utils import timezone
from apps.progress.models.objetives import Objective
from apps.mental_health.serializers.diary import ActivitySerializer

class ObjectiveSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    activity = ActivitySerializer()

    class Meta:
        model = Objective
        fields = ['id','user','activity','period','deadline','created_at',]
        read_only_fields = ['deadline', 'created_at']

    def validate(self, attrs):
        user = self.context['request'].user
        activity = attrs.get('activity')

        current_objectives = Objective.objects.filter(user=user)

        if current_objectives.count() >= 3:
            raise serializers.ValidationError({"activity":"Você só pode ter no máximo 3 objetivos ativos."})

        if current_objectives.filter(activity=activity).exists():
            raise serializers.ValidationError({"activity": "Você já possui um objetivo com essa atividade."})

        return attrs

    def create(self, validated_data):
        period = validated_data.get('period')

        now = timezone.now()
        if period == Objective.PeriodChoices.ONE_WEEK:
            deadline = now + timezone.timedelta(weeks=1)
        elif period == Objective.PeriodChoices.TWO_WEEKS:
            deadline = now + timezone.timedelta(weeks=2)
        elif period == Objective.PeriodChoices.THREE_WEEKS:
            deadline = now + timezone.timedelta(weeks=3)
        else:
            raise serializers.ValidationError({'period': 'Período inválido.'})

        validated_data['deadline'] = deadline

        return super().create(validated_data)