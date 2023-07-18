from django.contrib import admin

from price.models import (GroupsVk, Partner,
                          Requisites, Category,
                          Favorite, Cart)


@admin.register(GroupsVk)
class GroupsVkAdmin(admin.ModelAdmin):
    list_display = ('name', 'link', 'owner', 'stats', 'cpm')
    fields = ['vk_id', 'category', 'owner',
              'price', 'coverage', 'label', ]

    ordering = ('name',)
    search_fields = ('name', 'vk_id', 'link',)


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
