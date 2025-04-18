from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.permissions import AllowAny

class CookieJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        if any(isinstance(perm(), AllowAny) for perm in request.resolver_match.func.view_class.permission_classes):
            return None

        token = request.COOKIES.get("access_token")

        if not token:
            return None
        
        try:
            validated_token = self.get_validated_token(token)
        except AuthenticationFailed as e:
            raise AuthenticationFailed(f"Validação de token falhada:{str(e)}")

        try:
            user = self.get_user(validated_token)
            return (user, validated_token) 
        except AuthenticationFailed as e:
            raise AuthenticationFailed(f"Erro ao retornar o usuario: {str(e)}")
