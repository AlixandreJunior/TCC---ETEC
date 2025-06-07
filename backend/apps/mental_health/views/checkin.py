from rest_framework.generics import ListAPIView, CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from rest_framework import status

from apps.mental_health.models.checkin import MentalCheckin
from apps.mental_health.serializers.checkin import MentalCheckinReadSerializer, MentalCheckinWriteSerializer

class CheckInListView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = MentalCheckinReadSerializer
    
    def get_queryset(self):
        queryset = MentalCheckin.objects.filter(user = self.request.user)
        if not queryset:
            raise NotFound("Registros de Check-In não encontrados.")
        return queryset

class CheckInCreateView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = MentalCheckinWriteSerializer

    def perform_create(self, serializer):
        serializer.save(user = self.request.user)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response({'detail': "Check-In Criado com sucesso."}, status=status.HTTP_201_CREATED)