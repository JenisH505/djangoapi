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
from django.contrib.auth import authenticate, login, login as auth_login, logout as auth_logout
from .forms import PeopleForm, CreateUserForm
from django.contrib import messages
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from django.views.generic import ListView, DetailView
from django.views.decorators.csrf import csrf_protect
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
import requests
from drf_yasg.generators import OpenAPISchemaGenerator

class PeopleViewSet(viewsets.ModelViewSet): # Viewset for viewing and editing People instances
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

class CustomSchemaGenerator(OpenAPISchemaGenerator):
    def get_schema(self, request=None, public=False):
        schema = super().get_schema(request, public)
        schema.basePath = f"/{request.version}" if request and request.version else "/"
        return schema

@api_view(['GET'])
def swagger_ui(request):
    return render(request, 'swagger-ui.html')

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
    authentication_classes = []
    permission_classes = []
    def post(self, request):
        form = CreateUserForm(request.data)

        if form.is_valid():
            form.save()
            return Response({'message': 'Account created successfully. Thank you for signing up!'})
        return Response(form.errors)
    
def loginPage(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)

            # Retrieve user IP address
            ip = request.META.get('REMOTE_ADDR')
            if ip.startswith(('127.', '192.168.', '10.', '172.16.')):
                try:
                    # Fetch public IP address using external API
                    response = requests.get('https://api64.ipify.org?format=json')
                    if response.status_code == 200:
                        ip_data = response.json()
                        ip = ip_data.get('ip')
                except requests.exceptions.RequestException as e:
                    # Handle request exception
                    print(f"Error fetching public IP address: {e}")
                    pass 

            # Initialize location data
            location_data = "Location data not available"
            try:
                # Retrieve location data using external API
                response = requests.get(f'https://ipinfo.io/{ip}/json')
                if response.status_code == 200:
                    ip_data = response.json()
                    location_data = f"City: {ip_data.get('city')}, Region: {ip_data.get('region')}, Country: {ip_data.get('country')}"
            except requests.exceptions.RequestException as e:
                # Handle request exception
                print(f"Error retrieving location data: {e}")

            context = {
                'IP_Address': ip,
                'location_data': location_data,
            }
            return render(request, 'core:home', context)
        else:
            messages.info(request, 'Username or password is incorrect')
    context = {}
    return render(request, 'registration/login.html', context)

@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    if request.method == 'POST':
        username = request.data.get('username')
        password = request.data.get('password')
        if not username:
            return Response({'error': 'Username is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        user = authenticate(request, username=username, password=password)
        if user is not None:
            auth_login(request, user)
            request.session.create()
            ip = request.META.get('REMOTE_ADDR')
            
            if ip.startswith(('127.', '192.168.', '10.', '172.16.')):
                # If IP address is in a reserved range, use external service to determine public IP
                try:
                    response = requests.get('https://api64.ipify.org?format=json')
                    if response.status_code == 200:
                        ip_data = response.json()
                        ip = ip_data.get('ip')
                    else:
                        return Response({'error': 'Failed to retrieve public IP address'}, status=response.status_code)
                except Exception as e:
                    return Response({'error': 'Error retrieving public IP address'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
            try:
                response = requests.get(f'https://ipinfo.io/{ip}/json')
                if response.status_code == 200:
                    ip_data = response.json()
                    location_data = f"City: {ip_data.get('city')}, Region: {ip_data.get('region')}, Country: {ip_data.get('country')}"
                else:
                    location_data = "Location data not available"
            except Exception as e:
                location_data = "Error retrieving location data"
            
            return Response({
                'message': 'Login successful',
                'session_id': request.session.session_key,
                'IP_Address': ip,
                'location_data': location_data,
            })
        else:
            return Response({'message': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@csrf_exempt
@permission_classes([])
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

    ip_address = request.META.get('REMOTE_ADDR')
    if ip_address.startswith(('127.', '192.168.', '10.', '172.16.')):
        try:
            response = requests.get('https://api64.ipify.org?format=json')
            if response.status_code == 200:
                ip_add = response.json()
                ip_address = ip_add.get('ip')
            else:
                ip_address = 'Failed to retrieve public IP address'
        except Exception as e:
            ip_address = 'Failed to retrieve public IP address'

        try:
            response = requests.get(f'https://ipinfo.io/{ip_address}/json')
            if response.status_code == 200:
                ip_add = response.json()
                location_data = f"City: {ip_add.get('city')}, Region: {ip_add.get('region')}, Country: {ip_add.get('country')}"
            else:
                location_data = "Location data not available"
        except Exception as e:
            location_data = "Error retrieving location data"
    else:
        ip_address = ip_address
        location_data = "Location data not available for non-private IP addresses"

    context = {
        'user_id': user_id,
        'ip_address': ip_address,
        'location_data': location_data,
    }

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

@permission_classes([])
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
@permission_classes([])
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