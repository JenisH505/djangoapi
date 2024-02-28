
from django.contrib import admin
from django.urls import path, include
from core import views
# from core.views import CustomAuthToken
urlpatterns = [
    path('',views.index, name='home'),
    path("admin/", admin.site.urls),
    path('auth/', include('django.contrib.auth.urls')),
    path('auth/',include('core.urls')),
    path("core/v1/",include('core.urls')),
    path("core/v2/",include('core.urls')),
    path('edit', views.edit, name='edit'),
    path('update/<str:id>', views.update, name='update'),
    path('delete/<str:id>', views.delete, name='delete'),
    path('auth/', include('rest_framework.urls', 
        namespace='rest_framework')),
]