from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated


class ProgressView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        ...

class ObjectiveListView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        ...

class ObjectiveCreateView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        ...

class AchievementsView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        ...

class AchievementsUserView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        ...