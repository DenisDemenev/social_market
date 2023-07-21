from rest_framework.pagination import PageNumberPagination


class LimitPageNumberPagination(PageNumberPagination):
    page_size = 50
    page_size_query_param = 'limit'


class LimitBasketPagination(PageNumberPagination):
    page_size = 200
    page_size_query_param = 'limit'
