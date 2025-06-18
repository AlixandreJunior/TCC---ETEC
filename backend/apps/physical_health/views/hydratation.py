from rest_framework.generics import ListAPIView, CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from rest_framework import status
from django.utils import timezone

from apps.physical_health.serializers.hydratation import HydrationLogSerializer
from apps.physical_health.models.hydratation import HydrationLog


class HydratationLogListView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = HydrationLogSerializer

    def get_queryset(self):
        date_str = self.request.GET.get("date")  
        queryset = HydrationLog.objects.filter(user=self.request.user)

        if date_str:
            try:
                date = timezone.datetime.strptime(date_str, "%Y-%m-%d").date()
                queryset = queryset.filter(date=date)
            except ValueError:
                raise NotFound("Formato de data inválido. Use YYYY-MM-DD.")

        if not queryset.exists():
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