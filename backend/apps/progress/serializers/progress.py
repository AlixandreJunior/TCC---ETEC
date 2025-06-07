from rest_framework import serializers
from apps.progress.models.progress import UserProgress

class UserProgressSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = UserProgress
        fields = ['id','user','score','streak','max_streak','last_checkin_date','total_check_ins',]