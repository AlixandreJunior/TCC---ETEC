from apps.user import models

class UserMixin:
    def make_user_auth(
        self,
        first_name='user',
        last_name='name',
        username='username',
        password='SenhaMuitoSegura123',
        email='username@email.com',
        gender = "Masculino",
        birth_date = '2000-04-20',
        avatar=None,
    ): 
        
        user = models.User.objects.create(
            username = username,
            first_name = first_name,
            last_name = last_name,
            email = email,
            password = password,
            gender = gender,
            birth_date = birth_date,
            avatar = avatar,
            is_active = True
        )

        self.client.force_authenticate(user)

        return user
    
    def make_user_not_auth(
        self,
        first_name='user2',
        last_name='name2',
        username='username2',
        password='SenhaMuitoSegura321',
        email='username2@email.com',
        gender = "Feminino",
        birth_date = '2001-05-21',
        avatar=None,
    ): 
        
        user = models.User.objects.create(
            username = username,
            first_name = first_name,
            last_name = last_name,
            email = email,
            password = password,
            gender = gender,
            birth_date = birth_date,
            avatar = avatar,
            is_active = True
        )

        return user
    
    def make_user_not_active(
        self,
        first_name='user3',
        last_name='name3',
        username='username3',
        password='SenhaMuitoSegura213',
        email='username3@email.com',
        gender = "Masculino",
        birth_date = '2002-06-22',
        avatar=None,
    ): 
        
        user = models.User.objects.create(
            username = username,
            first_name = first_name,
            last_name = last_name,
            email = email,
            password = password,
            gender = gender,
            birth_date = birth_date,
            avatar = avatar,
            is_active = False
        )

        return user