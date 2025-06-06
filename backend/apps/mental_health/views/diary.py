from rest_framework.generics import ListAPIView, RetrieveAPIView, UpdateAPIView, CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from rest_framework import status

from apps.mental_health.serializers.diary import DiarySerializer
from apps.mental_health.models.diary import Diary

class DiaryListView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = DiarySerializer

    def get_queryset(self):
        search = self.request.GET.get('search')
        queryset = Diary.objects.filter(user=self.request.user)
        if search:
            queryset = queryset.filter(title__icontains=search)
            
        if not queryset:
            raise NotFound("Diarios não encontrados.")
        return queryset
    
class DiaryObjectView(RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = DiarySerializer

    def get_object(self):
        date = self.kwargs.get('date')
        try:
            return Diary.objects.get(user=self.request.user, date=date)
        except Diary.DoesNotExist:
            raise NotFound("Diário não encontrado.")
    
class DiaryUpdateView(UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = DiarySerializer

    def get_object(self):
        date = self.kwargs.get('date')
        try:
            return Diary.objects.get(user=self.request.user, date=date)
        except Diary.DoesNotExist:
            raise NotFound("Diário não encontrado.")
        
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response({'detail': "Diario atualizado com sucesso."}, status=status.HTTP_200_OK)

class DiaryCreateView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = DiarySerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)  

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response({'detail': "Diario criado com sucesso."}, status=status.HTTP_201_CREATED,)