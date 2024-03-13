# Django and React

- This project involves building an advanced API with Django that has authentication, pagination, filtering, and Testing. 

- There are two models named “User” and “Post”. The Model “User” is changed to Model “People” due to some problem. 

-  The Model “People” contains fields like username, email, and password. 
- The users have to give their username and email with a password too and the users data will be stored. 
- The Model “Post” contains fields like post title, content, author (a foreign key to User), and timestamp.
- The users can post their content in the post section and the posted data  will be stored. In the Post List the content posted by the author will be shown with the author name and timestamp the content posted date and time. 

### Explanation
CRUD (Create, Read, Update, Delete) operations are implemented and  authentication is implemented for both models. Pagination, filters, and tests are also added. So the users can be created and read. Users can update their information and users can be deleted. 

The authenticated Users can only create, read, update and delete. Unauthorized Users can not get access to the stored data. 


Project Setup

- Django version: 4.2.7 or above 
- Install framework: pip install django                 djangorestframework
- Start new Django project: django-admin startproject AdvancedAPIChallenge
- Change into project directory: cd AdvancedAPIChallenge
- Create app: python manage.py startapp core
- Add core app and rest_framework to INSTALLED_APPS in settings.py ("rest_framework")
- Run migrations: python manage.py migrate
- Create superuser: python manage.py createsuperuser
- Run development server: python manage.py runserver
# Information about my project
## Creating First Project
- Created Project file AdvancedAPIChallenge
- Created app named core
## Core app Model
- import models: 
import settings: Imports Django's settings file which contains configuration for the project.
- import AbstractBaseUser: This imports the AbstractBaseUser class from Django's authentication system. 
- class People(AbstractBaseUser): Defines a People model which extends AbstractBaseUser. This model represents users in the system. It has 
    - username, 
    - email and 
    - password fields defined.
- class Post(models.Model): Defines a Post model which extends the base Model class. This represents a blog post with 
    - content, 
    - author and 
    - timestamp fields.
- author = models.ForeignKey(People): This creates a foreign key from Post to People models. This allows each post to be associated with a user author.

- def str(self): These methods define a string representation for each model - used in admin sites etc.

- People represents users, Post represents blog posts, linked together via the author foreign key from posts to users.
## Serializer for app core models.
- Serializer allow complex data such as querySets and model instances to be converted to native python dataTypes that can then be easily rendered into JSON, XML, or other content types.

- In this project there are only two serializer which is
     - PeopleSerialzer
     - PostSerializer
## END of Serializers ##
## URL path
Django URLs provide a powerful mechanism for routing incoming requests to the appropriate view functions, enabling you to build complex web applications with clean and maintainable URL structures.
- In this project the URL for app core it uses Django URL dispatcher to map URL paths to view.
- imported necessary views, serializers, and routers from teh core.app and DRF (Django REST Framework)
- Their is created a default router And registers the "PeopleViewSet" and "PostViewSet" to generate API endpoints.
- Their is also included the router url which generate api endpoint for registered view-sets.

## End of URL path ## 
## Forms.py
- In forms the module contains from classes for the People model and user creation.
- the classes section has two form classes i.e. PeopleForm and CreateUserForm
## View.py 
- In short explanation, views.py is a key and main file in django project that contains the logic for the project that handles web requests and returning responses. 
- In points:
    - Views are defined as functions or classes in views.py
    - They receive a request object and return a response.
    - Views can interact with models to retrieve or     modify data from the database.
    - They can process data, perform logic, and prepare the response.
    - Views often render HTML templates to generate the response.
    - They are associated with specific URLs through the URL configuration

Views act as the intermediary between the models and the templates, handling the logic and flow of data in a Django web application. They determine what content is sent back to the user based on the requested URL and the corresponding logic defined in the view.

# Project App 'core' views.py

## 1. class PeopleViewSet
- This viewsets automatically provides 'list','create','retrieve','update', 'destroy' actions for the people model.
   Attributes:
        - queryset : The queryset of people objects to be used by the viewset.
        - serializer : Serializer class to be used for serializing and describing People objects.
        - authentication : The authentication classes to be used for authenticating requests to the viewset. 
        - permission class : The permission classes to be used for determining access permissions to the viewset.

## 2. Class PostViewSet
- This code defines a view set for the Post model that provides CRUD operations. it uses PostSerializer to serialize and deserialize the model data and it includes a custom get_query set method that allows filtering the query set based on the author query parameters.
## 3. The def Index
- this index function is a view function that handles request sto a specific url. 

