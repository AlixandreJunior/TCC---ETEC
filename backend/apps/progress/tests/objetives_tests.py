from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status

from utils.usermixin import UserMixin
from apps.progress.models.objetives import Objective
from apps.progress.serializers.objetives import ObjectiveSerializer

class ObjetivesTest(APITestCase, UserMixin):
    def setUp(self):
        self.user = self.make_user_auth()

        self.objective = Objective.objects.create(
            user = self.user, 
            name = 'RANNNNN ',
            status = 'Pendente',
            priority = 'Baixa',
            description = "RANNNNNN"
            )
        
        self.objective2 = Objective.objects.create(
            user = self.user, 
            name = 'NARRRRRR ',
            status = 'Atrasado',
            priority = 'Alta',
            description = "NARRRRR"
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