from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from django.utils import timezone
from utils.usermixin import UserMixin
from apps.mental_health import models

class MentalHealthTests(APITestCase, UserMixin):
    def setUp(self):
        self.user = self.make_user_auth()

        self.checkin = models.MentalCheckin.objects.create(
            user=self.user,
            mood=models.MentalCheckin.MoodChoices.FELIZ,
            stress_level=4,
            anxiety_level=3,
            is_feeling_lonely=False,
            is_low_self_esteem=False,
            is_overwhelmed=True,
            notes="Me senti produtivo hoje, mas um pouco sobrecarregado no final do dia."
        )

        self.diary = models.Diary.objects.create(
            user=self.user,
            title="Um dia tranquilo",
            content="Hoje eu consegui me concentrar bem e me senti mais leve.",
            date = timezone.datetime.now().date()
        )

        self.mindfulness = models.Mindfulness.objects.create(
            name="Respiração Consciente",
            duration=10,
            type="Meditação Guiada",
            description="Uma prática simples de atenção plena focada na respiração.",
            difficulty="Fácil"
        )

        self.mindfulness_log = models.MindfulnessLog.objects.create(
            user = self.user,
            mindfulness = self.mindfulness,
            created_at = timezone.datetime.now().date()
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
        self.assertEqual(response.json().get('id'), 1)

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

    def test_get_mindfulness(self):
        url = reverse('mental_health:mindfulness_list')

        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK),
        self.assertEqual(response.json()[0].get('id'), 1)

    def test_get_mindfulness_fail_for_404(self):
        url = reverse('mental_health:mindfulness_list')

        self.mindfulness.delete()

        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND),
        self.assertEqual(response.json().get('detail'), 'Exercícios de Mindfulness não encontrados.')
    
    def test_get_mindfulness_fail_for_unauthorized(self):
        url = reverse('mental_health:mindfulness_list')

        self.client.logout()

        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED),
        self.assertEqual(response.json().get('detail'), 'As credenciais de autenticação não foram fornecidas.')

    def test_get_mindfulness_log(self):
        url = reverse('mental_health:mindfulness_log_list')

        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK),
        self.assertEqual(response.json()[0].get('id'), 1)

    def test_get_mindfulness_log_fail_for_404(self):
        url = reverse('mental_health:mindfulness_log_list')

        self.mindfulness.delete()

        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND),
        self.assertEqual(response.json().get('detail'), 'Registros de Mindfulness não encontrados.')
    
    def test_get_mindfulness_log_fail_for_unauthorized(self):
        url = reverse('mental_health:mindfulness_log_list')

        self.client.logout()

        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED),
        self.assertEqual(response.json().get('detail'), 'As credenciais de autenticação não foram fornecidas.')
        
    def test_post_mindfullnes_log_create(self):
        url = reverse('mental_health:mindfulness_log_register')

        self.mindfulness_log.delete()

        payload = {
            'mindfulness': self.mindfulness.pk,
            'rating': 4
        }

        response = self.client.post(url, payload)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.json().get('detail'), "Registro de Mindfulness criado com sucesso.")

    def test_post_mindfullnes_log_create_fail_for_blank(self):
        url = reverse('mental_health:mindfulness_log_register')

        self.mindfulness_log.delete()

        payload = {
            'rating': 4
        }

        response = self.client.post(url, payload)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.json().get('mindfulness')[0], "Este campo é obrigatório.")

    def test_post_mindfullnes_log_create_fail_for_unauthorized(self):
        url = reverse('mental_health:mindfulness_log_register')

        self.client.logout()

        payload = {
            'mindfulness': self.mindfulness.pk,
            'rating': 4
        }

        response = self.client.post(url, payload)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED),
        self.assertEqual(response.json().get('detail'), 'As credenciais de autenticação não foram fornecidas.')