- pop = People.objects.all() = this code retrieves all the objects from the People model using the 'all()' method and assign them to the variable 'pop'.

- context = {'pop': pop}= This line creates a dictionary called context with a key-value pair. The key is 'pop', and the value is the pop variable containing all the People objects.

- return render(request, 'core.html', context) = This line renders the core.html template using the render function. It takes three arguments:

## 4. In def add Function in core.views
- The add function handles the submission of a form to add a new People object to the database. if the request method is POST, it retrieves the form data, creates a new People object, saves it to the database, and redirects the user to the url 'home' and if the request method is GET it renders the core.html template

#### The 'home' and 'core.html' is in templates/ALlPage
## 5. Class AddUser class API
- this AddUSer class API view handles adding a new user to the database. 
- this AddUser API view handles  POST requests to add a new user to the database. It retrieves the required fields from the request, creates a new People object, saves it to the database, and returns a success response if all fields are provided. If any required field is missing, it returns an error response.
### 6. Def edit
- this function help to edit the People listed
### 7. Def Update fun
- This Update function is view function which handles the updating functionality of people listed in database with the help of provided id. 
# 1. API for Adding User
- This view handles a POST request to add a new user to the database. It expects the username, email, and password fields to be provided in the request data. If any of these fields are missing, an error response is returned. Otherwise, a new People instance is created with the provided data, saved to the database, and a success response is returned.
### code
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
@permission_classes([]): This decorator is used to specify the permission classes for the view.
- username = request.POST.get('username'): Retrieves the value of the username field from the POST request data.
- email = request.POST.get('email'): Retrieves the value of the email field from the POST request data.
- password = request.POST.get('password'): Retrieves the value of the password field from the POST request data.
pop = People(username=username, email=email, password=password): Creates a new instance of the People model with the retrieved username, email, and password values.
pop.save(): Saves the newly created People instance to the database.
## The testing for Add user
<img width="1060" alt="Screenshot 2024-03-03 at 10 04 14 PM" src="https://github.com/JenisH505/djangoapi/assets/123802098/d52d2214-f7aa-4945-8804-5ae189123558">
## 2. API for Updating User
-  This view handles a PUT request to update a People object in the database. It expects the email field to be provided in the request data to identify the person to update.

### code
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
    
-  @permission_classes([]): This decorator is used to specify the permission classes for the view.
-  in the put method the
    - email = request.data.get('email'): Retrieves the value of the email field from the request data.
- People.objects.get(email=email).
    If a People object with the specified email is found, it is assigned to the person variable.
- if a People object is found, the code proceeds to the next step.
- serializer = PeopleSerializer(person, data=request.data, partial=True): Creates an instance of the PeopleSerializer serializer, passing the person object and the updated data from the request.

## - The testing for Updating user
<img width="1060" alt="Screenshot 2024-03-03 at 10 19 06 PM" src="https://github.com/JenisH505/djangoapi/assets/123802098/b037f6ce-2871-449a-ac16-67bb055aa5b3">
- This image shows that the given user with that email is not found cause with that email no user is stored.

## - Update testing image 2
<img width="1060" alt="Screenshot 2024-03-03 at 10 21 08 PM" src="https://github.com/JenisH505/djangoapi/assets/123802098/5379ec4d-34be-40a8-8c63-2ea7fc9e9967">
- The user details with the email stored 

## - Update testing image 3
<img width="1060" alt="Screenshot 2024-03-03 at 10 23 08 PM" src="https://github.com/JenisH505/djangoapi/assets/123802098/fc6394f6-3d30-42a7-9ac1-2f5ea34428a3">
- In this image the username is update 

## 3. API for Signup 
- This view handles a POST request to create a new user account. It expects the user data to be provided in the request data, which is then passed to the CreateUserForm form for validation and saving.
- code
class SignUpAPIView(APIView):
    authentication_classes = []
    permission_classes = []
    def post(self, request):
        form = CreateUserForm(request.data)

        if form.is_valid():
            form.save()
            return Response({'message': 'Account created successfully. Thank you for signing up!'})
        return Response(form.errors)

