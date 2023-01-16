from django.urls import include, path
from rest_framework.routers import DefaultRouter

from api.views import GroupViewSet, SubjectViewSet, GroupsTelegramViewSet

app_name = 'api'

router = DefaultRouter()
router.register('groups', GroupViewSet, basename='groups')
router.register('groups-telegram', GroupsTelegramViewSet,
                basename='groups_telegram')
router.register(r'subject', SubjectViewSet, basename='subject')


urlpatterns = [
    path('', include(router.urls)),
    path('', include('djoser.urls')),
    path('auth/', include('djoser.urls.authtoken')),
]
