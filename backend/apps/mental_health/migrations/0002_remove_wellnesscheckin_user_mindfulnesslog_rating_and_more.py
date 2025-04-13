# Generated by Django 5.1.7 on 2025-04-11 01:17

import django.core.validators
import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mental_health', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.RemoveField(
            model_name='wellnesscheckin',
            name='user',
        ),
        migrations.AddField(
            model_name='mindfulnesslog',
            name='rating',
            field=models.IntegerField(blank=True, null=True, validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(5)]),
        ),
        migrations.CreateModel(
            name='MentalCheckin',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('mood', models.CharField(choices=[('Feliz', 'Feliz'), ('Triste', 'Triste'), ('Ansioso', 'Ansioso'), ('Calmo', 'Calmo'), ('Estressado', 'Estressado')], max_length=50)),
                ('stress_level', models.PositiveIntegerField(validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(10)])),
                ('anxiety_level', models.PositiveIntegerField(validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(10)])),
                ('is_feeling_lonely', models.BooleanField()),
                ('is_low_self_esteem', models.BooleanField()),
                ('is_overwhelmed', models.BooleanField()),
                ('notes', models.TextField(blank=True, null=True)),
                ('score', models.PositiveIntegerField(validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(100)])),
                ('date', models.DateField()),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Wellness Check-In',
                'verbose_name_plural': 'Wellness Check-ins',
            },
        ),
        migrations.CreateModel(
            name='MentalRecommendation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('recommendation', models.TextField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('checkin', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='mental_health.mentalcheckin')),
            ],
            options={
                'verbose_name': 'Mental Recommendation',
                'verbose_name_plural': 'Mental Recommendations',
            },
        ),
        migrations.DeleteModel(
            name='EmotionalJournal',
        ),
        migrations.DeleteModel(
            name='WellnessCheckin',
        ),
    ]
