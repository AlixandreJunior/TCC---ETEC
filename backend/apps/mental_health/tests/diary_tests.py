from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from django.utils import timezone
from apps.mental_health.models.diary import Diary
from utils.usermixin import UserMixin
from apps.mental_health.serializers.diary import DiaryReadSerializer

class DiaryTests(APITestCase, UserMixin):
    def setUp(self):
        self.user = self.make_user_auth()

        self.diary = Diary.objects.create(
            user=self.user,
            title = "Meu Diario",
            content = "COnteudo do diario",
            datetime = '2007-04-20',
            mood = 'Excelente'
        )

        self.diary2 = Diary.objects.create(
            user=self.user,
            title = "Meu Diario2",
            content = "Conteudo do diario",
            datetime = '2007-04-20',
            mood = 'Excelente'
        )

    def test_get_diary(self):
        url = reverse('mental_health:diary_list')

        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK),

    def test_get_diary_fail_for_404(self):
        url = reverse('mental_health:diary_list')

        self.diary.delete()
        self.diary2.delete()

        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND),
        self.assertEqual(response.json().get('detail'), 'Diarios não encontrados.')
    
    def test_get_diary_fail_for_unauthorized(self):
        url = reverse('mental_health:diary_list')

        self.client.logout()

        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED),
        self.assertEqual(response.json().get('detail'), 'As credenciais de autenticação não foram fornecidas.')

    def test_get_diary_object(self):
        url = reverse('mental_health:diary_object', args=[self.diary.title])

        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK),

    def test_get_diary_object_fail_for_404(self):
        url = reverse('mental_health:diary_object', args=['TESTE'])

        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND),
        self.assertEqual(response.json().get('detail'), 'Diário não encontrado.')
    
    def test_get_diary_object_fail_for_unauthorized(self):
        url = reverse('mental_health:diary_object', args=[self.diary.title])

        self.client.logout()

        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED),
        self.assertEqual(response.json().get('detail'), 'As credenciais de autenticação não foram fornecidas.')

    def test_patch_diary_update(self):
        url = reverse('mental_health:diary_update', args=[self.diary.title])

        payload = {
            'content': "Sinto que estou sendo testado",
        }

        response = self.client.patch(url, payload = payload)

        self.assertEqual(response.status_code, status.HTTP_200_OK),
        self.assertEqual(response.json().get('detail'), 'Diario atualizado com sucesso.')

    def test_patch_diary_update_fail_for_404(self):
        url = reverse('mental_health:diary_update', args=['Titulo errado.'])

        payload = {
            'content': "",
        }

        response = self.client.patch(url, payload = payload)

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND),
        self.assertEqual(response.json().get('detail'), 'Diário não encontrado.')

    def test_patch_diary_update_fail_for_unauthorized(self):
        url = reverse('mental_health:diary_update', args=[self.diary.title])

        self.client.logout()

        payload = {
            'content': "Sinto que estou sendo testado",
        }

        response = self.client.patch(url, payload = payload)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED),
        self.assertEqual(response.json().get('detail'), 'As credenciais de autenticação não foram fornecidas.')

    def test_post_diary_create(self):
        url = reverse('mental_health:diary_create')

        self.diary.delete()

        payload = {
            'title': "Um dia Estranho",
            'content': "Sinto que estou sendo testado",
            'mood': 'Excelente'
        }

        response = self.client.post(url, payload)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.json().get('detail'), "Diario criado com sucesso.")

    def test_post_diary_create_fail_for_blank(self):
        url = reverse('mental_health:diary_create')

        self.diary.delete()

        payload = {
            'title': "Um dia Estranho",
            'content': "",
        }

        response = self.client.post(url, payload)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.json().get('content')[0], "Este campo não pode ser em branco.")

    def test_post_diary_create_fail_for_unauthorized(self):
        url = reverse('mental_health:diary_create')

        self.client.logout()

        payload = {
            'title': "Um dia Estranho",
            'content': "Sinto que estou sendo testado",
        }

        response = self.client.post(url, payload)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED),
        self.assertEqual(response.json().get('detail'), 'As credenciais de autenticação não foram fornecidas.')

    def test_post_diary_create_fail_for_duplicate(self):
        url = reverse('mental_health:diary_create')

        payload = {
            'title': "Meu Diario2",
            'content': "Sinto que estou sendo testado",
            'mood': "Péssimo"
        }

        response = self.client.post(url, payload)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('Você já criou um diário com esse título.', response.json().get('title'))
