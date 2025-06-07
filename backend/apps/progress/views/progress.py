from rest_framework.generics import RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from apps.progress.serializers.progress import UserProgressSerializer

class ProgressView(RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserProgressSerializer
    lookup_field = "user"

    def get_object(self):
        return self.request.user.pk