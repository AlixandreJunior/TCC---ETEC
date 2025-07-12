from django.urls import reverse
from django.utils import timezone
from rest_framework.test import APITestCase
from rest_framework import status
from datetime import datetime

from utils.usermixin import UserMixin
from apps.progress.models.objetives import Objective
from apps.mental_health.models.diary import Activity

class ObjetivesTest(APITestCase, UserMixin):
    def setUp(self):
        self.user = self.make_user_auth()

        self.activity = Activity.objects.create(
            name = 'Teste'
        )
        self.activity2 = Activity.objects.create(
            name = 'Teste2'
        )
        self.activity3 = Activity.objects.create(
            name = 'Teste3'
        )
        self.activity4 = Activity.objects.create(
            name = 'Teste4'
        )

        self.objective = Objective.objects.create(
            user = self.user, 
            activity = self.activity,
            deadline = timezone.make_aware(datetime(2000,1,1)),
            period = '1w'
            )
        
        self.objective2 = Objective.objects.create(
            user = self.user, 
            activity = self.activity2,
            deadline = timezone.make_aware(datetime(2000,1,1)),
            period = '1w'
            )
        
        self.objective3 = Objective.objects.create(
            user = self.user, 
            activity = self.activity3,
            deadline = timezone.make_aware(datetime(2000,1,1)),
            period = '1w'
            )
        
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

        self.objective3.delete()

        payload = {
            'activity': self.activity3.pk,
            'period': '2w'
        }

        response = self.client.post(url, payload)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.json().get('detail'), "Objetivo criado com sucesso.")

    def test_post_objective_create_fail_400_for_duplicate(self):
        url = reverse('progress:objective_create')

        self.objective3.delete()
        payload = {
            'activity': self.activity.pk,
            'period': '2w'
        }

        response = self.client.post(url, payload)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("Você já possui um objetivo com essa atividade.", response.json().get('activity'))

    def test_post_objective_create_fail_400_for_limit(self):
        url = reverse('progress:objective_create')

        payload = {
            'activity': self.activity4.pk,
            'period': '2w'
        }

        response = self.client.post(url, payload)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("Você só pode ter no máximo 3 objetivos ativos.", response.json().get('activity'))

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