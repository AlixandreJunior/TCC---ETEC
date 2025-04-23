from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from django.utils import timezone
from utils.usermixin import UserMixin
from apps.physical_health import models

class PhysicalHealthTests(APITestCase, UserMixin):
    def setUp(self):
        self.user = self.make_user_auth()

        self.checkin = models.PhysicalCheckin.objects.create(
            user=self.user,
            energy_level=7,
            activity_level=8,
            sleep_quality="boa",
            healthy_eating="regular",
            is_pain=False,
            is_took_medicine=True,
            is_used_screen_too_much=False,
            notes="Me senti bem hoje, dormi melhor.",
            date = timezone.now().today(),
        )

        self.steps_log = models.StepsLog.objects.create(
            user=self.user,
            steps=8500,
            goal_achieved=True,
        )

        self.hydratation_log = models.HydrationLog.objects.create(
            user=self.user,
            quantity=2000,
            goal_achieved=True,
        )

        self.exercise = models.Exercise.objects.create(
            name="Alongamento Matinal",
            duration=15,
            type="Alongamento",
            description="Uma rotina de alongamento leve para começar o dia com mais disposição.",
            difficulty="Fácil"
        )

        self.exercise_log = models.ExerciseLog.objects.create(
            user=self.user,
            exercise=self.exercise,
            rating=4,
        )

    def test_get_physicalcheckin(self):
        url = reverse('physical_health:checkin_list')

        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK),
        self.assertEqual(response.json()[0].get('id'), 1)

    def test_get_physicalcheckin_fail_for_404(self):
        url = reverse('physical_health:checkin_list')

        self.checkin.delete()

        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND),
        self.assertEqual(response.json().get('detail'), 'Registros de Check-In não encontrados.')
    
    def test_get_physicalcheckin_fail_for_unauthorized(self):
        url = reverse('physical_health:checkin_list')

        self.client.logout()

        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED),
        self.assertEqual(response.json().get('detail'), 'As credenciais de autenticação não foram fornecidas.')

    def test_post_physicalcheckin_create(self):
        url = reverse('physical_health:checkin_create')

        self.checkin.delete()

        payload = {
            'energy_level':7,
            'activity_level':8,
            'sleep_quality':"boa",
            'healthy_eating':"regular",
            'is_pain':False,
            'is_took_medicine':True,
            'is_used_screen_too_much':False,
            'notes':"Sinto que estou sendo testado."
        }

        response = self.client.post(url, payload)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.json().get('detail'), "Check-In Criado com sucesso.")

    def test_post_physicalcheckin_create_fail_for_blank(self):
        url = reverse('physical_health:checkin_create')

        self.checkin.delete()

        payload = {
            'energy_level':7,
            'activity_level':8,
            'is_pain':False,
            'is_took_medicine':True,
            'is_used_screen_too_much':False,
            'notes':"Sinto que estou sendo testado."
        }

        response = self.client.post(url, payload)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('Este campo é obrigatório.', response.json().get('sleep_quality'))
        self.assertIn('Este campo é obrigatório.', response.json().get('healthy_eating'))

    def test_post_physicalcheckin_create_fail_for_not_boolean(self):
        url = reverse('physical_health:checkin_create')

        self.checkin.delete()

        payload = {
            'energy_level':7,
            'activity_level':8,
            'sleep_quality':"boa",
            'healthy_eating':"regular",
            'is_pain': '',
            'is_took_medicine': '',
            'is_used_screen_too_much': '',
            'notes':"Sinto que estou sendo testado."
        }

        response = self.client.post(url, payload)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('Must be a valid boolean.', response.json().get('is_used_screen_too_much'))
        self.assertIn('Must be a valid boolean.', response.json().get('is_took_medicine'))
        self.assertIn('Must be a valid boolean.', response.json().get('is_pain'))


    def test_post_physicalcheckin_create_fail_for_level_bigger_10(self):
        url = reverse('physical_health:checkin_create')
         
        self.checkin.delete()

        payload = {
            'energy_level':11,
            'activity_level':11,
            'sleep_quality':"boa",
            'healthy_eating':"regular",
            'is_pain':False,
            'is_took_medicine':True,
            'is_used_screen_too_much':False,
            'notes':"Sinto que estou sendo testado."
        }

        self.client.post(url, payload)
        response = self.client.post(url, payload)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('Certifique-se de que este valor seja inferior ou igual a 10.', response.json().get('activity_level'))
        self.assertIn('Certifique-se de que este valor seja inferior ou igual a 10.', response.json().get('energy_level'))

    def test_post_physicalcheckin_create_fail_for_invalid_choice(self):
        url = reverse('physical_health:checkin_create')

        self.checkin.delete()

        payload = {
            'energy_level':7,
            'activity_level':8,
            'sleep_quality':"Teste",
            'healthy_eating':"Teste",
            'is_pain':False,
            'is_took_medicine':True,
            'is_used_screen_too_much':False,
            'notes':"Sinto que estou sendo testado."
        }

        response = self.client.post(url, payload)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('"Teste" não é um escolha válido.', response.json().get('sleep_quality'))
        self.assertIn('"Teste" não é um escolha válido.', response.json().get('healthy_eating'))

    def test_post_physicalcheckin_create_fail_for_duplicate_checkin_in_date(self):
        url = reverse('physical_health:checkin_create')

        payload = {
            'energy_level':7,
            'activity_level':8,
            'sleep_quality':"boa",
            'healthy_eating':"regular",
            'is_pain':False,
            'is_took_medicine':True,
            'is_used_screen_too_much':False,
            'notes':"Sinto que estou sendo testado."
        }

        response = self.client.post(url, payload)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('Um novo check-in só pode ser feito após 24 horas.', response.json().get('non_field_errors'))

    def test_post_physicalcheckin_create_fail_for_unauthorized(self):
        url = reverse('physical_health:checkin_create')
        
        self.client.logout()

        self.checkin.delete()

        payload = {
            'energy_level':7,
            'activity_level':8,
            'sleep_quality':"BOA",
            'healthy_eating':"REGULAR",
            'is_pain':False,
            'is_took_medicine':True,
            'is_used_screen_too_much':False,
            'notes':"Sinto que estou sendo testado."
        }

        self.client.post(url, payload)
        response = self.client.post(url, payload)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED),
        self.assertEqual(response.json().get('detail'), 'As credenciais de autenticação não foram fornecidas.')

    def test_get_steps(self):
        url = reverse('physical_health:steps_list')

        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK),
        self.assertEqual(response.json()[0].get('id'), 1)

    def test_get_steps_fail_for_404(self):
        url = reverse('physical_health:steps_list')

        self.steps_log.delete()

        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND),
        self.assertEqual(response.json().get('detail'), 'Registros de Passos não encontrados.')
    
    def test_get_steps_fail_for_unauthorized(self):
        url = reverse('physical_health:steps_list')

        self.client.logout()

        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED),
        self.assertEqual(response.json().get('detail'), 'As credenciais de autenticação não foram fornecidas.')

    def test_get_steps_fail_for_unauthorized(self):
        url = reverse('physical_health:steps_list')

        self.client.logout()

        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED),
        self.assertEqual(response.json().get('detail'), 'As credenciais de autenticação não foram fornecidas.')

    def test_post_steps_log_create(self):
        url = reverse('physical_health:steps_register')

        self.steps_log.delete()

        payload = {
            'steps': 1000,
            'goal_achieved': False
        }

        response = self.client.post(url, payload)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.json().get('detail'), "Registro de passos registrado com sucesso.")

    def test_post_steps_log_create_fail_for_blank(self):
        url = reverse('physical_health:steps_register')

        self.steps_log.delete()

        payload = {
            'goal_achieved': False
        }

        response = self.client.post(url, payload)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("Este campo é obrigatório.", response.json().get('steps'))

    def test_post_steps_log_create_fail_for_unauthorized(self):
        url = reverse('physical_health:steps_register')

        self.client.logout()

        payload = {
            'steps': 1000,
            'goal_achieved': False
        }

        response = self.client.post(url, payload)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED),
        self.assertEqual(response.json().get('detail'), 'As credenciais de autenticação não foram fornecidas.')


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

    def test_get_exercise(self):
        url = reverse('physical_health:exercise_list')

        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK),
        self.assertEqual(response.json()[0].get('id'), 1)

    def test_get_exercise_fail_for_404(self):
        url = reverse('physical_health:exercise_list')

        self.exercise.delete()

        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND),
        self.assertEqual(response.json().get('detail'), 'Exercicios não encontrados.')
    
    def test_get_exercise_fail_for_unauthorized(self):
        url = reverse('physical_health:exercise_list')

        self.client.logout()

        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED),
        self.assertEqual(response.json().get('detail'), 'As credenciais de autenticação não foram fornecidas.')

    def test_get_exercise_log(self):
        url = reverse('physical_health:exercise_log_list')

        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK),
        self.assertEqual(response.json()[0].get('id'), 1)

    def test_get_exercise_log_fail_for_404(self):
        url = reverse('physical_health:exercise_log_list')

        self.exercise.delete()

        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND),
        self.assertEqual(response.json().get('detail'), 'Registros de Exercicios não encontrados.')
    
    def test_get_exercise_log_fail_for_unauthorized(self):
        url = reverse('physical_health:exercise_log_list')

        self.client.logout()

        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED),
        self.assertEqual(response.json().get('detail'), 'As credenciais de autenticação não foram fornecidas.')
        
    def test_post_exercise_log_create(self):
        url = reverse('physical_health:exercise_log_register')

        self.exercise_log.delete()

        payload = {
            'exercise': self.exercise.pk,
            'rating': 4
        }

        response = self.client.post(url, payload)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.json().get('detail'), "Registro de exercícios registrado com sucesso.")

    def test_post_exercise_log_create_fail_for_blank(self):
        url = reverse('physical_health:exercise_log_register')

        self.exercise_log.delete()

        payload = {
            'rating': 4
        }

        response = self.client.post(url, payload)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.json().get('exercise')[0], "Este campo é obrigatório.")

    def test_post_exercise_log_create_fail_for_unauthorized(self):
        url = reverse('physical_health:exercise_log_register')

        self.client.logout()

        payload = {
            'exercise': self.exercise.pk,
            'rating': 4
        }

        response = self.client.post(url, payload)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED),
        self.assertEqual(response.json().get('detail'), 'As credenciais de autenticação não foram fornecidas.')