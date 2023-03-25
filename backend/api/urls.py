from django.urls import include, path
from rest_framework.routers import DefaultRouter

from api.views import (GroupVkViewSet, CategoryViewSet,
                       GroupsTelegramViewSet, GroupsInstagramViewSet)

app_name = 'api'

router = DefaultRouter()
router.register(r'groups-vk', GroupVkViewSet, basename='groups_vk')
router.register('groups-telegram', GroupsTelegramViewSet,
                basename='groups_telegram')
router.register('groups-instagram', GroupsInstagramViewSet,
                basename='groups_instagram')
router.register(r'category', CategoryViewSet, basename='category')


urlpatterns = [
    path('', include(router.urls)),
    path('', include('djoser.urls')),
    path('auth/', include('djoser.urls.authtoken')),
    path('auth/', include('djoser.urls.jwt')),
    path('auth/', include('djoser.social.urls')),
]
