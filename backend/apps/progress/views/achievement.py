from rest_framework.mixins import ( RetrieveModelMixin, CreateModelMixin, ListModelMixin)
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from apps.progress.serializers.achievements import AchievementSerializer, AchievementLogSerializer
from apps.progress.models.achievement import Achievement, AchievementLog

class AchievementsView(GenericAPIView, ListModelMixin):
    permission_classes = [IsAuthenticated]
    serializer_class = AchievementSerializer

    def get_queryset(self):
        queryset = Achievement.objects.all()
        category = self.request.GET.get('category')

        if category:
            queryset = queryset.filter(category = category)

        if not queryset:
            raise NotFound("Conquistas não encontradas.")
        return queryset
    
    def get(self, request, *args, **kwargs):
        return self.list(request,*args, **kwargs)

class AchievementsUserView(GenericAPIView, ListModelMixin):
    permission_classes = [IsAuthenticated]
    serializer_class = AchievementLogSerializer
    lookup_field = "user"

    def get_queryset(self):
        queryset = AchievementLog.objects.filter(user = self.request.user)
        category = self.request.GET.get('category')

        if category:
            queryset = queryset.filter(achievement__category = category)

        if not queryset:
            raise NotFound("Conquistas não encontradas.")
        return queryset

    def get(self, request, *args, **kwargs):
        return self.list(request,*args, **kwargs)