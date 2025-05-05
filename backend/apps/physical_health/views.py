from rest_framework.generics import GenericAPIView
from rest_framework.mixins import CreateModelMixin, ListModelMixin, RetrieveModelMixin
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from rest_framework import status

from apps.physical_health import serializers, models

class CheckInListView(GenericAPIView, ListModelMixin):
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.PhysicalCheckinReadSerializer
    
    def get_queryset(self):
        queryset = models.PhysicalCheckin.objects.filter(user = self.request.user)
        if not queryset:
            raise NotFound("Registros de Check-In não encontrados.")
        return queryset
    
    def get(self, request,*args, **kwargs):
        return self.list(request, *args, **kwargs)

class CheckInCreateView(GenericAPIView, CreateModelMixin):
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.PhysicalCheckinWriteSerializer

    def perform_create(self, serializer):
        serializer.save(user = self.request.user)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response({'detail': "Check-In Criado com sucesso."}, status=status.HTTP_201_CREATED, headers=headers)
    
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

class StepsLogListView(GenericAPIView, ListModelMixin):
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.StepsLogSerializer
    
    def get_queryset(self):
        queryset = models.StepsLog.objects.filter(user = self.request.user)
        if not queryset:
            raise NotFound("Registros de Passos não encontrados.")
        return queryset
    
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)
    
class StepsLogRegisterView(GenericAPIView, CreateModelMixin):
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.StepsLogSerializer

    def perform_create(self, serializer):
        serializer.save(user = self.request.user)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response({'detail': "Registro de passos registrado com sucesso."}, status=status.HTTP_201_CREATED, headers=headers)
    
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

class HydratationLogListView(GenericAPIView, ListModelMixin):
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.HydrationLogSerializer
    def get_queryset(self):
        queryset = models.HydrationLog.objects.filter(user = self.request.user)
        if not queryset:
            raise NotFound("Registros de Hidratação não encontrados.")
        return queryset
    
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)
    
class HydratationLogRegisterView(GenericAPIView, CreateModelMixin):
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.HydrationLogSerializer

    def perform_create(self, serializer):
        serializer.save(user = self.request.user)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response({'detail': "Registro de Hidratação registrado com sucesso."}, status=status.HTTP_201_CREATED, headers=headers)
    
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

class ExerciseListView(GenericAPIView, ListModelMixin):
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.ExerciseSerializer

    def get_queryset(self):
        queryset = models.Exercise.objects.all()

        type = self.request.GET.get('type')
        difficulty = self.request.GET.get('difficulty')

        if type:
            queryset = queryset.filter(type = type)
        if difficulty:
            queryset = queryset.filter(difficulty = difficulty)

        if not queryset:
            raise NotFound("Exercícios não encontrados.")
        return queryset
    
    def get(self, request,*args, **kwargs):
        return self.list(request, *args, **kwargs)

class ExerciseLogView(GenericAPIView, ListModelMixin):
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.ExerciseLogSerializer
    
    def get_queryset(self):
        queryset = models.ExerciseLog.objects.filter(user = self.request.user)
        type = self.request.GET.get('type')
        difficulty = self.request.GET.get('difficulty')

        if type:
            queryset = queryset.filter(exercise__type = type)
        if difficulty:
            queryset = queryset.filter(exercise__difficulty = difficulty)

        if not queryset:
            raise NotFound("Registros de Exercícios não encontrados.")
        return queryset
    
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

class ExerciseLogRegisterView(GenericAPIView, CreateModelMixin):
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.ExerciseLogSerializer

    def perform_create(self, serializer):
        serializer.save(user = self.request.user)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response({'detail': "Registro de exercícios registrado com sucesso."}, status=status.HTTP_201_CREATED, headers=headers)
    
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)