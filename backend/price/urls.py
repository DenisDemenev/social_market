from django.urls import path

from .views import index

app_name = 'price'

urlpatterns = [
    path('', index, name='index'),
    path('<int:subject_id>/', index, name='subject'),
]