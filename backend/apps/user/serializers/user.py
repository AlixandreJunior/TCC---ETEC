from rest_framework import serializers
from django.contrib.auth import password_validation
from apps.user.models.user import User

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    
    diarys_registers = serializers.SerializerMethodField()
    mindfulness_registers = serializers.SerializerMethodField()
    exercises_registers = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'email',
            'diarys_registers',
            'mindfulness_registers',
            'exercises_registers',
            'password',
            'created_at',
        ]
        read_only_fields = ['id', 'created_at',]
    
    def get_diarys_registers(self, obj):
        try:
            return obj.diary_set.count() 
        except AttributeError: 
            return 0 
    
    def get_mindfulness_registers(self, obj):
        try:
            return obj.mindfulnesslog_set.count()
        except AttributeError:
            return 0
        
    def get_exercises_registers(self, obj):
        try:
            return obj.exerciselog_set.count()
        except AttributeError:
            return 0

    def validate_password(self, value):
        try:
            password_validation.validate_password(value)
        except serializers.ValidationError as e:
            raise serializers.ValidationError({"password": str(e)}) 
        return value
    
    def create(self, validated_data):
        password = validated_data.pop('password')

        user = User.objects.create(**validated_data) 
        user.set_password(password)
        user.save()

        return user
    
    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            if attr == 'password':
                instance.set_password(value)
            else:
                setattr(instance, attr, value)
        instance.save()
        return instance