from rest_framework.generics import ListAPIView, RetrieveAPIView, UpdateAPIView, CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from rest_framework import status

from apps.mental_health.serializers.diary import DiaryReadSerializer, DiaryWriteSerializer, ActivitySerializer
from apps.mental_health.models.diary import Diary, Activity

class ActivitiesListView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ActivitySerializer

    def get_queryset(self):
        queryset = Activity.objects.all()

        if not queryset.exists():
            raise NotFound("Atividades não encontradas.")
        return queryset

class DiaryListView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = DiaryReadSerializer

    def get_queryset(self):
        user = self.request.user
        search = self.request.GET.get("search")
        month = self.request.GET.get("month")
        year = self.request.GET.get("year")

        queryset = Diary.objects.filter(user=user)

        if search:
            queryset = queryset.filter(title__icontains=search)

        if month and year:
            try:
                month = int(month)
                year = int(year)
                queryset = queryset.filter(datetime__month=month, datetime__year=year).order_by('-datetime')
            except ValueError:
                raise NotFound("Parâmetros de mês ou ano inválidos.")

        if not queryset.exists():
            raise NotFound("Diários não encontrados.")
        return queryset

class DiaryObjectView(RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = DiaryReadSerializer

    def get_object(self):
        id = self.kwargs.get('id')
        try:
            return Diary.objects.get(user=self.request.user, id = id)
        except Diary.DoesNotExist:
            raise NotFound("Diário não encontrado.")
    
class DiaryUpdateView(UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = DiaryWriteSerializer

    def get_object(self):
        id = self.kwargs.get('id')
        try:
            return Diary.objects.get(user=self.request.user, id = id)
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
    serializer_class = DiaryWriteSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)  

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response({'detail': "Diario criado com sucesso."}, status=status.HTTP_201_CREATED,)