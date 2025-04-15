from rest_framework.views import APIView

class UserObjectView(APIView):
    def get(self, request):
        ...

class UserCreateView(APIView):
    def post(self, request):
        ...

class UserUpdateView(APIView):
    def patch(self, request):
        ...

class UserDeleteView(APIView):
    def patch(self, request):
        ...

class GoalsObjectView(APIView):
    def get(self, request):
        ...

class GoalsUpdateView(APIView):
    def patch(self, request):
        ...