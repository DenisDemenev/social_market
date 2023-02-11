from django.contrib.auth import get_user_model
from django.db import models
from price.models import Groups


User = get_user_model()


class Cart(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='cart',
        verbose_name='Пользователь',
    )
    group_vk = models.ForeignKey(Groups, on_delete=models.CASCADE,
                                 related_name='cart',
                                 verbose_name='Группа ВК',)

    class Meta:
        ordering = ['-id']
        verbose_name = 'Корзина'
        verbose_name_plural = 'В корзине'
        constraints = [
            models.UniqueConstraint(fields=['user', 'group_vk'],
                                    name='unique_cart_user')
        ]

    def __str__(self):
        return (f' ' \
                f'{self.group_vk} {self.group_vk.link} '
                f'{self.group_vk.price}')
