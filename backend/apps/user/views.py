from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework.mixins import ( RetrieveModelMixin, CreateModelMixin, UpdateModelMixin,)
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status

from . import serializers

class UserObjectView(RetrieveModelMixin, GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.UserSerializer

    def get_object(self):
        return self.request.user

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

class UserCreateView(CreateModelMixin, GenericAPIView):
    permission_classes = [AllowAny]
    serializer_class = serializers.UserSerializer

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response("Usuario criado com sucesso.", status=status.HTTP_201_CREATED)

class UserUpdateView(UpdateModelMixin, GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.UserSerializer

    def get_object(self):
        return self.request.user

    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)
    
    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()  
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response({'detail': "Dados atualizados com sucesso."}, status=status.HTTP_200_OK)

class GoalsObjectView(RetrieveModelMixin, GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.GoalSerializer
    lookup_field = "user"

    def get_object(self):
        return self.request.user.pk

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

class GoalsUpdateView(UpdateModelMixin, GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.GoalSerializer
    lookup_field = "user"

    def get_object(self):
        return self.request.user

    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)
    
    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()  
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response({'detail': "Metas atualizadas com sucesso."}, status=status.HTTP_200_OK)