- class SignUpAPIView(APIView):: This line defines the SignUpAPIView class, which inherits from APIView. It indicates that this view will     handle API requests.
    - authentication_classes = []: This line sets the authentication_classes attribute of the view to an empty list []. It specifies that         no authentication classes are required for this view, meaning that authentication is not enforced.
    - permission_classes = []: This line sets the permission_classes attribute of the view to an empty list []. It specifies that no              permission classes are required for this view, meaning that no specific permissions are enforced.

 # - The testing for Signup API
 <img width="1060" alt="Screenshot 2024-03-03 at 10 36 59 PM" src="https://github.com/JenisH505/djangoapi/assets/123802098/066473df-8620-49ed-b8ca-72abc8a6a90f">
 - In this image the username sandy has been signup.

 # 4. API for Login 
 - This view handles user authentication and login. It expects the username and password to be provided in the request data. If the authentication is successful, the user is logged in, a new session is created, and a success response with the session ID is returned. If the authentication fails, an error response with an appropriate message and status code is returned.

### code
@permission_classes([])
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

- @permission_classes([]): This decorator is used to specify the permission classes for the view.
- if request.method == 'POST':: Checks if the request method is POST. This ensures that the login logic is only executed for POST requests.
    - username = request.data.get('username'): Retrieves the value of the username field from the request data.
    - password = request.data.get('password'): Retrieves the value of the password field from the request data.
- if not (username):: Checks if the username is missing or empty.
- user = authenticate(request, username=username, password=password): Authenticates the user using the provided username and password.
    - if user is not None
    - auth_login(request, user)
    - request.session.create() - Creates a new session for the user
    - return Response({'message': 'Login successful', 'session_id': request.session.session_key})

## - The Testing for Login API
<img width="1060" alt="Screenshot 2024-03-03 at 10 44 16 PM" src="https://github.com/JenisH505/djangoapi/assets/123802098/25f5c859-9811-41c5-af52-06312b7b2d57">
- IN this image the recently signup user sandy is logged in with his session id.

## 4. API for Logout
- This view handles user logout. When a POST request is made to this view, it logs out the currently authenticated user using auth_logout, flushes the user's session data using request.
###code
@api_view(['POST'])
@csrf_exempt
@permission_classes([])
def logout(request):
    auth_logout(request)
    request.session.flush()
    return Response({'message': 'Logout successful'})

- @api_view(['POST']): This decorator is used to specify that the logout function is a Django REST framework view and that it accepts POST requests.
- @csrf_exempt: This decorator is used to exempt the logout view from CSRF (Cross-Site Request Forgery) protection.
- @permission_classes([]): This decorator is used to specify the permission classes for the view.
- def logout(request)
    - auth_logout(request): Logs out the currently authenticated user
    - request.session.flush(): Deletes all data associated with the user's session.
    - return Response({'message': 'Logout successful'})

## - The Testing for Logout API
<img width="1060" alt="Screenshot 2024-03-03 at 11 01 32 PM" src="https://github.com/JenisH505/djangoapi/assets/123802098/2a869cde-4a63-45b9-8da2-0ebc8459a7c0">
- In this image the signup and login user is now logout

## 4. API for Token Generation
- This custom authentication token view extends the default behavior of ObtainAuthToken by including additional user information (username and email) in the response along with the token.
code

### code
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

- The CustomAuthToken class overrides the post method of the ObtainAuthToken view.
- Inside the post method, it creates an instance of the serializer class specified by self.serializer_class. The serializer is used to        validate and deserialize the incoming request data. The request.data is passed as the data argument to the serializer, and the request      object is passed as the context to provide additional context to the serializer.
    - The is_valid method is called on the serializer instance to validate the incoming data. If the data is invalid, it will raise an            exception using raise_exception=True.
    - If the data is valid, the validated_data attribute of the serializer is accessed to retrieve the authenticated user object.
    - The code then uses the get_or_create method of the Token model to retrieve or create a token for the authenticated user. If a token         already exists for the user, it will be retrieved; otherwise, a new token will be created.
    - a response is returned using the Response class from DRF. The response contains a dictionary with the following key-value pairs:
        'token': The key of the user's authentication token.
        'username': The username of the authenticated user.
        'email': The email of the authenticated user.
- By using this CustomAuthToken view, when a client makes a POST request to the corresponding endpoint with valid credentials, they will receive a response containing the authentication token and the associated user's username and email.

## - The testing for Token
<img width="1060" alt="Screenshot 2024-03-04 at 7 54 07 AM" src="https://github.com/JenisH505/djangoapi/assets/123802098/c99614b2-5304-4b38-af21-cce60150e9d6">
- In this image the user token is provide.

## Frontend React
- Created a new project name my-app
- This will launch React application in the browser at http://localhost:3000.

## In React Project App.js
### In React my-app src/pages
- In this Component pages all the web page is handled.

# 1. Signup.jsx (src/pages/signup.jsx)
# const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password1: '',
    password2: ''
  });
