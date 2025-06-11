from rest_framework.generics import ListAPIView, CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from rest_framework import status

from apps.physical_health.serializers.exercise import ExerciseSerializer, ExerciseLogWriteSerializer, ExerciseLogReadSerializer
from apps.physical_health.models.exercise import Exercise, ExerciseLog

class ExerciseListView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ExerciseSerializer

    def get_queryset(self):
        queryset = Exercise.objects.all()
        type = self.request.GET.get('type')

        if type:
            queryset = queryset.filter(type = type)

        if not queryset:
            raise NotFound("Exercícios não encontrados.")
        return queryset

class ExerciseLogView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ExerciseLogReadSerializer
    
    def get_queryset(self):
        queryset = ExerciseLog.objects.filter(user = self.request.user)
        type = self.request.GET.get('type')

        if type:
            queryset = queryset.filter(exercise__type = type)

        if not queryset:
            raise NotFound("Registros de Exercícios não encontrados.")
        return queryset
    
class ExerciseLogRegisterView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ExerciseLogWriteSerializer

    def perform_create(self, serializer):
        serializer.save(user = self.request.user)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response({'detail': "Registro de exercícios registrado com sucesso."}, status=status.HTTP_201_CREATED, headers=headers)