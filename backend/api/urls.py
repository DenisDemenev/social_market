from django.urls import include, path
from rest_framework.routers import DefaultRouter
from api.views import GroupViewSet, SubjectViewSet

app_name = 'api'

router = DefaultRouter()
router.register('groups', GroupViewSet, basename='groups')
router.register(r'subject', SubjectViewSet, basename='subject')
# router.register(r'ingredients', IngredientsViewSet, basename='ingredients')
# router.register(r'recipes', RecipeViewSet, basename='recipes')

urlpatterns = [
    path('', include(router.urls)),
]