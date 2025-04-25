from rest_framework import status, permissions, mixins
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken

from .serializers import LoginUserSerializer


# Login View
class LoginView(mixins.CreateModelMixin, GenericAPIView):
    serializer_class = LoginUserSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        print(serializer.is_valid())
        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data['user']
        refresh = RefreshToken.for_user(user)

        return Response({
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "detail": "Login realizado com sucesso."
        }, status=status.HTTP_200_OK)


# Refresh Token View
class RefreshView(GenericAPIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        refresh_token = request.data.get("refresh")

        if not refresh_token:
            return Response({"detail": "Token de atualização não fornecido."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            refresh = RefreshToken(refresh_token)
            access_token = str(refresh.access_token)

            return Response({
                "access": access_token,
                "detail": "Token atualizado com sucesso."
            }, status=status.HTTP_200_OK)

        except TokenError as e:
            return Response({"detail": f"Token inválido: {str(e)}"}, status=status.HTTP_401_UNAUTHORIZED)

class LogoutView(mixins.DestroyModelMixin, GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        refresh_token = request.data.get("refresh")

        if not refresh_token:
            return Response({"detail": "Token de atualização não fornecido."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            token = RefreshToken(refresh_token)
            token.blacklist()
        except TokenError:
            pass

        return Response({"detail": "Logout realizado com sucesso."}, status=status.HTTP_200_OK)


# Token Verify View
class VerifyView(mixins.RetrieveModelMixin, GenericAPIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, *args, **kwargs):
        auth_header = request.headers.get("Authorization")

        if not auth_header or not auth_header.startswith("Bearer "):
            return Response({"detail": "Cabeçalho de autenticação inválido."}, status=status.HTTP_401_UNAUTHORIZED)

        token = auth_header.split(" ")[1]

        try:
            AccessToken(token)
            return Response({"detail": "Token válido."}, status=status.HTTP_200_OK)
        except InvalidToken as e:
            return Response({"detail": f"Token inválido: {str(e)}"}, status=status.HTTP_401_UNAUTHORIZED)
