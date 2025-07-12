from rest_framework import serializers
from django.contrib.auth import password_validation
from apps.user.models.user import User

class UserReadSerializer(serializers.ModelSerializer):
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
            'created_at',
        ]
        read_only_fields = fields  # Todos os campos são somente leitura

    def get_diarys_registers(self, obj):
        return getattr(obj, 'diary_set', []).count()

    def get_mindfulness_registers(self, obj):
        return getattr(obj, 'mindfulnesslog_set', []).count()

    def get_exercises_registers(self, obj):
        return getattr(obj, 'exerciselog_set', []).count()

class UserWriteSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {
            'id': {'read_only': True},
        }

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