# Django and React

- This project involves building an advanced API with Django that has authentication, pagination, filtering, and Testing. 

- There are two models named “User” and “Post”. The Model “User” is changed to Model “People” due to some problem. 

1. The Model “People” contains fields like username, email, and password. 
- The users have to give their username and email with a password too and the users data will be stored. 
2. The Model “Post” contains fields like post title, content, author (a foreign key to User), and timestamp.
- The users can post their content in the post section and the posted data  will be stored. In the Post List the content posted by the author will be shown with the author name and timestamp the content posted date and time. 

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

##Introduction
Django is a python framework that makes it easier to create websites using python. Django takes care of the difficult stuff so that you can concentrate on building your web applications. Django emphasizes reusability of components, also referred to as DRY which is Don’t Repeat Yourself and comes with ready to use features like login system, database connection and CRUD operations. 

Django follows the MVT design pattern (Model View Template).

Model - The data you want to present, usually data from a database.
View  - A request handler that returns the relevant template and content - based on the request from the user.
Template - A text file like an HTML file0 containing the layout of the web page, with logic on how to display the data.
It is a software architectural pattern that separates an application into three interconnected parts - the model, view, and template. Explained below:
Model: 
Responsible for managing data and business logic.
Interacts with the database and handles data validation, relationships, logic etc.

View:

- Handles presentation and rendering logic.
- Receives requests from the user and returns responses.
- Interacts with the model to access data needed to generate responses.

Template:
- Manages the presentation layer of the application.
- HTML files mixed with template language describing how to present data.
- Renders data from the model into web pages to show content to the user.

Workflow:
- A user sends a request via the browser. This request gets handled by the view.
- The view accesses data by interacting with the relevant model. It passes this model data to the template.
- Template renders the data into HTML/CSS pages to generate the response.
- This response gets returned to the user via the view.

In summary, MVT separates the logic into interconnected model, view and template components with clear divisions of responsibility. This enables easier collaboration, testing and scalability for web applications.

Django is an MVT framework. It implements this pattern by using its own ORM models for data, Python functions or classes-based views for logic, and HTML templates with Django template language for the presentation layer.



# Information about my project

# Creating First Project
- Created Project file AdvancedAPIChallenge
- Created app named core

# core app Model

import models: 
import settings: Imports Django's settings file which contains configuration for the project.

import AbstractBaseUser: This imports the AbstractBaseUser class from Django's authentication system. This provides some default user functionality we can build on. By importing AbstractBaseUser, we can gain access to the functionality it provides allowing us to create custom user models and implement user authentication in our project according to our requirements.

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

- People represents users, Post represents blog posts, linked together via the author foreign key from posts to users. The models provide a Python interface to the database where these objects will be stored.

# Serializer for app core models.

- Serializer allow complex data such as querySets and model instances to be converted to native python dataTypes that can then be easily rendered into JSON, XML, or other content types.

- In this project there are only two serializer which is
     - PeopleSerialzer
     - PostSerializer

These serializers cna be used in Django Rest Framework views to automatically handle serialization and deserialization of people and post instances.

## END of Serializers ##

# URL path

In Django, URLs (Uniform Resource Locators) serve as a means to map incoming web requests to specific views or resources within a web application. They define the structure of the URLs used to access different parts of the application and specify which view function should handle each URL pattern.

Django URLs provide a powerful mechanism for routing incoming requests to the appropriate view functions, enabling you to build complex web applications with clean and maintainable URL structures.

- In this project the URL for app core it uses Django URL dispatcher to map URL paths to view.
- imported necessary views, serializers, and routers from teh core.app and DRF (Django REST Framework)
- Their is created a default router And registers the "PeopleViewSet" and "PostViewSet" to generate API endpoints.
- Their is also included the router url which generate api endpoint for registered view-sets.
- their is also a URL include parameters like 'str:id' which are pass to view functions.

## End of URL path ## 

# forms.py
- In forms the module contains from classes for the People model and user creation.
- the classes section has two form classes i.e. PeopleForm and CreateUserForm



# View.py 
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

# 1 class PeopleViewSet
- This viewsets automatically provides 'list','create','retrieve','update', 'destroy' actions for the people model.
   Attributes:
        - queryset : The queryset of people objects to be used by the viewset.
        - serializer : Serializer class to be used for serializing and describing People objects.
        - authentication : The authentication classes to be used for authenticating requests to the viewset. 
        - permission class : The permission classes to be used for determining access permissions to the viewset.

# 2 Class PostViewSet
- This code defines a view set for the Post model that provides CRUD operations. it uses PostSerializer to serialize and deserialize the model data and it includes a custom get_query set method that allows filtering the query set based on the author query parameters. 

- The given view set is used to retrieve a list of posts, create new posts, retrieve individuals posts, update existing posts, and delete posts. the filtering functionality allows clients to retrieve posts based on the author username


# 3 The def Index
- this index function is a view function that handles request sto a specific url. 

- pop = People.objects.all() = this code retrieves all the objects from the People model using the 'all()' method and assign them to the variable 'pop'.

- context = {'pop': pop}= This line creates a dictionary called context with a key-value pair. The key is 'pop', and the value is the pop variable containing all the People objects. This dictionary will be passed to the template for rendering.

- return render(request, 'core.html', context) = This line renders the core.html template using the render function. It takes three arguments:

# 4 In def add Function in core.views
- The add function handles the submission of a form to add a new People object to the database. if the request method is POST, it retrieves the form data, creates a new People object, saves it to the database, and redirects the user to the url 'home' and if the request method is GET it renders the core.html template

# The 'home' and 'core.html' is in templates/ALlPage

# 5 Class AddUser class API

- this AddUSer class API view handles adding a new user to the database. 
- this AddUser API view handles  POST requests to add a new user to the database. It retrieves the required fields from the request, creates a new People object, saves it to the database, and returns a success response if all fields are provided. If any required field is missing, it returns an error response.

# 6 Def edit
- this function help to edit the People listed

# 7 Def Update fun
- This Update function is view function which handles the updating functionality of people listed in database with the help of provided id. 


# API for Adding User
- This view handles a POST request to add a new user to the database. It expects the username, email, and password fields to be provided in the request data. If any of these fields are missing, an error response is returned. Otherwise, a new People instance is created with the provided data, saved to the database, and a success response is returned.

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

# The testing for Add user
<img width="1060" alt="Screenshot 2024-03-03 at 10 04 14 PM" src="https://github.com/JenisH505/djangoapi/assets/123802098/d52d2214-f7aa-4945-8804-5ae189123558">
