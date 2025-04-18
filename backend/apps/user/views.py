from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny

class UserObjectView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        ...

class UserCreateView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        ...

class UserUpdateView(APIView):
    permission_classes = [IsAuthenticated]
    def patch(self, request):
        ...

class UserDeleteView(APIView):
    permission_classes = [IsAuthenticated]
    def patch(self, request):
        ...

class GoalsObjectView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        ...

class GoalsUpdateView(APIView):
    permission_classes = [IsAuthenticated]
    def patch(self, request):
        ...