import os

from django.http import HttpResponse

import vk

from basket.models import Cart

token = os.environ.get('VK_TOKEN_GROUPS')


def order_shopping_cart(user):
    api = vk.API(access_token=token, v='5.131')
    groups = list(Cart.objects.all())
    api.messages.send(user_id=773837067,
                      random_id=100, message=groups)
    return HttpResponse(content_type='application/json')
