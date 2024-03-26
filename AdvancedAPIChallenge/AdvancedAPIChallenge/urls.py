from django.contrib import admin
from django.urls import path, include
from core import views
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
   openapi.Info(
      title="my APiss",
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
    path('core/v1/', include('core.urls')),
    path('core/v2/', include('core.urls')),
    path('edit/', views.edit, name='edit'),
    path('update/<str:id>/', views.update, name='update'),
    path('delete/<str:id>/', views.delete, name='delete'),
    path('auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('home/', views.homePage, name="home"),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('openapi/', schema_view.as_view(), name='openapi-schema'),
]
