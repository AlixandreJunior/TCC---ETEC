from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from rest_framework import permissions, status
from rest_framework.exceptions import AuthenticationFailed

from . import serializers

class LoginView(APIView):
    permission_classes = [permissions.AllowAny]  

    def post(self, request):
        serializer = serializers.LoginUserSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        user = serializer.validated_data['user']

        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)

        response = Response({"detail": "Login realizado com sucesso."}, status=status.HTTP_200_OK)

        response.set_cookie(
            key='access_token',
            value=access_token,
            secure=True,
            httponly=True,
            samesite='None',
            max_age=15 * 60  
        )
        response.set_cookie(
            key='refresh_token',
            value=str(refresh),
            secure=True,
            httponly=True,
            samesite='None',
            max_age=30 * 24 * 60 * 60  
        )

        return response


class LogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        response = Response({"detail": "Logout realizado com sucesso."}, status=status.HTTP_200_OK)

        response.delete_cookie("access_token")
        response.delete_cookie("refresh_token")

        return response


class RefreshView(APIView):
    def post(self, request):
        refresh_token = request.COOKIES.get('refresh_token')

        if not refresh_token:
            return Response({"detail": "Token de atualização não encontrado."}, status=status.HTTP_401_UNAUTHORIZED)

        try:
            refresh = RefreshToken(refresh_token)
            access_token = str(refresh.access_token)

            response = Response({"detail": "Token atualizado com sucesso."}, status=status.HTTP_200_OK)
            response.set_cookie(
                key='access_token',
                value=access_token,
                httponly=True,
                secure=True,
                samesite='None',
                max_age=15 * 60
            )

            return response

        except Exception as e:
            response = Response({"detail": "Erro ao atualizar o token."}, status=status.HTTP_401_UNAUTHORIZED)
            response.delete_cookie("access_token")
            response.delete_cookie("refresh_token")
            return response


class VerifyView(APIView):
    def get(self, request):
        access_token = request.COOKIES.get('access_token')

        if not access_token:
            return Response({"detail": "Token de acesso não encontrado."}, status=status.HTTP_401_UNAUTHORIZED)

        try:
            AccessToken(access_token)
            return Response({"detail": "Token válido."}, status=status.HTTP_200_OK)
        except AuthenticationFailed as e:
            return Response({"detail": f"Token inválido: {str(e)}"}, status=status.HTTP_401_UNAUTHORIZED)
