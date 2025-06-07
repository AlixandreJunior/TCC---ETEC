from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from apps.mental_health.models.checkin import MentalCheckin
from utils.usermixin import UserMixin

class CheckInTests(APITestCase, UserMixin):
    def setUp(self):
        self.user = self.make_user_auth()

        self.checkin = MentalCheckin.objects.create(
            user=self.user,
            mood= MentalCheckin.MoodChoices.FELIZ,
            stress_level=4,
            anxiety_level=3,
            is_feeling_lonely=False,
            is_low_self_esteem=False,
            is_overwhelmed=True,
            notes="Me senti produtivo hoje, mas um pouco sobrecarregado no final do dia."
        )

    def test_get_mentalcheckin(self):
        url = reverse('mental_health:checkin_list')

        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK),
        self.assertEqual(response.json()[0].get('id'), 1)

    def test_get_mentalcheckin_fail_for_404(self):
        url = reverse('mental_health:checkin_list')

        self.checkin.delete()

        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND),
        self.assertEqual(response.json().get('detail'), 'Registros de Check-In não encontrados.')
    
    def test_get_mentalcheckin_fail_for_unauthorized(self):
        url = reverse('mental_health:checkin_list')

        self.client.logout()

        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED),
        self.assertEqual(response.json().get('detail'), 'As credenciais de autenticação não foram fornecidas.')

    def test_post_mentalcheckin_create(self):
        url = reverse('mental_health:checkin_create')

        self.checkin.delete()

        payload = {
            'mood': 'Neutro',
            'stress_level':4,
            'anxiety_level':3,
            'is_feeling_lonely':False,
            'is_low_self_esteem':False,
            'is_overwhelmed':True,
            'notes':"Me Sinto Neutro."
        }

        response = self.client.post(url, payload)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.json().get('detail'), "Check-In Criado com sucesso.")

    def test_post_mentalcheckin_create_fail_for_blank(self):
        url = reverse('mental_health:checkin_create')

        self.checkin.delete()

        payload = {
            'stress_level':4,
            'anxiety_level':3,
            'is_feeling_lonely': False,
            'is_low_self_esteem': True,
            'is_overwhelmed': True,
            'notes':"Me Sinto Neutro."
        }

        response = self.client.post(url, payload)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.json().get('mood')[0], 'Este campo é obrigatório.')

    def test_post_mentalcheckin_create_fail_for_not_boolean(self):
        url = reverse('mental_health:checkin_create')

        self.checkin.delete()

        payload = {
            'mood': 'Neutro',
            'stress_level':4,
            'anxiety_level':3,
            'is_feeling_lonely': '',
            'is_low_self_esteem': True,
            'is_overwhelmed': True,
            'notes':"Me Sinto Neutro."
        }

        response = self.client.post(url, payload)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.json().get('is_feeling_lonely')[0], 'Must be a valid boolean.')

    def test_post_mentalcheckin_create_fail_for_level_bigger_10(self):
        url = reverse('mental_health:checkin_create')
         
        self.checkin.delete()

        payload = {
            'mood': 'Neutro',
            'stress_level':11,
            'anxiety_level':11,
            'is_feeling_lonely': False,
            'is_low_self_esteem': True,
            'is_overwhelmed': True,
            'notes':"Me Sinto Neutro."
        }

        self.client.post(url, payload)
        response = self.client.post(url, payload)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.json().get('stress_level')[0], 'Certifique-se de que este valor seja inferior ou igual a 10.')
        self.assertEqual(response.json().get('anxiety_level')[0], 'Certifique-se de que este valor seja inferior ou igual a 10.')

    def test_post_mentalcheckin_create_fail_for_invalid_mood(self):
        url = reverse('mental_health:checkin_create')

        self.checkin.delete()

        payload = {
            'mood': 'Teste',
            'stress_level':4,
            'anxiety_level':3,
            'is_feeling_lonely': False,
            'is_low_self_esteem': True,
            'is_overwhelmed': True,
            'notes':"Me Sinto Neutro."
        }

        response = self.client.post(url, payload)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.json().get('mood')[0], '"Teste" não é um escolha válido.')

    def test_post_mentalcheckin_create_fail_for_duplicate_checkin_in_date(self):
        url = reverse('mental_health:checkin_create')

        payload = {
            'mood': 'Neutro',
            'stress_level':4,
            'anxiety_level':3,
            'is_feeling_lonely': False,
            'is_low_self_esteem': True,
            'is_overwhelmed': True,
            'notes':"Me Sinto Neutro."
        }

        response = self.client.post(url, payload)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.json().get('non_field_errors')[0], 'Um novo check-in só pode ser feito após 24 horas.')

    def test_post_mentalcheckin_create_fail_for_unauthorized(self):
        url = reverse('mental_health:checkin_create')
        
        self.client.logout()

        self.checkin.delete()

        payload = {
            'mood': 'Neutro',
            'stress_level':5,
            'anxiety_level':5,
            'is_feeling_lonely': False,
            'is_low_self_esteem': True,
            'is_overwhelmed': True,
            'notes':"Me Sinto Neutro."
        }

        self.client.post(url, payload)
        response = self.client.post(url, payload)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED),
        self.assertEqual(response.json().get('detail'), 'As credenciais de autenticação não foram fornecidas.')