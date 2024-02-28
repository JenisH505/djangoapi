
from django.test import TestCase
from core.models import People

class PeopleTestCase(TestCase):
    def test_people(self):
        pep = {
            "username":"hulk",
            "email":"hulk@gmail.com",
            "password":"hulk1234",
        }
        p = People.objects.create(**pep)
        model = People.objects.get(username="hulk")
        assert model.email == pep["email"]
        assert model.password == pep["password"]
        assert model.username == pep["username"]
        # self.assertTrue(model.is_valid())
        # self.assertEqual(model.errors, {})