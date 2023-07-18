from django.urls import include, path
from rest_framework.routers import DefaultRouter
from api.views import GroupVkViewSet, CategoryViewSet

app_name = 'api'

router = DefaultRouter()
router.register(r'groups-vk', GroupVkViewSet, basename='groups_vk')
router.register(r'category', CategoryViewSet, basename='category')

urlpatterns = [
    path('', include(router.urls)),
    path('', include('djoser.urls')),
    path('auth/', include('djoser.urls.authtoken')),
    path('auth/', include('djoser.urls.jwt')),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.social.urls')),
]
