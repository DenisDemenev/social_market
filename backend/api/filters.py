from django_filters.rest_framework import FilterSet, filters

from price.models import GroupsVk


class CategoryFilterVk(FilterSet):
    category = filters.AllValuesMultipleFilter(field_name='category__slug')
    label = filters.BooleanFilter(field_name='label')
    is_favorited = filters.BooleanFilter(method='filter_is_favorited')
    price = filters.RangeFilter(field_name='price')
    is_in_shopping_cart = filters.BooleanFilter(
        method='filter_is_in_shopping_cart')

    def filter_is_favorited(self, queryset, name, value):
        if value and not self.request.user.is_anonymous:
            return queryset.filter(favorites__user=self.request.user)
        return queryset

    def filter_is_in_shopping_cart(self, queryset, name, value):
        if value and not self.request.user.is_anonymous:
            return queryset.filter(cart__user=self.request.user)
        return queryset

    class Meta:
        model = GroupsVk
        fields = ('category', 'label', 'price')
