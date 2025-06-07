from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from django.core.files.uploadedfile import SimpleUploadedFile
from io import BytesIO
from PIL import Image

from utils.usermixin import UserMixin
from apps.user.models.user import User

class UserTest(APITestCase,UserMixin ):
    def setUp(self):
        self.user = self.make_user_auth()
        self.user2 = self.make_user_not_auth()
        
    def test_get_user_object(self):
        url = reverse('user:user')

        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json().get('username'), 'username')

    def test_get_user_object_unauthorized(self):
        url = reverse('user:user')

        self.client.logout()

        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(response.json().get('detail'), 'As credenciais de autenticação não foram fornecidas.')

    def test_post_user_create(self):
        api_url = reverse('user:user_create')

        valid_data = {
            "first_name": "Novo",
            "last_name": "Usuário",
            "username": "novouser",
            "password": "SenhaCorreta321",
            "email": "novouser@email.com",
            "gender": "Masculino",
            'birth_date': '2000-01-01'
        }

        response = self.client.post(api_url, data=valid_data, format='json')

        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.json(), "Usuario criado com sucesso.")


    def test_post_user_create_with_avatar(self):
        api_url = reverse('user:user_create')

        # Criando uma imagem de teste
        image = Image.new('RGB', (100, 100), color='red')
        image_file = BytesIO()
        image.save(image_file, format='JPEG')
        image_file.name = 'test_avatar.jpg'
        image_file.seek(0) 

        # Criando um arquivo de imagem para upload
        avatar = SimpleUploadedFile(image_file.name, image_file.read(), content_type="image/jpeg")

        # Dados válidos para criação de usuário, com foto
        valid_data = {
            "first_name": "Novo",
            "last_name": "Usuário",
            "username": "novouser",
            "password": "SenhaCorreta321",
            "email": "novouser@email.com",
            "gender": "Masculino",
            'birth_date': '2000-01-01',
            "avatar": avatar
        }

        response = self.client.post(api_url, data=valid_data, format='multipart')

        # Verifica se o usuário foi criado com sucesso e a foto foi salva
        self.assertEqual(response.status_code, 201)

        user_profile = User.objects.get(username=valid_data.get("username"))

        self.assertTrue(user_profile.avatar.name.startswith('avatar/test_avatar.jpg'))

        user_profile.avatar.delete()

    def test_post_user_create_fail_for_blank(self):
        api_url = reverse('user:user_create')

        valid_data = {
            "first_name": "Novo",
            "last_name": "Usuário",
            "username": "",
            "password": "SenhaCorreta321",
            "email": "novouser@email.com",
            "gender": "Masculino",
            'birth_date': '2000-01-01'
        }

        response = self.client.post(api_url, data=valid_data, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.json().get("username")[0], "Este campo não pode ser em branco.")

    def test_post_user_create_fail_for_password(self):
        api_url = reverse('user:user_create')

        valid_data = {
            "first_name": "Novo",
            "last_name": "Usuário",
            "username": "novouser",
            "password": "123",
            "email": "novouser@email.com",
            "gender": "Masculino",
            'birth_date': '2000-01-01'
        }

        response = self.client.post(api_url, data=valid_data, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.json().get("password")[0], 'Esta senha é muito curta. Ela precisa conter pelo menos 8 caracteres.')
        self.assertEqual(response.json().get("password")[1], 'Esta senha é muito comum.')
        self.assertEqual(response.json().get("password")[2], 'Esta senha é inteiramente numérica.')

    def test_post_user_create_fail_for_email(self):
        api_url = reverse('user:user_create')

        valid_data = {
            "first_name": "Novo",
            "last_name": "Usuário",
            "username": "novouser",
            "password": "SenhaCorreta321",
            "email": "emailerrado.com",
            "gender": "Masculino",
            'birth_date': '2000-01-01'
        }

        response = self.client.post(api_url, data=valid_data, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.json().get("email")[0], 'Insira um endereço de email válido.')

    def test_post_user_create_fail_for_avatar_type(self):
        api_url = reverse('user:user_create')

        image = Image.new('RGB', (100, 100), color='red')
        image_file = BytesIO()
        image.save(image_file, format='GIF')
        image_file.name = 'test_avatar.gif'
        image_file.seek(0)

        avatar = SimpleUploadedFile(image_file.name, image_file.read(), content_type="image/gif")

        # Dados válidos para criação de usuário, com foto
        valid_data = {
            "first_name": "Novo",
            "last_name": "Usuário",
            "username": "novouser",
            "password": "SenhaCorreta321",
            "email": "novouser@email.com",
            "gender": "Masculino",
            'birth_date': '2000-01-01',
            "avatar": avatar
        }

        response = self.client.post(api_url, data=valid_data, format='multipart')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn(response.json().get('avatar')[0], 'A extensão de arquivo “gif” não é permitida. As extensões válidas são: jpg, jpeg, png .')

    def test_patch_user_update(self):
        url = reverse('user:user_update')

        payload = {
            "username": "newuser",
            "gender": 'Outro'
        }

        response = self.client.patch(url, payload)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json().get('detail'), 'Dados atualizados com sucesso.')

    def test_patch_user_update_fail_for_duplicate(self):
        url = reverse('user:user_update')
        payload = {
            "username": "username2",
            "gender": 'Outro'
        }

        response = self.client.patch(url, payload)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.json().get("username")[0], 'Um usuário com este nome de usuário já existe.')

    def test_patch_user_update_fail_for_unauthorized(self):
        url = reverse('user:user_update')

        self.client.logout()

        payload = {
            "username": "newuser",
            "gender": 'Outro'
        }

        response = self.client.patch(url, payload)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(response.json().get('detail'), 'As credenciais de autenticação não foram fornecidas.')