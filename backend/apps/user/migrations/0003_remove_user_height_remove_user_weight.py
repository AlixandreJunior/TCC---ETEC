# Generated by Django 5.1.7 on 2025-04-11 01:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0002_alter_user_birth_date'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='height',
        ),
        migrations.RemoveField(
            model_name='user',
            name='weight',
        ),
    ]
