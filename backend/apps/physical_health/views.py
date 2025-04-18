from django.shortcuts import render
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

class StepsView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        ...

class HydratationView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        ...

class ExerciseListView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        ...

class ExerciseLogView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        ...

class ExerciseLogRegisterView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        ...