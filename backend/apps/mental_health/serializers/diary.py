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

class DiaryWriteSerializer(serializers.ModelSerializer):
    activity = serializers.PrimaryKeyRelatedField(
        queryset=Activity.objects.all(),
        many=True,
        write_only=True,
        source='activities'
    )

    class Meta:
        model = Diary
        fields = [
            'title',
            'content',
            'datetime',
            'mood',
            'activity_ids',
            'photo',
        ]
