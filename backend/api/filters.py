from django_filters.rest_framework import FilterSet, filters
from rest_framework.filters import SearchFilter

from price.models import Groups


class GroupSearchFilter(SearchFilter):
    search_param = 'subject__slug', 'name', 'link', 'link_screen',


class SubjectFilterVk(FilterSet):
    subject = filters.AllValuesMultipleFilter(field_name='subject_slug')

    class Meta:
        model = Groups
        fields = ('subject', 'label', 'is_favorited',)


class SubjectFilterOther(FilterSet):
    subject = filters.AllValuesMultipleFilter(field_name='subject_slug')

    class Meta:
        model = Groups
        fields = ('subject',)
