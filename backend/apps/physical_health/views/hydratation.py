from rest_framework.generics import ListAPIView, CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from rest_framework import status

from apps.physical_health.serializers.hydratation import HydrationLogSerializer
from apps.physical_health.models.hydratation import HydrationLog

class HydratationLogListView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = HydrationLogSerializer
    def get_queryset(self):
        queryset = HydrationLog.objects.filter(user = self.request.user)
        if not queryset:
            raise NotFound("Registros de Hidratação não encontrados.")
        return queryset
    
class HydratationLogRegisterView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = HydrationLogSerializer

    def perform_create(self, serializer):
        serializer.save(user = self.request.user)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response({'detail': "Registro de Hidratação registrado com sucesso."}, status=status.HTTP_201_CREATED, headers=headers)