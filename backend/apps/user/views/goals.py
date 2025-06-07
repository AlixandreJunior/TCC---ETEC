from rest_framework.generics import RetrieveAPIView, UpdateAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from apps.user.serializers.goal import GoalSerializer

class GoalsObjectView(RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = GoalSerializer
    lookup_field = "user"

    def get_object(self):
        return self.request.user.pk

class GoalsUpdateView(UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = GoalSerializer
    lookup_field = "user"

    def get_object(self):
        return self.request.user

    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()  
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response({'detail': "Metas atualizadas com sucesso."}, status=status.HTTP_200_OK)