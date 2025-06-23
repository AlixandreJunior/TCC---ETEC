from rest_framework import serializers
from apps.mental_health.models.diary import Diary, Activity

class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = ['id', 'name']

class DiaryReadSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()
    activities = ActivitySerializer(many=True)

    class Meta:
        model = Diary
        fields = [
            'id',
            'user',
            'title',
            'content',
            'datetime',
            'mood',
            'activities',
            'photo',
        ]
        ordering=['-datetime', ]

class DiaryWriteSerializer(serializers.ModelSerializer):
    activity = serializers.PrimaryKeyRelatedField(
        queryset=Activity.objects.all(),
        many=True,
        write_only=True,
        source='activities',
    )

    class Meta:
        model = Diary
        fields = [
            'title',
            'content',
            'datetime',
            'mood',
            'activity',
            'photo',
        ]

    def validate(self, data):
        request = self.context.get('request')
        user = request.user if request else None
        title = data.get('title')

        if self.instance is None and user and title:
            if Diary.objects.filter(user=user, title=title).exists():
                raise serializers.ValidationError({
                    'title': 'Você já criou um diário com esse título.'
                })

        return data
