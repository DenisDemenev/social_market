import os

import vk

# from basket.models import Cart

token = os.environ.get('VK_TOKEN_GROUPS')


def order_shopping_cart(user):
    api = vk.API(access_token=token, v='5.131')
    # groups = Cart.objects.filter(user=user).values(
    #     'groups_vk',
    # ).order_by()
    # users = user.username
    # message = f'{users} {groups}'
    api.messages.send(user_id=773837067,
                      random_id=100, message=user)
