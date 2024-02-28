from django.forms import ModelForm
from .models import People
from django.contrib.auth.forms import UserCreationForm
from django import forms
from django.contrib.auth.models import User

class PeopleForm(ModelForm):
    class Meta:
        model = People
        fields = '__all__'

class CreateUserForm(UserCreationForm):
    class Meta:
        model = User
        fields = ['username','email','password1','password2']