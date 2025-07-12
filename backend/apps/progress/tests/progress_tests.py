from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status

from utils.usermixin import UserMixin
from apps.progress.models.progress import UserProgress

class ProgressTest(APITestCase, UserMixin):
    def setUp(self):
        self.user = self.make_user_auth()

        self.progress = UserProgress.objects.get(user = self.user)

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