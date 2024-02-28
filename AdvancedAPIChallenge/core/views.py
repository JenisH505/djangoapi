from rest_framework.response import Response
from django.shortcuts import render, redirect
from rest_framework import viewsets
from core.models import People
from core.models import Post
from core.serializers import PeopleSerializer
from core.serializers import PostSerializer
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate, login, logout, get_user_model,login as auth_login, logout as auth_logout
from django.contrib.sessions.models import Session
from .forms import PeopleForm, CreateUserForm
from django.contrib import messages
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from django.views.generic import ListView, DetailView
from django.views.decorators.csrf import csrf_protect
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.decorators import api_view


class PeopleViewSet(viewsets.ModelViewSet):
    queryset= People.objects.all()
    serializer_class=PeopleSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def get_queryset(self):
        author = self.request.query_params.get('author')
        queryset = super().get_queryset()  
        if author:
            queryset = queryset.filter(author__username__istartswith=author)
        return queryset


@csrf_exempt
def signUpPage(request):
    form = CreateUserForm()
    if request.method == 'POST':
        form = CreateUserForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Account created ')
            return redirect('core:login')
    context = {'form':form}
    return render(request, 'AllPage/signUp.html', context)

class SignUpAPIView(APIView):
    def post(self, request):
        form = CreateUserForm(request.data)

        if form.is_valid():
            form.save()
            messages.success(request, 'Account created')
            # return redirect('core:login')  # Assuming you have a URL named 'core:login'
        
        return Response(form.errors)
    
@csrf_protect
def loginPage(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return render(request,'/Users/jenishmanandhar/djangoapi/AdvancedAPIChallenge/core/templates/AllPage/home.html')
                    # return render(request,'/Users/jenishmanandhar/djangoapi/AdvancedAPIChallenge/core/templates/AllPage/home.html')
        else:
            messages.info(request, 'Username or password is incorrect')
    context = {}
    return render(request, "AllPage/login.html", context)

@api_view(['POST'])
def login(request):
    if request.method == 'POST':
        username = request.data.get('username')
        password = request.data.get('password')

    if not (username):
        return Response({'error': 'Username is required'})

    user = authenticate(request, username=username, password=password)
    if user is not None:
        auth_login(request, user)
        # login(request, user)
        request.session.create()
        return Response({'message': 'Login successful', 'session_id': request.session.session_key})
        # return Response({'message': 'Login successful'})
    else:
        return Response({'message': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def logout(request):
    auth_logout(request)
    request.session.flush()
    return Response({'message': 'Logout successful'})


def get_usernames(request):

    if request.method == 'GET':
        users = User.objects.all()
        usernames = [user.username for user in users]

        context = {'usernames': usernames}
        return render(request, 'AllPage/user.html', context)
    
@api_view(['GET'])
def get_username(request):
    if request.method == 'GET':
        users = User.objects.all()
        usernames = [user.username for user in users]
        return Response({'usernames': usernames})

def homePage(request):
    current_user = request.user
    user_id = current_user.id
    print(user_id)
    context = {'user_id': user_id}
    return render(request, 'AllPage/home.html', context) 


class BlogView(ListView):
    model=Post
    template_name = 'AllPage/blog.html'

class postBlog(DetailView):
    model = Post
    template_name = ''

def index(request):
    pop = People.objects.all()
    context = {
        'pop':pop,
    }
    return render(request, 'core.html', context)

#creating Add method to Add people(Users)

def add(request):
    if request.method == "POST":
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')

        pop = People(
            username = username,
            email = email,
            password = password,
        )
        pop.save()
        return redirect('home')
    return render (request, 'core.html')

class AddUser(APIView):
    def post(self, request):
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')

        pop = People(
            username = username,
            email = email,
            password = password,
        )
        pop.save()
        if not (username and email and password):
            return Response({'error': 'Please provide username, email, and password.'})
        pop = People.objects.all()
        
        # return redirect('home')
        return Response({'message': 'User added successfully.'})
    
#Creating Edit method for editing the Users Information
def edit(request):
    pop = People.objects.all()

    context = {
        'pop' :pop,
    }

    return redirect(request, 'core.html', context)

#Creating Update method for updating Users
def update(request, id):
    if request.method == "POST":
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')

        pop = People(
            id = id,
            username = username,
            email = email,
            password = password,
        )
        pop.save()
        return redirect('home')
    return redirect(request, 'core.html')

class UpdatePeople(APIView):
    def put(self, request):
        email = request.data.get('email')
        
        try: 
            person = People.objects.get(email=email)  
        except People.DoesNotExist:
            return Response({'error': 'Person not found'})
       
        serializer = PeopleSerializer(person, data=request.data, partial=True) 
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
              
        return Response(serializer.errors)

def delete(request, id):
    pop = People.objects.filter(id=id)
    pop.delete()
    context = {
        'pop': pop
    }
    return redirect('home')


def Index(request):
    pop = Post.objects.all()
    context = {
        'pop':pop,
    }
    return render(request, 'post.html', context)

#Creating for Post method
def aDD(request):
    if request.method == "POST":
        content = request.POST.get('content')
        author = request.POST.get('author')

        pop = Post(
            content = content,
            author= author,
            
        )
        pop.save()
        return redirect('home')
    return render (request, 'post.html')


class CustomAuthToken(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'username': user.username,
            'email': user.email
        })