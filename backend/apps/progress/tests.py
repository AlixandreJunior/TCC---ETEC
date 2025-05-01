from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status

from utils.usermixin import UserMixin
from apps.progress import models, serializers

class ProgressTest(APITestCase, UserMixin):
    def setUp(self):
        self.user = self.make_user_auth()

        self.progress = models.UserProgress.objects.get(user = self.user)
        self.objective = models.Objective.objects.create(
            user = self.user, 
            name = 'RANNNNN ',
            status = 'Pendente',
            priority = 'Baixa',
            description = "RANNNNNN"
            )
        
        self.objective2 = models.Objective.objects.create(
            user = self.user, 
            name = 'NARRRRRR ',
            status = 'Atrasado',
            priority = 'Alta',
            description = "NARRRRR"
            )
        
        self.achievement = models.Achievement.objects.create(
            name = 'Conquista', 
            category = "TESTE", 
            condition = "Teste"
        )

        self.achievement2 = models.Achievement.objects.create(
            name = 'Conquista2', 
            category = "TESTE2", 
            condition = "Teste2"
        )
        
        self.userachievement = models.AchievementLog.objects.create(
            user = self.user,
            achievement = self.achievement
        )

        self.userachievement2 = models.AchievementLog.objects.create(
            user = self.user,
            achievement = self.achievement2
        )

    def test_get_progress(self):
        url = reverse('progress:progress')

        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_progress_fail_for_unauthorized(self):
        url = reverse('progress:progress')
        self.client.logout()

        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(response.json().get('detail'), 'As credenciais de autenticação não foram fornecidas.')

    def test_get_objectives(self):
        url = reverse('progress:objective')

        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_objectives_fail_for_unauthorized(self):
        url = reverse('progress:objective')
        self.client.logout()

        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(response.json().get('detail'), 'As credenciais de autenticação não foram fornecidas.')

    def test_post_objective_create(self):
        url = reverse('progress:objective_create')

        payload = {
            'name': 'Objetivo',
            'description': 'Descrição'
        }

        response = self.client.post(url, payload)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.json().get('detail'), "Objetivo criado com sucesso.")

    def test_post_objective_create_fail_for_unauthorized(self):
        url = reverse('progress:objective_create')

        self.client.logout()

        payload = {
            'name': 'Objetivo',
            'description': 'Descrição'
        }

        response = self.client.post(url, payload)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(response.json().get('detail'), 'As credenciais de autenticação não foram fornecidas.')

    def test_get_achievements(self):
        url = reverse('progress:achievements')

        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_achievements_filter_for_category(self):
        url = reverse('progress:achievements')

        response = self.client.get(url, {'category': 'TESTE2'})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        expected_data = serializers.AchievementSerializer(self.achievement2).data
        self.assertIn( expected_data, response.json())

    def test_get_achievements_filter_for_category_fail_for_404(self):
        url = reverse('progress:achievements')

        response = self.client.get(url, {'category': 'TESTE3'})

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertIn( 'Conquistas não encontradas.', response.json().get('detail'))

    def test_get_achievements_fail_for_unauthorized(self):
        url = reverse('progress:achievements')
        self.client.logout()

        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(response.json().get('detail'), 'As credenciais de autenticação não foram fornecidas.')

    def test_get_achievements_user(self):
        url = reverse('progress:achievements_user')

        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_achievements_user_filter_for_category(self):
        url = reverse('progress:achievements_user')

        response = self.client.get(url, {'category': 'TESTE2'})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        expected_data = serializers.AchievementLogSerializer(self.userachievement2).data
        self.assertIn( expected_data, response.json())

    def test_get_achievements_user_filter_for_category_fail_for_404(self):
        url = reverse('progress:achievements_user')

        response = self.client.get(url, {'category': 'TESTE3'})

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertIn( 'Conquistas não encontradas.', response.json().get('detail'))

    def test_get_achievements_user_fail_for_unauthorized(self):
        url = reverse('progress:achievements_user')
        self.client.logout()

        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(response.json().get('detail'), 'As credenciais de autenticação não foram fornecidas.')
