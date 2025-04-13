from rest_framework import serializers
from django.contrib.auth import get_user_model, password_validation
from apps.user.models import Goal  

User = get_user_model()

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
            'password'
            'avatar',
            'birth_date',
            'gender',
            'created_at',
            'is_active',
            'notifications',
        ]
        read_only_fields = ['id', 'created_at', 'is_active']
    
    def validate_password(self, value):
        try:
            password_validation.validate_password(value)  # Valida a senha usando as regras do Django
        except serializers.ValidationError as e:
            raise serializers.ValidationError({"password": str(e)})  # Retorna o erro de validação
        return value
    
    def create(self, validated_data):
        password = validated_data.pop('password')

        user = User.objects.create(**validated_data)  # Cria o usuário
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

class GoalSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Goal
        fields = [
            'id',
            'user',
            'hydration_goal',
            'steps_goal',
            'exercise_goal',
            'mindfulness_goal',
        ]
