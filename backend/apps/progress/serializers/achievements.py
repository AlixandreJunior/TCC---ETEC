from rest_framework import serializers
from apps.progress.models.achievement import Achievement, AchievementLog

class AchievementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Achievement
        fields = ['id','name','icon','category','condition','description',]

class AchievementLogSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    achievement = AchievementSerializer(read_only=True)

    class Meta:
        model = AchievementLog
        fields = ['id','user','achievement','date_awarded',]
