from rest_framework import serializers
from core.models import People, Post

#creating Models Serializers
class PeopleSerializer(serializers.ModelSerializer):
    class Meta:
        model=People
        fields=['username', 'email', 'password']  
    
class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model=Post
        fields=['content', 'author', 'timestamp']
