from rest_framework.test import APITestCase
from django.urls import reverse
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

    def test_get_mentalcheckin(self):
        url = re