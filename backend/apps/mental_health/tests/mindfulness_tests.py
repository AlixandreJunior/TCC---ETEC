from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from apps.mental_health.models.mindfulness import Mindfulness, MindfulnessLog
from apps.mental_health.serializers.mindfulness import MindfulnessSerializer, MindfulnessLogSerializer
from utils.usermixin import UserMixin

class MentalHealthTests(APITestCase, UserMixin):
    def setUp(self):
        self.user = self.make_user_auth()

        self.mindfulness = Mindfulness.objects.create(
            name="Respiração Consciente",
            duration=10,
            type="Foco na Respiração",
            description="Uma prática simples de atenção plena focada na respiração.",
            difficulty="Fácil"
        )

        self.mindfulness2 = Mindfulness.objects.create(
            name="Body Scan",
            duration=10,
            type="Escaneamento Corporal",
            description="Uma prática simples de atenção plena focada na respiração.",
            difficulty="Intermediário"
        )

        self.mindfulness_log = MindfulnessLog.objects.create(
            user = self.user,
            mindfulness = self.mindfulness,
        )

        self.mindfulness_log2 = MindfulnessLog.objects.create(
            user = self.user,
            mindfulness = self.mindfulness2,
        )

    
    def test_get_mindfulness(self):
        url = reverse('mental_health:mindfulness_list')

        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK),
        self.assertEqual(response.json()[0].get('id'), 1)

    def test_get_mindfulness_with_filter_for_type(self):
        url = reverse('mental_health:mindfulness_list')

        response = self.client.get(url, {'type': 'Escaneamento Corporal'})

        self.assertEqual(response.status_code, status.HTTP_200_OK),
        expected_data = MindfulnessSerializer(self.mindfulness2).data
        self.assertIn(expected_data, response.json())

    def test_get_mindfulness_with_filter_for_type_fail_for_404(self):
        url = reverse('mental_health:mindfulness_list')

        response = self.client.get(url, {'type': 'ERROR'})

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND),
        self.assertIn('Exercícios de Mindfulness não encontrados.', response.json().get('detail'))

    def test_get_mindfulness_with_filter_for_difficulty(self):
        url = reverse('mental_health:mindfulness_list')

        response = self.client.get(url, {'difficulty': 'Intermediário'})

        self.assertEqual(response.status_code, status.HTTP_200_OK),
        expected_data = MindfulnessSerializer(self.mindfulness2).data
        self.assertIn(expected_data, response.json())

    def test_get_mindfulness_with_filter_for_difficulty_fail_for_404(self):
        url = reverse('mental_health:mindfulness_list')

        response = self.client.get(url, {'difficulty': 'ERROR'})

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND),
        self.assertIn('Exercícios de Mindfulness não encontrados.', response.json().get('detail'))

    def test_get_mindfulness_fail_for_404(self):
        url = reverse('mental_health:mindfulness_list')

        self.mindfulness.delete()
        self.mindfulness2.delete()

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

    def test_get_mindfulness_log_with_filter_for_type(self):
        url = reverse('mental_health:mindfulness_log_list')

        response = self.client.get(url, {'type': 'Escaneamento Corporal'})

        self.assertEqual(response.status_code, status.HTTP_200_OK),
        expected_data = MindfulnessLogSerializer(self.mindfulness_log2).data
        self.assertIn(expected_data, response.json())

    def test_get_mindfulness_log_with_filter_for_type_fail_for_404(self):
        url = reverse('mental_health:mindfulness_log_list')

        response = self.client.get(url, {'type': 'ERROR'})

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND),
        self.assertIn('Registros de Mindfulness não encontrados.', response.json().get('detail'))

    def test_get_mindfulness_log_with_filter_for_difficulty(self):
        url = reverse('mental_health:mindfulness_log_list')

        response = self.client.get(url, {'difficulty': 'Intermediário'})

        self.assertEqual(response.status_code, status.HTTP_200_OK),
        expected_data = MindfulnessLogSerializer(self.mindfulness_log2).data
        self.assertIn(expected_data, response.json())

    def test_get_mindfulness_log_with_filter_for_difficulty_fail_for_404(self):
        url = reverse('mental_health:mindfulness_log_list')

        response = self.client.get(url, {'difficulty': 'ERROR'})

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND),
        self.assertIn('Registros de Mindfulness não encontrados.', response.json().get('detail'))


    def test_get_mindfulness_log_fail_for_404(self):
        url = reverse('mental_health:mindfulness_log_list')

        self.mindfulness.delete()
        self.mindfulness2.delete()

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
        }

        response = self.client.post(url, payload)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.json().get('detail'), "Registro de Mindfulness criado com sucesso.")

    def test_post_mindfullnes_log_create_fail_for_blank(self):
        url = reverse('mental_health:mindfulness_log_register')

        self.mindfulness_log.delete()

        payload = {

        }

        response = self.client.post(url, payload)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.json().get('mindfulness')[0], "Este campo é obrigatório.")

    def test_post_mindfullnes_log_create_fail_for_unauthorized(self):
        url = reverse('mental_health:mindfulness_log_register')

        self.client.logout()

        payload = {
            'mindfulness': self.mindfulness.pk,
        }

        response = self.client.post(url, payload)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED),
        self.assertEqual(response.json().get('detail'), 'As credenciais de autenticação não foram fornecidas.')
