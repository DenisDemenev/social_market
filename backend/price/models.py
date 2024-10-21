from django.contrib.auth import get_user_model
from django.db import models

from .utils.name_partner import groups, partner

User = get_user_model()


class Requisites(models.Model):
    name = models.CharField(max_length=32, verbose_name='Название')
    description = models.TextField(max_length=232, verbose_name='Описание',
                                   blank=True, null=True)
    account_number = models.PositiveIntegerField(verbose_name='Номер счета')

    def __str__(self):
        return self.name

    class Meta():
        verbose_name = 'Реквизиты'
        verbose_name_plural = 'Реквизиты'


class Partner(models.Model):
    name = models.CharField(max_length=32, verbose_name='Имя')
    avatar = models.TextField(max_length=640, verbose_name='Аватар партнера')
    vk_id = models.PositiveIntegerField(verbose_name='ID партнера в ВК')
    requisites = models.ForeignKey(Requisites, on_delete=models.CASCADE,
                                   blank=True, null=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        partner_info = partner(self.vk_id)
        self.name = f'{partner_info["first_name"]} {partner_info["last_name"]}'
        self.avatar = partner_info["photo_max"]
        super(Partner, self).save(*args, **kwargs)

    class Meta():
        verbose_name = 'Партнер'
        verbose_name_plural = 'Партнеры'


class Category(models.Model):
    name = models.CharField(max_length=32, verbose_name='Название')
    slug = models.SlugField(max_length=200, verbose_name='Ссылка', unique=True)

    def __str__(self):
        return self.name

    class Meta():
        ordering = ['name']
        verbose_name = 'Категория'
        verbose_name_plural = 'Категории'


class GroupsVk(models.Model):
    name = models.CharField(max_length=64, verbose_name='Название')
    vk_id = models.PositiveIntegerField(verbose_name='ID группы в ВК',
                                        unique=True)
    link = models.URLField(verbose_name='Ссылка на группу')
    link_screen = models.URLField(verbose_name='Видимая ссылка')
    avatar = models.TextField(max_length=640, verbose_name='Аватар группы')
    avatar_big = models.TextField(max_length=640,
                                  verbose_name='Аватар группы большой')
    label = models.BooleanField(verbose_name='Без метки')
    category = models.ManyToManyField(Category, verbose_name='Категория',
                                      related_name='category_vk')
    stats = models.URLField(verbose_name='Ссылка на статистику')
    owner = models.ForeignKey(Partner, on_delete=models.CASCADE,
                              verbose_name='Владелец')
    price = models.PositiveIntegerField(verbose_name='Цена')
    subscribes = models.PositiveIntegerField(verbose_name='Подписчики')
    coverage = models.PositiveIntegerField(verbose_name='Охват',
                                           blank=True, null=True)
    cpm = models.PositiveIntegerField(default=500, verbose_name='CPM')

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        self.link = f'https://vk.com/public{self.vk_id}'
        self.stats = f'https://vk.com/stats?gid={self.vk_id}'
        group = groups(self.vk_id)
        self.subscribes = group['members_count']
        self.name = group['name']
        self.avatar = group['photo_100']
        self.avatar_big = group['photo_200']
        self.link_screen = f"https://vk.com/{group['screen_name']}"

        if not self.coverage:
            self.coverage = 500
        self.cpm = (self.price / self.coverage * 1000)
        super(GroupsVk, self).save(*args, **kwargs)

    class Meta():
        ordering = ['-subscribes']
        verbose_name = 'Группy VK'
        verbose_name_plural = 'Группы VK'


class Favorite(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE,
                             related_name='favorites',
                             verbose_name='Пользователь',)
    group_vk = models.ForeignKey(GroupsVk, on_delete=models.CASCADE,
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


class Cart(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='cart',
        verbose_name='Пользователь',
    )
    group_vk = models.ForeignKey(GroupsVk, on_delete=models.CASCADE,
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
        return (f"""
                {self.group_vk} {self.group_vk.link} {self.group_vk.price}
                """)
