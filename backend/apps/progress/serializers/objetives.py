from rest_framework import serializers
from apps.progress.models.objetives import Objective

class ObjectiveSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Objective
        fields = ['id','user','name','description','status','priority','deadline','created_at','completed_at',]
