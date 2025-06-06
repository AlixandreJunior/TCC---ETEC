from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from utils.usermixin import UserMixin
from apps.physical_health.models.hydratation import HydrationLog

class HydratationTests(APITestCase, UserMixin):
    def setUp(self):
        self.user = self.make_user_auth()

        self.hydratation_log = HydrationLog.objects.create(
            user=self.user,
            quantity=2000,
            goal_achieved=True,
        )
    
    def test_get_hydratation(self):
        url = reverse('physical_health:hydratation_list')

        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK),
        self.assertEqual(response.json()[0].get('id'), 1)

    def test_get_hydratation_fail_for_404(self):
        url = reverse('physical_health:hydratation_list')

        self.hydratation_log.delete()

        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND),
        self.assertEqual(response.json().get('detail'), 'Registros de Hidratação não encontrados.')
    
    def test_get_hydratation_fail_for_unauthorized(self):
        url = reverse('physical_health:hydratation_list')

        self.client.logout()

        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED),
        self.assertEqual(response.json().get('detail'), 'As credenciais de autenticação não foram fornecidas.')

    def test_post_hydratation_log_create(self):
        url = reverse('physical_health:hydratation_register')

        self.hydratation_log.delete()

        payload = {
            'quantity': 1000,
            'goal_achieved': False
        }

        response = self.client.post(url, payload)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.json().get('detail'), "Registro de Hidratação registrado com sucesso.")

    def test_post_hydratation_log_create_fail_for_blank(self):
        url = reverse('physical_health:hydratation_register')

        self.hydratation_log.delete()

        payload = {
            'goal_achieved': False
        }

        response = self.client.post(url, payload)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("Este campo é obrigatório.", response.json().get('quantity'))

    def test_post_hydratation_log_create_fail_for_unauthorized(self):
        url = reverse('physical_health:hydratation_register')

        self.client.logout()

        payload = {
            'quantity': 1000,
            'goal_achieved': False
        }

        response = self.client.post(url, payload)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED),
        self.assertEqual(response.json().get('detail'), 'As credenciais de autenticação não foram fornecidas.')
