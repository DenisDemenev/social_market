from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, viewsets, status
from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework.decorators import action
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from api.filters import CategoryFilterVk
from api.pagination import LimitPageNumberPagination
from api.serializers import (GroupsVkSerializer, CategorySerializer,
                             CropGroupsSerializer)
from api.utils import order_shopping_cart
from price.models import (GroupsVk, Category,
                          Favorite, Cart)


class GroupVkViewSet(viewsets.ModelViewSet):
    queryset = GroupsVk.objects.all()
    serializer_class = GroupsVkSerializer
    pagination_class = LimitPageNumberPagination
    filter_backends = (DjangoFilterBackend, filters.OrderingFilter,
                       filters.SearchFilter)
    filterset_class = CategoryFilterVk
    search_fields = ('category__slug', 'name', 'link', 'link_screen',)
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

    @action(detail=False, methods=['get'],
            permission_classes=[IsAuthenticated])
    def order_shopping_cart(self, request):
        user = request.user
        return order_shopping_cart(user)

    def add_obj(self, model, user, pk):
        if model.objects.filter(user=user, group_vk__id=pk).exists():
            return Response({
                'errors': 'Группа уже добавлена в список'
            }, status=status.HTTP_400_BAD_REQUEST)
        group_vk = get_object_or_404(GroupsVk, id=pk)
        model.objects.create(user=user, group_vk=group_vk)
        serializer = CropGroupsSerializer(group_vk)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def delete_obj(self, model, user, pk):
        obj = model.objects.filter(user=user, group_vk__id=pk)
        if obj.exists():
            obj.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response({
            'errors': 'Группа уже удалена'
        }, status=status.HTTP_400_BAD_REQUEST)


class CategoryViewSet(ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
