from rest_framework.views import APIView

class CheckInListView(APIView):
    def get(self, request):
        ...

class CheckInCreateView(APIView):
    def post(self, request):
        ...

class DiaryListView(APIView):
    def get(self, request):
        ...

class DiaryCreateView(APIView):
    def post(self, request):
        ...

class MindfulnessListView(APIView):
    def get(self, request):
        ...

class MindfulnessObjectView(APIView):
    def get(self, request):
        ...

class MindfulnessCreateView(APIView):
    def post(self, request):
        ...