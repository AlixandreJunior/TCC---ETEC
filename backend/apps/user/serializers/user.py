from rest_framework import serializers
from django.contrib.auth import password_validation
from apps.user.models.user import User

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'email',
            'first_name',
            'last_name',
            'password',
            'created_at',
            'notifications',
        ]
        read_only_fields = ['id', 'created_at',]
    
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