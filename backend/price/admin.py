import time

from django.contrib import admin

from price.models import (GroupsVk, Partner,
                          Requisites, Category,
                          Favorite, Cart)


@admin.action(description='Обновить данные в группах')
def make_published(modeladmin, request, queryset):
    for obj in queryset:
        obj.save()
        time.sleep(0.5)


@admin.register(GroupsVk)
class GroupsVkAdmin(admin.ModelAdmin):
    list_display = ('name', ('link', 'link_screen'), 'owner', 'stats',
                    ('price', 'subscribes', 'cpm'))
    fields = ['vk_id', 'category', 'owner',
              'price', 'coverage', 'label', ]

    ordering = ('name',)
    search_fields = ('name', 'vk_id', 'owner', 'link_screen',)
    actions = [make_published]
    radio_fields = {"label": admin.HORIZONTAL}
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
