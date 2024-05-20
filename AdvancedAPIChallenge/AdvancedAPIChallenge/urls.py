from django.contrib import admin
from django.urls import path, include
from core import views
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from core.views import SignUpAPIView

schema_view = get_schema_view(
    openapi.Info(
        title="My API",
        default_version='v1',
        description="Task",
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('', views.index, name='home'),
    path('admin/', admin.site.urls),
    path('auth/', include('django.contrib.auth.urls')),
    path('core/', include('core.urls')),
    path('auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('home/', views.homePage, name="home"),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('openapi/', schema_view.as_view(), name='openapi-schema'),
    # Add the following line to include the SignUpAPIView
    path('api/signup/', views.SignUpAPIView.as_view(), name='signup'),
    path('api/login/', views.LoginAPIView.as_view(), name='login'),
    path('api/add-user/', views.AddUserAPIView.as_view(), name='add-user'),
    path('api/core/posts/', views.CreatePost.as_view(), name='create_post'),
    path('api/profile/', views.UserProfileView.as_view(), name='profile'),
]
