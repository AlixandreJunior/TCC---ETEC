from rest_framework.generics import ListAPIView, CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from rest_framework import status

from apps.physical_health.serializers.checkin import PhysicalCheckinReadSerializer, PhysicalCheckinWriteSerializer
from apps.physical_health.models.checkin import PhysicalCheckin

class CheckInListView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PhysicalCheckinReadSerializer
    
    def get_queryset(self):
        queryset = PhysicalCheckin.objects.filter(user = self.request.user)
        if not queryset:
            raise NotFound("Registros de Check-In não encontrados.")
        return queryset

class CheckInCreateView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PhysicalCheckinWriteSerializer

    def perform_create(self, serializer):
        serializer.save(user = self.request.user)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response({'detail': "Check-In Criado com sucesso."}, status=status.HTTP_201_CREATED)