from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from utils.usermixin import UserMixin
from apps.physical_health.models.exercise import Exercise, ExerciseLog
from apps.physical_health.serializers.exercise import ExerciseSerializer, ExerciseLogSerializer

class ExerciseTests(APITestCase, UserMixin):
    def setUp(self):
        self.user = self.make_user_auth()

        self.exercise = Exercise.objects.create(
            name="Alongamento Matinal",
            duration=15,
            type="Flexibilidade",
            description="Uma rotina de alongamento leve para começar o dia com mais disposição.",
            difficulty="Fácil"
        )

        self.exercise2 = Exercise.objects.create(
            name="Corrida",
            duration=15,
            type="Aeróbico",
            description="Fiz uma corrida bem intensa.",
            difficulty="Intermediário"
        )

        self.exercise_log = ExerciseLog.objects.create(
            user=self.user,
            exercise=self.exercise,
        )

        self.exercise_log2 = ExerciseLog.objects.create(
            user=self.user,
            exercise=self.exercise2,
        )

    

    def test_get_exercise(self):
        url = reverse('physical_health:exercise_list')

        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK),
        self.assertEqual(response.json()[0].get('id'), 1)

    def test_get_exercise_with_filter_for_type(self):
        url = reverse('physical_health:exercise_list')

        response = self.client.get(url, {'type': 'Aeróbico'})

        self.assertEqual(response.status_code, status.HTTP_200_OK),
        expected_data = ExerciseSerializer(self.exercise2).data
        self.assertIn(expected_data, response.json())

    def test_get_exercise_with_filter_for_type_fail_for_404(self):
        url = reverse('physical_health:exercise_list')

        response = self.client.get(url, {'type': 'ERROR'})

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND),
        self.assertIn('Exercícios não encontrados.', response.json().get('detail'))

    def test_get_exercise_with_filter_for_difficulty(self):
        url = reverse('physical_health:exercise_list')

        response = self.client.get(url, {'difficulty': 'Intermediário'})

        self.assertEqual(response.status_code, status.HTTP_200_OK),
        expected_data = ExerciseSerializer(self.exercise2).data
        self.assertIn(expected_data, response.json())

    def test_get_exercise_with_filter_for_difficulty_fail_for_404(self):
        url = reverse('physical_health:exercise_list')

        response = self.client.get(url, {'difficulty': 'ERROR'})

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND),
        self.assertIn('Exercícios não encontrados.', response.json().get('detail'))

    def test_get_exercise_fail_for_404(self):
        url = reverse('physical_health:exercise_list')

        self.exercise.delete()
        self.exercise2.delete()

        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND),
        self.assertEqual(response.json().get('detail'), 'Exercícios não encontrados.')
    
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

    def test_get_exercise_log_with_filter_for_type(self):
        url = reverse('physical_health:exercise_log_list')

        response = self.client.get(url, {'type': 'Aeróbico'})

        self.assertEqual(response.status_code, status.HTTP_200_OK),
        expected_data = ExerciseLogSerializer(self.exercise_log2).data
        self.assertIn(expected_data, response.json())

    def test_get_exercise_log_with_filter_for_type_fail_for_404(self):
        url = reverse('physical_health:exercise_log_list')

        response = self.client.get(url, {'type': 'ERROR'})

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND),
        self.assertIn("Registros de Exercícios não encontrados.", response.json().get('detail'))

    def test_get_exercise_log_with_filter_for_difficulty(self):
        url = reverse('physical_health:exercise_log_list')

        response = self.client.get(url, {'difficulty': 'Intermediário'})

        self.assertEqual(response.status_code, status.HTTP_200_OK),
        expected_data = ExerciseLogSerializer(self.exercise_log2).data
        self.assertIn(expected_data, response.json())

    def test_get_exercise_log_with_filter_for_difficulty_fail_for_404(self):
        url = reverse('physical_health:exercise_log_list')

        response = self.client.get(url, {'difficulty': 'ERROR'})

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND),
        self.assertIn("Registros de Exercícios não encontrados.", response.json().get('detail'))


    def test_get_exercise_log_fail_for_404(self):
        url = reverse('physical_health:exercise_log_list')

        self.exercise_log.delete()
        self.exercise_log2.delete()

        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND),
        self.assertEqual(response.json().get('detail'), 'Registros de Exercícios não encontrados.')
    
    def test_get_exercise_log_fail_for_unauthorized(self):
        url = reverse('physical_health:exercise_log_list')

        self.client.logout()

        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED),
        self.assertEqual(response.json().get('detail'), 'As credenciais de autenticação não foram fornecidas.')
        
    def test_post_exercise_log_create(self):
        url = reverse('physical_health:exercise_log_register')

        self.exercise_log.delete()
        self.exercise_log2.delete()

        payload = {
            'exercise': self.exercise.pk,
        }

        response = self.client.post(url, payload)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.json().get('detail'), "Registro de exercícios registrado com sucesso.")

    def test_post_exercise_log_create_fail_for_blank(self):
        url = reverse('physical_health:exercise_log_register')

        self.exercise_log.delete()
        self.exercise_log2.delete()


        payload = {

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