from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, viewsets, status
from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework.decorators import action
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from api.filters import GroupSearchFilter, SubjectFilterVk, SubjectFilterOther
from api.pagination import LimitPageNumberPagination
from api.serializers import (GroupsSerializer, SubjectSerializer,
                             GroupsTelegramSerializer,
                             GroupsInstagramSerializer,
                             CropGroupsSerializer)
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
    filterset_fields = ('subject__slug', 'label',)
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

    def add_obj(self, model, user, pk):
        if model.objects.filter(user=user, group_vk__id=pk).exists():
            return Response({
                'errors': 'Группа уже добавлена в список'
            }, status=status.HTTP_400_BAD_REQUEST)
        group_vk = get_object_or_404(Groups, id=pk)
        model.objects.create(user=user, group_vk=group_vk)
        serializer = CropGroupsSerializer(group_vk)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def delete_obj(self, model, user, pk):
        obj = model.objects.filter(user=user, group_vk__id=pk)
        if obj.exists():
            obj.delete()
            return Response('Группа удалена', status=status.HTTP_204_NO_CONTENT)
        return Response({
            'errors': 'Группа уже удалена'
        }, status=status.HTTP_400_BAD_REQUEST)


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
