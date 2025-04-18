from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

class CheckInListView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        ...

class CheckInCreateView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        ...

class DiaryListView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        ...

class DiaryCreateView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        ...

class MindfulnessListView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        ...

class MindfulnessObjectView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        ...

class MindfulnessCreateView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        ...