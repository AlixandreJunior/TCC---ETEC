from rest_framework.generics import ListAPIView, CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from rest_framework import status

from apps.mental_health.serializers.mindfulness import MindfulnessSerializer, MindfulnessLogWriteSerializer, MindfulnessLogReadSerializer
from apps.mental_health.models.mindfulness import Mindfulness, MindfulnessLog


class MindfulnessListView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = MindfulnessSerializer

    def get_queryset(self):
        queryset = Mindfulness.objects.all()

        type = self.request.GET.get('type')
        difficulty = self.request.GET.get('difficulty')

        if type:
            queryset = queryset.filter(type = type)
        if difficulty:
            queryset = queryset.filter(difficulty = difficulty)

        if not queryset:
            raise NotFound("Exercícios de Mindfulness não encontrados.")
        return queryset

class MindfulnessLogListView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = MindfulnessLogReadSerializer

    def get_queryset(self):
        queryset = MindfulnessLog.objects.filter(user = self.request.user)
        type = self.request.GET.get('type')
        difficulty = self.request.GET.get('difficulty')

        if type:
            queryset = queryset.filter(mindfulness__type = type)
        if difficulty:
            queryset = queryset.filter(mindfulness__difficulty = difficulty)

        if not queryset:
            raise NotFound("Registros de Mindfulness não encontrados.")
        return queryset

class MindfulnessLogRegisterView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = MindfulnessLogWriteSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)  
        
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response({'detail': "Registro de Mindfulness criado com sucesso."}, status=status.HTTP_201_CREATED, headers=headers)