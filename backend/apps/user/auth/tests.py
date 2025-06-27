from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from rest_framework_simplejwt.tokens import RefreshToken
from utils.usermixin import UserMixin

class AuthTest(APITestCase, UserMixin):

    def test_login_view_success(self):
        self.user = self.make_user_not_auth(username="testuser", email="testuser@email.com", password="SenhaForte321.")
        api_url = reverse('login')

        valid_data = {
            "email": "testuser@email.com",
            "password": "SenhaForte321."
        }

        response = self.client.post(api_url, data=valid_data, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access", response.data)
        self.assertIn("refresh", response.data)

    def test_login_view_invalid_credentials(self):
        api_url = reverse('login')

        invalid_data = {
            "email": "wrong@email.com",
            "password": "wrongpassword"
        }

        response = self.client.post(api_url, data=invalid_data, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("detail", response.data)

    def test_logout_view(self):
        """Logout com token válido"""
        user = self.make_user_auth(username="testuser", email="test@email.com", password="SenhaForte321")
        refresh = RefreshToken.for_user(user)

        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {str(refresh.access_token)}")

        api_url = reverse('logout')
        response = self.client.post(api_url, data={"refresh": str(refresh)}, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["detail"], "Logout realizado com sucesso.")

    def test_logout_view_fail_for_unauthorized(self):
        """Logout sem autenticação"""
        api_url = reverse('logout')
        response = self.client.post(api_url)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_refresh_view_success(self):
        """Atualiza token com refresh válido"""
        user = self.make_user_auth(username="testuser", email="test@email.com", password="SenhaForte321")
        refresh = RefreshToken.for_user(user)

        api_url = reverse('refresh')
        response = self.client.post(api_url, data={"refresh": str(refresh)}, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access", response.data)

    def test_refresh_view_invalid_token(self):
        """Erro ao atualizar com refresh inválido"""
        api_url = reverse('refresh')
        response = self.client.post(api_url, data={"refresh": "invalid_token"}, format='json')

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_verify_view_valid_token(self):
        """Valida token válido"""
        user = self.make_user_auth(username="testuser", email="test@email.com", password="SenhaForte321")
        access = RefreshToken.for_user(user).access_token

        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {str(access)}")
        api_url = reverse('verify')
        response = self.client.get(api_url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["detail"], "Token válido.")

    def test_verify_view_invalid_token(self):
        """Valida token inválido"""
        self.client.credentials(HTTP_AUTHORIZATION="Bearer tokeninvalido")
        api_url = reverse('verify')
        response = self.client.get(api_url)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
