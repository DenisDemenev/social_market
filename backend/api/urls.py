from django.urls import include, path
from rest_framework.routers import DefaultRouter

from api.views import GroupViewSet, SubjectViewSet

app_name = 'api'

router = DefaultRouter()
router.register('groups', GroupViewSet, basename='groups')
router.register(r'subject', SubjectViewSet, basename='subject')


urlpatterns = [
    path('', include(router.urls)),
]