from django.contrib import admin

from priceTelegram.models import GroupsTelegram


@admin.register(GroupsTelegram)
class GroupsTelegramAdmin(admin.ModelAdmin):
    list_display = ('name', 'link', 'owner', 'cpm')
    fields = ['name', 'link', 'avatar', 'subject', 'owner',
              'price', 'subscribes', 'coverage', ]

    ordering = ('name',)
    search_fields = ('name', 'link',)
