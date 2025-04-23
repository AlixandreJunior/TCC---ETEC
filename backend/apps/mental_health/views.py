from rest_framework.generics import GenericAPIView
from rest_framework.mixins import CreateModelMixin, ListModelMixin, RetrieveModelMixin
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from rest_framework import status

from apps.mental_health import serializers, models

class CheckInListView(GenericAPIView, ListModelMixin):
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.MentalCheckinReadSerializer
    
    def get_queryset(self):
        queryset = models.MentalCheckin.objects.filter(user = self.request.user)
        if not queryset.exists():
            raise NotFound("Registros de Check-In não encontrados.")
        return queryset
    
    def get(self, request,*args, **kwargs):
        return self.list(request, *args, **kwargs)

class CheckInCreateView(GenericAPIView, CreateModelMixin):
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.MentalCheckinWriteSerializer

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

class DiaryListView(GenericAPIView, ListModelMixin):
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.DiarySerializer

    def get_queryset(self):
        queryset = models.Diary.objects.filter(user = self.request.user)
        if not queryset.exists():
            raise NotFound("Diarios não encontrados.")
        return queryset
    
    def get(self, request,*args, **kwargs):
        return self.list(request, *args, **kwargs)
    
class DiaryObjectView(GenericAPIView, RetrieveModelMixin):
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.DiarySerializer

    def get_object(self):
        date = self.kwargs.get('date')
        try:
            return models.Diary.objects.get(user=self.request.user, date=date)
        except models.Diary.DoesNotExist:
            raise NotFound("Diário não encontrado.")
    
    def get(self, request,*args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

class DiaryCreateView(GenericAPIView, CreateModelMixin):
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.DiarySerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)  

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response({'detail': "Diario criado com sucesso."}, status=status.HTTP_201_CREATED,)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class MindfulnessListView(GenericAPIView, ListModelMixin):
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.MindfulnessSerializer

    def get_queryset(self):
        queryset = models.Mindfulness.objects.all()
        if not queryset.exists():
            raise NotFound("Exercícios de Mindfulness não encontrados.")
        return queryset
    
    def get(self, request,*args, **kwargs):
        return self.list(request, *args, **kwargs)

class MindfulnessLogListView(GenericAPIView, ListModelMixin):
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.MindfulnessLogSerializer

    def get_queryset(self):
        queryset = models.MindfulnessLog.objects.filter(user = self.request.user)
        if not queryset.exists():
            raise NotFound("Registros de Mindfulness não encontrados.")
        return queryset
    
    def get(self, request,*args, **kwargs):
        return self.list(request, *args, **kwargs)

class MindfulnessLogRegisterView(GenericAPIView, CreateModelMixin):
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.MindfulnessLogSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)  
        
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response({'detail': "Registro de Mindfulness criado com sucesso."}, status=status.HTTP_201_CREATED, headers=headers)
    
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)