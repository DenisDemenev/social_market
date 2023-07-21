import os

from django.http import HttpResponse

import vk

from social_django.models import UserSocialAuth
from price.models import Cart

token = os.environ.get('VK_TOKEN_GROUPS')


def order_shopping_cart(user):
    api = vk.API(access_token=token, v='5.131')
    groups = Cart.objects.filter(user=user).values(
        'group_vk__name', 'group_vk__link', 'group_vk__price')
    count_price = 0
    for i in range(len(groups)):
        count_price += groups[i]['group_vk__price']
    group_message = []
    for idx, grp in enumerate(groups, start=1):
        group_message.append((
            f"""
            {idx}. {grp["group_vk__name"]} - {grp["group_vk__price"]} руб
            {grp["group_vk__link"]}
            """
        ))
    user_vk_uid = ''
    if UserSocialAuth.objects.filter(user=user):
        user_vk_uid = UserSocialAuth.objects.filter(
            user=user).values('uid')[0]['uid']

    message = f"""
        Пользователь: {user.first_name} {user.last_name}.
        Ссылка: https://vk.com/id{user_vk_uid}
        Заказал:
        {' '.join(group_message)}
        Сумма: {count_price} руб.
        """
    if len(message) <= 4096:
        api.messages.send(user_ids=(773837067, 266109525),
                          random_id=0, message=message)
    return HttpResponse("Заказ оформлен")
