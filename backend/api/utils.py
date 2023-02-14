import os

from django.http import HttpResponse

import vk

from social_django.models import UserSocialAuth
from basket.models import Cart

token = os.environ.get('VK_TOKEN_GROUPS')


def order_shopping_cart(user):
    api = vk.API(access_token=token, v='5.131')
    groups = Cart.objects.filter(user=user).values(
        'group_vk__name', 'group_vk__link', 'group_vk__price')
    sum = 0
    for i in range(len(groups)):
        sum += groups[i]['group_vk__price']
    group_message = []
    for idx, grp in enumerate(groups, start=1):
        group_message.append((
            f"""
            {idx}. {grp["group_vk__name"]} - {grp["group_vk__price"]} руб
            {grp["group_vk__link"]}
            """
        ))
    user_social_uid = ''
    if UserSocialAuth.objects.filter(user=user):
        user_social_uid = UserSocialAuth.objects.filter(
            user=user).values('uid')[0]['uid']

    message = f"""
        Пользователь: {user.first_name} {user.last_name}.
        Ссылка: https://vk.com/id{user_social_uid}
        Заказал:
        {' '.join(group_message)}
        Сумма: {sum} руб.
        """
    api.messages.send(user_id=773837067,
                      random_id=0, message=message)
    return HttpResponse("Заказ оформлен")
