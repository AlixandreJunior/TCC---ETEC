from rest_framework.generics import ListAPIView, CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from rest_framework import status
from django.utils.dateparse import parse_date

from apps.mental_health.serializers.mindfulness import MindfulnessSerializer, MindfulnessLogWriteSerializer, MindfulnessLogReadSerializer
from apps.mental_health.models.mindfulness import Mindfulness, MindfulnessLog


class MindfulnessListView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = MindfulnessSerializer

    def get_queryset(self):
        queryset = Mindfulness.objects.all()
        type = self.request.GET.get('type')

        if type:
            queryset = queryset.filter(type = type)

        if not queryset:
            raise NotFound("Exercícios de Mindfulness não encontrados.")
        return queryset

class MindfulnessLogListView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = MindfulnessLogReadSerializer

    def get_queryset(self):
        queryset = MindfulnessLog.objects.filter(user = self.request.user)
        start_date = self.request.GET.get('start_date')
        end_date = self.request.GET.get('end_date')

        if start_date:
            start_date_parsed = parse_date(start_date)
        if start_date_parsed:
            queryset = queryset.filter(datetime__date__gte=start_date_parsed)

        if end_date:
            end_date_parsed = parse_date(end_date)
            if end_date_parsed:
                queryset = queryset.filter(datetime__date__lte=end_date_parsed)
                
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