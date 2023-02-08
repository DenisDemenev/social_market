from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, viewsets
from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated

from api.filters import GroupSearchFilter, SubjectFilterVk, SubjectFilterOther
from api.pagination import LimitPageNumberPagination
from api.serializers import (GroupsSerializer, SubjectSerializer,
                             GroupsTelegramSerializer,
                             GroupsInstagramSerializer)
from price.models import Groups, Subject
from priceTelegram.models import GroupsTelegram
from priceInstagram.models import GroupsInstagram
from basket.models import Cart
from favorite.models import Favorite


class GroupViewSet(viewsets.ModelViewSet):
    queryset = Groups.objects.all()
    serializer_class = GroupsSerializer
    pagination_class = LimitPageNumberPagination

    filter_backends = (DjangoFilterBackend, filters.SearchFilter,
                       filters.OrderingFilter)
    filter_class = (SubjectFilterVk, GroupSearchFilter)
    search_fields = ('subject__slug', 'name', 'link', 'link_screen',)
    filterset_fields = ('subject__slug', 'label')
    ordering_fields = ('price', 'cpm', )

    @action(detail=True, methods=['post', 'delete'],
            permission_classes=[IsAuthenticated])
    def favorite(self, request, pk=None):
        if request.method == 'POST':
            return self.add_obj(Favorite, request.user, pk)
        elif request.method == 'DELETE':
            return self.delete_obj(Favorite, request.user, pk)
        return None

    @action(detail=True, methods=['post', 'delete'],
            permission_classes=[IsAuthenticated])
    def shopping_cart(self, request, pk=None):
        if request.method == 'POST':
            return self.add_obj(Cart, request.user, pk)
        elif request.method == 'DELETE':
            return self.delete_obj(Cart, request.user, pk)
        return None


class GroupsTelegramViewSet(viewsets.ModelViewSet):
    queryset = GroupsTelegram.objects.all()
    serializer_class = GroupsTelegramSerializer
    pagination_class = LimitPageNumberPagination

    filter_backends = (DjangoFilterBackend, filters.SearchFilter,
                       filters.OrderingFilter)
    filter_class = (SubjectFilterOther, GroupSearchFilter)
    search_fields = ('subject__slug', 'name', 'link',)
    filterset_fields = ('subject__slug',)
    ordering_fields = ('price', 'cpm')


class GroupsInstagramViewSet(viewsets.ModelViewSet):
    queryset = GroupsInstagram.objects.all()
    serializer_class = GroupsInstagramSerializer
    pagination_class = LimitPageNumberPagination

    filter_backends = (DjangoFilterBackend, filters.SearchFilter,
                       filters.OrderingFilter)
    filter_class = (SubjectFilterOther, GroupSearchFilter)
    search_fields = ('subject__slug', 'name', 'link',)
    filterset_fields = ('subject__slug',)
    ordering_fields = ('price_post', 'cpm')


class SubjectViewSet(ReadOnlyModelViewSet):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer
