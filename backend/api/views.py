from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, viewsets
from rest_framework.viewsets import ReadOnlyModelViewSet

from api.filters import GroupSearchFilter, SubjectFilter
from api.pagination import LimitPageNumberPagination
from api.serializers import (GroupsSerializer, SubjectSerializer,
                             GroupsTelegramSerializer)
from price.models import Groups, Subject
from priceTelegram.models import GroupsTelegram


class GroupViewSet(viewsets.ModelViewSet):
    queryset = Groups.objects.all()
    serializer_class = GroupsSerializer
    pagination_class = LimitPageNumberPagination

    filter_backends = (DjangoFilterBackend, filters.SearchFilter,
                       filters.OrderingFilter)
    filter_class = (SubjectFilter, GroupSearchFilter)
    search_fields = ('subject__slug', 'name', 'link', 'link_screen',)
    filterset_fields = ('subject__slug',)
    ordering_fields = ('price', 'cpm')


class GroupsTelegramViewSet(viewsets.ModelViewSet):
    queryset = GroupsTelegram.objects.all()
    serializer_class = GroupsTelegramSerializer
    pagination_class = LimitPageNumberPagination

    filter_backends = (DjangoFilterBackend, filters.SearchFilter,
                       filters.OrderingFilter)
    filter_class = (GroupSearchFilter)
    search_fields = ('subject__slug', 'name', 'link',)
    filterset_fields = ('subject__slug',)
    ordering_fields = ('price', 'cpm')


class SubjectViewSet(ReadOnlyModelViewSet):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer
