from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractBaseUser
#creating core models
    
class People(AbstractBaseUser):
    username=models.CharField( max_length=30)
    email=models.EmailField(unique=True)
    password=models.TextField()

    def __str__(self):
        return self.username

class Post(models.Model):
    content = models.TextField()
    author = models.ForeignKey(People, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
     
    def __str__(self):
        return self.content

