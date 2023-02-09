from django.urls import include, path
from rest_framework.routers import DefaultRouter

from api.views import (GroupViewSet, SubjectViewSet,
                       GroupsTelegramViewSet, GroupsInstagramViewSet,
                       FavoriteViewSet)

app_name = 'api'

router = DefaultRouter()
router.register(r'groups', GroupViewSet, basename='groups')
router.register('groups-telegram', GroupsTelegramViewSet,
                basename='groups_telegram')
router.register('groups-instagram', GroupsInstagramViewSet,
                basename='groups_instagram')
router.register(r'subject', SubjectViewSet, basename='subject')
router.register(r'favorite', FavoriteViewSet, basename='favorite')


urlpatterns = [
    path('', include(router.urls)),
    path('', include('djoser.urls')),
    path('auth/', include('djoser.urls.authtoken')),
]
