import time

from django.contrib import admin
from django.utils.translation import ngettext
from django.contrib import messages

from price.models import (GroupsVk, Partner,
                          Requisites, Category,
                          Favorite, Cart)
from price.tasks import manual_update_group_task


admin.site.site_header = 'SocialMax'
admin.site.site_title = 'SocialMax'
admin.site.index_title = 'Панель администратора'


@admin.action(description='Обновить данные в группах')
def update_group(self, request, queryset):
    try:
        for obj in queryset:
            manual_update_group_task.delay(obj.id)
        updated = queryset.count()
        self.message_user(request, ngettext(
            '%d группа обновлена.',
            '%d групп обновлены.',
            updated,
        ) % updated, messages.SUCCESS)
    except Exception as e:
        updated = queryset.count()
        self.message_user(request, ngettext(
            f'%d групп необновлены. Группа: {obj.name} Ошибка: {e}',
            f'%d группы необновлены. Группа: {obj.name} Ошибка: {e}',
            updated,
        ) % updated, messages.ERROR)


@admin.register(GroupsVk)
class GroupsVkAdmin(admin.ModelAdmin):
    list_display = ('name', 'link', 'owner', 'stats',
                    'price', 'subscribes', 'cpm')
    list_editable = ('price',)
    fields = ['vk_id', 'category', 'owner',
              'price', 'coverage', 'label', ]
    filter_horizontal = ('category',)
    ordering = ('name',)
    search_fields = ('name', 'vk_id', 'link', 'link_screen',)
    list_filter = ('category', 'owner__name')
    actions = [update_group]
    list_per_page = 40


@admin.register(Partner)
class PartnerAdmin(admin.ModelAdmin):
    list_display = ('name', 'requisites')
    fields = ['vk_id', 'requisites']
    ordering = ('name',)
    search_fields = ('name',)


@admin.register(Requisites)
class RequisitesAdmin(admin.ModelAdmin):
    list_display = ('name', 'account_number')
    ordering = ('name',)
    search_fields = ('name',)


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    prepopulated_fields = {'slug': ('name',)}
    ordering = ('name',)
    search_fields = ('name',)


@admin.register(Favorite)
class FavoriteGroupsAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'group_vk')
    empty_value_display = "-пусто-"


@admin.register(Cart)
class ShoppingCartAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'group_vk')
    empty_value_display = "-пусто-"
