from rest_framework.test import APITestCase
from utils.usermixin import UserMixin

class PhysicalHealthTests(APITestCase, UserMixin):
    def setUp(self):
        self.user = self.make_user_auth()