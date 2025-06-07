from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status

from utils.usermixin import UserMixin
from apps.user.models.goals import Goal

class GoalTest(APITestCase,UserMixin ):
    def setUp(self):
        self.user = self.make_user_auth()
        self.user2 = self.make_user_not_auth()
        
        self.goal = Goal.objects.get(user = self.user)

    def test_get_goals(self):
        url = reverse('user:user_goals')

        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_goals_fail_for_unauthorized(self):
        url = reverse('user:user_goals')

        self.client.logout()

        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(response.json().get('detail'), 'As credenciais de autenticação não foram fornecidas.')

    def test_get_goals_update(self):
        url = reverse('user:user_goals_update')

        payload = {
            'steps_goal': 9000,
            'hydration_goal': 2000,
        }

        response = self.client.patch(url, payload)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json().get('detail'), "Metas atualizadas com sucesso.",)

    def test_get_goals_update_fail_for_unauthorized(self):
        url = reverse('user:user_goals_update')

        self.client.logout()

        payload = {
            'steps_goal': 9000,
            'hydration_goal': 2000,
        }

        response = self.client.patch(url, payload)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(response.json().get('detail'), 'As credenciais de autenticação não foram fornecidas.')
