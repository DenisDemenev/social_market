import os

from django.http import HttpResponse
from django.db.models import Sum

import vk

from basket.models import Cart

token = os.environ.get('VK_TOKEN_GROUPS')


def order_shopping_cart(user):
    api = vk.API(access_token=token, v='5.131')
    groups = Cart.objects.filter(user=user)
    price = Cart.objects.filter(user=user).annotate(Sum('group_vk.price'))
    message = f"""
               Пользователь: {user}.
               Заказал:
               {groups}
               Итого: {price}
               """
    api.messages.send(user_id=773837067,
                      random_id=0, message=message)
    return HttpResponse("Заказ оформлен")
