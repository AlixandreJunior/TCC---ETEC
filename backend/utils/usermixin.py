from apps.user import models

class UserMixin:
    def make_user_auth(
        self,
        first_name='user',
        last_name='name',
        username='username',
        password='SenhaMuitoSegura123',
        email='username@email.com',
    ): 
        
        user = models.User.objects.create(
            username = username,
            first_name = first_name,
            last_name = last_name,
            email = email,
            password = password,
            is_active = True
        )

        user.set_password(password)
        user.save()

        self.client.force_authenticate(user)

        return user
    
    def make_user_not_auth(
        self,
        first_name='user2',
        last_name='name2',
        username='username2',
        password='SenhaMuitoSegura321',
        email='username2@email.com',
    ): 
        
        user = models.User.objects.create(
            username = username,
            first_name = first_name,
            last_name = last_name,
            email = email,
            password = password,
            is_active = True
        )

        user.set_password(password)
        user.save()

        return user
    
    def make_user_not_active(
        self,
        first_name='user3',
        last_name='name3',
        username='username3',
        password='SenhaMuitoSegura213',
        email='username3@email.com',
    ): 
        
        user = models.User.objects.create(
            username = username,
            first_name = first_name,
            last_name = last_name,
            email = email,
            password = password,
            is_active = False
        )

        user.set_password(password)
        user.save()
        
        return user