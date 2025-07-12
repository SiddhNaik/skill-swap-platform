from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from swap import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('django.contrib.auth.urls')),
    path('register/', views.register, name='register'),
    path('create_swap/', views.create_swap_request, name='create_swap'),
    path('my_requests/', views.my_requests, name='my_requests'),
    path('edit_profile/', views.edit_profile, name='edit_profile'),
    path('add_resource/', views.add_resource, name='add_resource'),
    path('', views.home, name='home'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
