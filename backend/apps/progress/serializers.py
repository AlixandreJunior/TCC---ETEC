from rest_framework import serializers
from .models import (UserProgress, Objective, Achievement, AchievementLog, MotivationalMessage )

class UserProgressSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = UserProgress
        fields = ['id','user','score','streak','max_streak','last_checkin_date','total_check_ins',]

class ObjectiveSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Objective
        fields = ['id','user','name','description','status','priority','deadline','created_at','completed_at',]

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

class MotivationalMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = MotivationalMessage
        fields = ['id','message', 'category',]
