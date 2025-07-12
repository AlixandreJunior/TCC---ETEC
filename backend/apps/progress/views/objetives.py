from rest_framework.generics import ListAPIView, CreateAPIView
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from apps.progress.serializers.objetives import ObjectiveReadSerializer, ObjectiveWriteSerializer
from apps.progress.models.objetives import Objective

class ObjectiveListView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ObjectiveReadSerializer
    
    def get_queryset(self):
        queryset = Objective.objects.filter(user = self.request.user)
        status = self.request.GET.get('status')

        if status:
            queryset = queryset.filter(status = status)

        if not queryset:
            raise NotFound("Objetivos não encontrados.")
        return queryset

class ObjectiveCreateView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ObjectiveWriteSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response({'detail': "Objetivo criado com sucesso."}, status=status.HTTP_201_CREATED)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)