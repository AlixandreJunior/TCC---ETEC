from rest_framework.mixins import ( RetrieveModelMixin, CreateModelMixin, ListModelMixin)
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from . import serializers, models

class ProgressView(GenericAPIView, RetrieveModelMixin):
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.UserProgressSerializer
    lookup_field = "user"

    def get_object(self):
        return self.request.user.pk
    
    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

class ObjectiveListView(GenericAPIView, ListModelMixin):
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.ObjectiveSerializer
    lookup_field = "user"

    def get_queryset(self):
        return models.Objective.objects.filter(user = self.request.user)

    def get(self, request, *args, **kwargs):
        return self.list(request,*args, **kwargs)

class ObjectiveCreateView(GenericAPIView, CreateModelMixin):
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.ObjectiveSerializer

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response({'detail': "Objetivo criado com sucesso."}, status=status.HTTP_201_CREATED)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class AchievementsView(GenericAPIView, ListModelMixin):
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.AchievementSerializer
    queryset = models.Achievement.objects.all()

    def get(self, request, *args, **kwargs):
        return self.list(request,*args, **kwargs)

class AchievementsUserView(GenericAPIView, ListModelMixin):
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.AchievementLogSerializer
    lookup_field = "user"

    def get_queryset(self):
        return models.Objective.objects.filter(user = self.request.user)

    def get(self, request, *args, **kwargs):
        return self.list(request,*args, **kwargs)