- const Signup = () => { ... }: This is the definition of the functional component using an arrow function. The empty parentheses ()          indicate that the component doesn't receive any props.
- const [formData, setFormData] = useState({ ... }): This line uses the useState hook to declare a state variable named formData and a        function setFormData to update it.
    - formData is initialized as an object with four properties: username, email, password1, and password2.
    - setFormData is a function that will be used to update the formData state whenever the user types in the form fields.

-   const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

### code
 const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  };
    - const [successMessage, setSuccessMessage] = useState(''): This line declares a state variable named successMessage and a                    corresponding      function setSuccessMessage to update it.
    - const [errorMessage, setErrorMessage] = useState(''): Similarly, this line declares a state variable named errorMessage and a               corresponding function setErrorMessage to update it.
    - const handleChange = (e) => { ... }: This is the definition of the handleChange function, which is an event handler for form input          changes.

### code 
const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/auth/api/signup/', formData)

      setSuccessMessage('Account created successfully')
      setErrorMessage('')
      window.location.href = '/login'
    } catch (error) {
      console.error('Error:', error)
      if (error.response) {
        console.log('Response data:', error.response.data)
        console.log('Response status:', error.response.status)
        console.log('Response headers:', error.response.headers)
      }
      setErrorMessage(error.message)
      setSuccessMessage('')
    }

- e.preventDefault(): Prevents the default form submission behavior of refreshing the page.
- A try-catch block is used to handle errors:
- Inside try:
    - An async POST request is made using axios to the signup API endpoint, passing the formData state as the request body.
    - If successful, the successMessage state is updated to 'Account created successfully' and errorMessage is cleared.
    - The user is redirected to the /login page using window.location.href.
- Inside catch:
    The error object is logged.
    If error.response exists, the response data, status and headers are logged.
    The errorMessage state is updated to the error message and successMessage is cleared.

# 2. Login.jsx (src/pages/Login.jsx)
- This is Login page. In this login Session_id is generated for the login users. As this is Session login too.
- import React, { useState } from "react": Imports React, which contains React capabilities and APIs, and specifically the useState hook      which allows creating state in functional components.
- import axios from 'axios': Imports the axios library which makes HTTP requests to external APIs/servers.
- import { useNavigate } from 'react-router-dom': Imports the useNavigate hook from react-router-dom, which allows programmatically           navigating to different routes/pages.
- import Cookies from 'js-cookie': Imports the js-cookie package which allows getting/setting browser cookies.

### step 1
const Login = (props) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

- const navigate = useNavigate(); - uses the imported useNavigate hook to get access to the navigate function for navigating between routes.
- const [formData, setFormData] = useState({username: '', password: ''}) - uses React's useState hook to initialize a state variable called   formData to an object with empty username and password strings. Also returns the setFormData function for updating the state.

### step 2
const [errorMessage, setErrorMessage] = useState('')
- Initializes a state variable errorMessage to track any login errors
- Returns setErrorMessage function to update this state

### step 3
const handleChange = (e) => {
  const { name, value } = e.target  
  setFormData({ ...formData, [name]: value })

- Called when input values change
- Updates the formData state with the new input value

### step 4
const axiosInstance = axios.create({
  withCredentials: true,
});
- Creates Axios instance to make requests that can access cookies.

### step 5
const csrftoken = Cookies.get('csrftoken');
- get csrf token from cookies to include with request.

# User IP Address and associated Location
- In the Login view function which handles POST request for user authentication.
- Added the code to retrieve user current IP address and Location.

### code
1. ip = request.META.get('REMOTE_ADDR')
- This line retrieves the IP address of the client making the request. In Django, the request.META dictionary contains all the HTTP headers and other metadata related to the current request.
2. if ip.startswith(('127.', '192.168.', '10.', '172.16.'))
- This condition checks if the IP address obtained from request.META.get('REMOTE_ADDR').
3. try:
    response = requests.get('https://api64.ipify.org?format=json')
    if response.status_code == 200:
        ip_data = response.json()
        ip = ip_data.get('ip')
    else:
        return Response({'error': 'Failed to retrieve public IP address'}, status=response.status_code)
except Exception as e:
    return Response({'error': 'Error retrieving public IP address'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
- In this part of the code, the application tries to retrieve the public IP address of the client by making a GET request to https://api64.ipify.org?format=json. This is a third-party service that provides the public IP address of the client.

### Short description 
- This added code it to retrieve the public IP address of the client if the initially obtained IP address seems to be a private IP address (likely due to the client being behind a NAT or proxy).  
