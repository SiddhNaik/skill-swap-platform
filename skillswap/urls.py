from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from swap import views
from swap.api_views import SkillViewSet, SwapRequestViewSet, UserProfileViewSet

# API Router
router = DefaultRouter()
router.register(r'skills', SkillViewSet)
router.register(r'swap-requests', SwapRequestViewSet)
router.register(r'user-profiles', UserProfileViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('django.contrib.auth.urls')),
    path('api/', include(router.urls)),
    path('register/', views.register, name='register'),
    path('create_swap/', views.create_swap_request, name='create_swap'),
    path('my_requests/', views.my_requests, name='my_requests'),
    path('edit_profile/', views.edit_profile, name='edit_profile'),
    path('add_resource/', views.add_resource, name='add_resource'),
    path('add_skill/', views.add_skill, name='add_skill'),
    path('', views.home, name='home'),
    path('browse_resources/', views.browse_resources, name='browse_resources'),
    path('resource/<int:resource_id>/', views.resource_detail, name='resource_detail'),
    path('resource/<int:resource_id>/rate/', views.rate_resource, name='rate_resource'),
    path('resource/<int:resource_id>/share/', views.share_resource, name='share_resource'),
    path('shared_with_me/', views.shared_with_me, name='shared_with_me'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
