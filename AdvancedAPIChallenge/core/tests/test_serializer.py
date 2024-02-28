from core.models import People
from django.test import TestCase
from core.serializers import PeopleSerializer, PostSerializer

class PeopleSerializerTestCase(TestCase):
    def setUp(self) -> None:
        self.data =  {
            "username":"hulk",
            "email":"hulk@gmail.com",
            "password":"hulk1234",
        }
    def test_people_serializer_valid_info(self):
        serializer = PeopleSerializer(data=self.data)
        self.assertTrue(serializer.is_valid())
        self.assertEqual(serializer.errors, {})

class PostSerializerTestCase(TestCase):
    def test_post_serializer_valid_info(self):
        data = {
            "content":"i am hulk",
            "author":"Hulk",
            "Timestamp":"2021/2/34",
        }
        serializer = PostSerializer(data=data)
        self.assertFalse(serializer.is_valid())