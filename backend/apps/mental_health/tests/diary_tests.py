from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from django.utils import timezone
from apps.mental_health.models.diary import Diary
from utils.usermixin import UserMixin
from apps.mental_health.serializers.diary import DiarySerializer

class DiaryTests(APITestCase, UserMixin):
    def setUp(self):
        self.user = self.make_user_auth()

        self.diary = Diary.objects.create(
            user=self.user,
            title="Um dia tranquilo",
            content="Hoje eu consegui me concentrar bem e me senti mais leve.",
            date = timezone.datetime.now().date()
        )

    
    def test_get_diary(self):
        url = reverse('mental_health:diary_list')

        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK),
        self.assertEqual(response.json()[0].get('id'), 1)

    def test_get_diary_fail_for_404(self):
        url = reverse('mental_health:diary_list')

        self.diary.delete()

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
        url = reverse('mental_health:diary_object', args=[self.diary.date])

        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK),
        expected_data = DiarySerializer(self.diary).data
        self.assertEqual(expected_data , response.json())

    def test_get_diary_object_fail_for_404(self):
        date = timezone.datetime(2000, 1, 1)  # Torne ciente de fuso horário
        url = reverse('mental_health:diary_object', args=[date.date()])

        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND),
        self.assertEqual(response.json().get('detail'), 'Diário não encontrado.')
    
    def test_get_diary_object_fail_for_unauthorized(self):
        url = reverse('mental_health:diary_object', args=[self.diary.date])

        self.client.logout()

        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED),
        self.assertEqual(response.json().get('detail'), 'As credenciais de autenticação não foram fornecidas.')

    def test_patch_diary_update(self):
        url = reverse('mental_health:diary_update', args=[self.diary.date])

        payload = {
            'content': "Sinto que estou sendo testado",
        }

        response = self.client.patch(url, payload = payload)

        self.assertEqual(response.status_code, status.HTTP_200_OK),
        self.assertEqual(response.json().get('detail'), 'Diario atualizado com sucesso.')

    def test_patch_diary_update_fail_for_404(self):
        date = timezone.datetime(2000, 1, 1)
        url = reverse('mental_health:diary_update', args=[date.date()])

        payload = {
            'content': "",
        }

        response = self.client.patch(url, payload = payload)

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND),
        self.assertEqual(response.json().get('detail'), 'Diário não encontrado.')

    def test_patch_diary_update_fail_for_unauthorized(self):
        url = reverse('mental_health:diary_update', args=[self.diary.date])

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
            'title': "Um dia Estranho",
            'content': "Sinto que estou sendo testado",
        }

        response = self.client.post(url, payload)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.json().get('non_field_errors')[0], "Um novo diário só pode ser feito após 24 horas.")