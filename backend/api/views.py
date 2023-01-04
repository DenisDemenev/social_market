from rest_framework import viewsets 
from rest_framework.viewsets import ReadOnlyModelViewSet
from django_filters.rest_framework import DjangoFilterBackend

from api.filters import GroupSearchFilter, SubjectFilter
from price.models import Groups, Subject
from api.serializers import GroupsSerializer, SubjectSerializer
from rest_framework import filters
from api.pagination import LimitPageNumberPagination


# from rest_framework.decorators import action
# from rest_framework.response import Response


class GroupViewSet(viewsets.ModelViewSet):
    queryset = Groups.objects.all()
    serializer_class = GroupsSerializer
    pagination_class = LimitPageNumberPagination

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_class = (SubjectFilter, GroupSearchFilter)
    search_fields = ('subject__slug', 'name', 'link', 'link_screen',)
    filterset_fields = ('subject__slug',)
    ordering_fields = ('price',)


class SubjectViewSet(ReadOnlyModelViewSet):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer
    