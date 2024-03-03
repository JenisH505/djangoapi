
from django.contrib import admin
from django.urls import path, include
from core import views
# from core.views import CustomAuthToken
urlpatterns = [
    path('',views.index, name='home'),
    path("admin/", admin.site.urls), #Maps the 'admin/' URL to the default Django admin site.
    path('auth/', include('django.contrib.auth.urls')), #Includes the URL from 'django.contrib.auth.urls' for authentication views.
    path('auth/',include('core.urls')), #For url patterns from the core app URL configuration.
    path("core/v1/",include('core.urls')),
    path("core/v2/",include('core.urls')),
    path('edit', views.edit, name='edit'),
    path('update/<str:id>', views.update, name='update'),
    path('delete/<str:id>', views.delete, name='delete'),
    path('auth/', include('rest_framework.urls', #Includes the URL patterns from the 'rest_framework.urls' for Django REST Framework's authentication views, with the namespace 'rest_framework'.
        namespace='rest_framework')),
]