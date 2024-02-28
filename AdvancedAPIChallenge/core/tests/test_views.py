from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase
from core.models import People, Post
from core.serializers import PeopleSerializer
from core.serializers import PostSerializer

class PeopleViewSetTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='hulk', password='12345')

        self.token = Token.objects.create(user=self.user)

        self.people_data = {'username': 'hulk'}
        self.people = People.objects.create(**self.people_data)

        self.client.credentials(HTTP_AUTHORIZATION=f'Token {self.token.key}')

    def test_list_people(self):
        url = '/api/people/' 
        response = self.client.get(url)
        expected_data = PeopleSerializer(instance=People.objects.all(), many=True).data


    def test_retrieve_people(self):
        url = f'/api/people/{self.people.id}/'
        response = self.client.get(url)
        expected_data = PeopleSerializer(instance=self.people).data


class PostViewSetTest(APITestCase):
    def setUp(self):
        self.user = People.objects.create (username='hulk', password='12345')

        self.token = Token.objects.create(user=self.user)

        self.post_data_1 = {'title': 'Post 1', 'content': 'Content 1', 'author': self.user}
        self.post_data_2 = {'title': 'Post 2', 'content': 'Content 2', 'author': self.user}
        self.post_1 = Post.objects.create(**self.post_data_1)
        self.post_2 = Post.objects.create(**self.post_data_2)

        self.client.credentials(HTTP_AUTHORIZATION=f'Token {self.token.key}')

    # def test_list_posts(self):
    #     url = '/api/posts/'
    #     response = self.client.get(url)
    #     self.assertEqual(response.status_code)
    #     expected_data = PostSerializer(instance=Post.objects.all(), many=True).data
