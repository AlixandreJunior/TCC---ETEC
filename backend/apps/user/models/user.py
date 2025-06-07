from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.core.validators import FileExtensionValidator, MinValueValidator,MaxValueValidator
from django.dispatch import receiver
from apps.user.models.goals import Goal

import os

class UsersManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("O e-mail é obrigatório!")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)
        return self.create_user(email, password, **extra_fields)

class User(AbstractUser):
    class Meta:
        app_label = 'user'
        verbose_name = "User"
        verbose_name_plural = "Users"

    avatar = models.ImageField(upload_to="avatar", validators=[FileExtensionValidator(allowed_extensions=['jpg', 'jpeg', 'png'])], null=True, blank=True)
    birth_date = models.DateField(null = True, blank=True)
    gender = models.CharField(max_length=10,choices=[("Masculino" , 'Masculino'), ('Feminino', 'Feminino'), ("Outro", "Outro")])
    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=False)
    notifications = models.BooleanField(default=True)

    objects = UsersManager()
    groups = None
    user_permissions = None

    def __str__(self):
        return self.username
    

@receiver(models.signals.post_delete, sender=User)
def delet_avatar_after_exclude(sender, instance, **kwargs):
    if instance.avatar:
        if os.path.isfile(instance.avatar.path):
            os.remove(instance.avatar.path)

@receiver(models.signals.pre_save, sender=User)
def delete_old_image(sender, instance, **kwargs):
    if not instance.pk: 
        return

    try:
        old_instance = sender.objects.get(pk=instance.pk) 
    except sender.DoesNotExist:
        return

    if old_instance.avatar and old_instance.avatar != instance.avatar:  
        if os.path.isfile(old_instance.avatar.path):  
            os.remove(old_instance.avatar.path)

@receiver(models.signals.post_save, sender = User)
def create_object_goal_for_user(sender, instance, created,**kwargs):
    if created:
        Goal.objects.get_or_create(user = instance)