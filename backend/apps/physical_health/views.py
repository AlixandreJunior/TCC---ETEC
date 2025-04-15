from django.shortcuts import render
from rest_framework.views import APIView

class CheckInListView(APIView):
    def get(self, request):
        ...

class CheckInCreateView(APIView):
    def post(self, request):
        ...

class StepsView(APIView):
    def post(self, request):
        ...

class HydratationView(APIView):
    def post(self, request):
        ...

class ExerciseListView(APIView):
    def get(self, request):
        ...

class ExerciseLogView(APIView):
    def get(self, request):
        ...

class ExerciseLogRegisterView(APIView):
    def post(self, request):
        ...