from django.contrib import admin

from priceTelegram.models import GroupsTelegram


@admin.register(GroupsTelegram)
class GroupsTelegramAdmin(admin.ModelAdmin):
    list_display = ('name', 'link', 'owner', 'cpm')
    fields = ['name', 'link', 'stats', 'tg_id', 'subject', 'owner',
              'price', 'subscribes', 'coverage', ]

    ordering = ('name',)
    search_fields = ('name', 'tg_id', 'link',)


# @admin.register(GroupsInstagram)
# class GroupsInstagramAdmin(admin.ModelAdmin):
#     list_display = ('name', 'link', 'owner', 'cpm')
#     fields = ['name', 'link', 'subscribes', 'subject', 'owner',
#               'price_post', 'price_story', 'coverage', ]

#     ordering = ('name',)
#     search_fields = ('name', 'link',)
