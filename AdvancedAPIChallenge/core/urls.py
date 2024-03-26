from core import views
from django.urls import path, include
from core.views import PeopleViewSet, PostViewSet, BlogView, get_usernames, SignUpAPIView, UpdatePeople, get_username, logout
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'peoples', PeopleViewSet)
router.register(r'posts', PostViewSet)


app_name = "core"
urlpatterns = [
    path('', include(router.urls)), # ReDoc documentation view
    path('add/', views.add, name='add'),
    path('ads/', views.AddUser.as_view(), name='create_user'),
    path('edit/', views.edit, name='edit'),
    path('update/<str:id>/', views.update, name='update'),
    path('people/update/', UpdatePeople.as_view()),
    path('delete/<str:id>/', views.delete, name='delete'),
    path('signUp/', views.signUpPage, name="signUp"),
    path('api/signup/', SignUpAPIView.as_view(), name='signup_api'),
    path('login/', views.loginPage, name="login"),
    path('home/', views.homePage, name="home"),
    path('api/login/', views.login, name='logins'),
    path('api/logout/', logout, name='logout'),
    path('blog/', BlogView.as_view(), name='blog'),
    path('usernames/', get_usernames, name='usernames'),
    path('api/usernames/<str:username>/', get_username, name='usernames'),
]
