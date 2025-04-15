from rest_framework.views import APIView

class ProgressView(APIView):
    def get(self, request):
        ...

class ObjectiveListView(APIView):
    def get(self, request):
        ...

class ObjectiveCreateView(APIView):
    def post(self, request):
        ...

class AchievementsView(APIView):
    def get(self, request):
        ...

class AchievementsUserView(APIView):
    def get(self, request):
        ...