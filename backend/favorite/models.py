from django.contrib.auth import get_user_model
from django.db import models
from price.models import Groups


User = get_user_model()


class Favorite(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE,
                             related_name='favorites',
                             verbose_name='Пользователь',)
    group_vk = models.ForeignKey(Groups, on_delete=models.CASCADE,
                                 related_name='favorites',
                                 verbose_name='Группа ВК',)

    class Meta:
        ordering = ['-id']
        verbose_name = 'Избранное'
        verbose_name_plural = 'Избранные'
        constraints = [
            models.UniqueConstraint(fields=['user', 'group_vk'],
                                    name='unique_favorite')
        ]
