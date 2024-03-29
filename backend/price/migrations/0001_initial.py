# Generated by Django 3.2 on 2023-07-18 09:33

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=32, verbose_name='Название')),
                ('slug', models.SlugField(max_length=200, unique=True, verbose_name='Ссылка')),
            ],
            options={
                'verbose_name': 'Категория',
                'verbose_name_plural': 'Категории',
                'ordering': ['name'],
            },
        ),
        migrations.CreateModel(
            name='Requisites',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=32, verbose_name='Название')),
                ('description', models.TextField(blank=True, max_length=232, null=True, verbose_name='Описание')),
                ('account_number', models.PositiveIntegerField(verbose_name='Номер счета')),
            ],
            options={
                'verbose_name': 'Реквизиты',
                'verbose_name_plural': 'Реквизиты',
            },
        ),
        migrations.CreateModel(
            name='Partner',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=32, verbose_name='Имя')),
                ('avatar', models.URLField(verbose_name='Аватар партнера')),
                ('vk_id', models.PositiveIntegerField(verbose_name='ID партнера в ВК')),
                ('requisites', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='price.requisites')),
            ],
            options={
                'verbose_name': 'Партнер',
                'verbose_name_plural': 'Партнеры',
            },
        ),
        migrations.CreateModel(
            name='GroupsVk',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=64, verbose_name='Название')),
                ('vk_id', models.PositiveIntegerField(unique=True, verbose_name='ID группы в ВК')),
                ('link', models.URLField(verbose_name='Ссылка на группу')),
                ('link_screen', models.URLField(verbose_name='Видимая ссылка')),
                ('avatar', models.URLField(verbose_name='Аватар группы')),
                ('avatar_big', models.URLField(verbose_name='Аватар группы большой')),
                ('label', models.BooleanField(verbose_name='Без метки')),
                ('stats', models.URLField(verbose_name='Ссылка на статистику')),
                ('price', models.PositiveIntegerField(verbose_name='Цена')),
                ('subscribes', models.PositiveIntegerField(verbose_name='Подписчики')),
                ('coverage', models.PositiveIntegerField(blank=True, null=True, verbose_name='Охват')),
                ('cpm', models.PositiveIntegerField(default=500, verbose_name='CPM')),
                ('category', models.ManyToManyField(related_name='category_vk', to='price.Category', verbose_name='Категория')),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='price.partner', verbose_name='Владелец')),
            ],
            options={
                'verbose_name': 'Группy VK',
                'verbose_name_plural': 'Группы VK',
                'ordering': ['-subscribes'],
            },
        ),
        migrations.CreateModel(
            name='Favorite',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('group_vk', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='favorites', to='price.groupsvk', verbose_name='Группа ВК')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='favorites', to=settings.AUTH_USER_MODEL, verbose_name='Пользователь')),
            ],
            options={
                'verbose_name': 'Избранное',
                'verbose_name_plural': 'Избранные',
                'ordering': ['-id'],
            },
        ),
        migrations.CreateModel(
            name='Cart',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('group_vk', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='cart', to='price.groupsvk', verbose_name='Группа ВК')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='cart', to=settings.AUTH_USER_MODEL, verbose_name='Пользователь')),
            ],
            options={
                'verbose_name': 'Корзина',
                'verbose_name_plural': 'В корзине',
                'ordering': ['-id'],
            },
        ),
        migrations.AddConstraint(
            model_name='favorite',
            constraint=models.UniqueConstraint(fields=('user', 'group_vk'), name='unique_favorite'),
        ),
        migrations.AddConstraint(
            model_name='cart',
            constraint=models.UniqueConstraint(fields=('user', 'group_vk'), name='unique_cart_user'),
        ),
    ]
