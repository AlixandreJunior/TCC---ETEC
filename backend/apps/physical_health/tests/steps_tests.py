from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from utils.usermixin import UserMixin
from apps.physical_health.models.steps import StepsLog

class StepsTests(APITestCase, UserMixin):
    def setUp(self):
        self.user = self.make_user_auth()

        self.steps_log = StepsLog.objects.create(
            user=self.user,
            steps=8500,
        )

    def test_get_steps(self):
        url = reverse('physical_health:steps_list')

        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK),
        self.assertEqual(response.json()[0].get('id'), 1)

    def test_get_steps_fail_for_404(self):
        url = reverse('physical_health:steps_list')

        self.steps_log.delete()

        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND),
        self.assertEqual(response.json().get('detail'), 'Registros de Passos não encontrados.')
    
    def test_get_steps_fail_for_unauthorized(self):
        url = reverse('physical_health:steps_list')

        self.client.logout()

        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED),
        self.assertEqual(response.json().get('detail'), 'As credenciais de autenticação não foram fornecidas.')

    def test_get_steps_fail_for_unauthorized(self):
        url = reverse('physical_health:steps_list')

        self.client.logout()

        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED),
        self.assertEqual(response.json().get('detail'), 'As credenciais de autenticação não foram fornecidas.')

    def test_post_steps_log_create(self):
        url = reverse('physical_health:steps_register')

        self.steps_log.delete()

        payload = {
            'steps': 1000,
        }

        response = self.client.post(url, payload)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.json().get('detail'), "Registro de passos registrado com sucesso.")

    def test_post_steps_log_create_fail_for_blank(self):
        url = reverse('physical_health:steps_register')

        self.steps_log.delete()

        payload = {
        }

        response = self.client.post(url, payload)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("Este campo é obrigatório.", response.json().get('steps'))

    def test_post_steps_log_create_fail_for_unauthorized(self):
        url = reverse('physical_health:steps_register')

        self.client.logout()

        payload = {
            'steps': 1000,
        }

        response = self.client.post(url, payload)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED),
        self.assertEqual(response.json().get('detail'), 'As credenciais de autenticação não foram fornecidas.')