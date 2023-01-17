from django.contrib import admin

from priceInstagram.models import GroupsInstagram


@admin.register(GroupsInstagram)
class GroupsInstagramAdmin(admin.ModelAdmin):
    list_display = ('name', 'link', 'owner', 'cpm')
    fields = ['name', 'link', 'avatar', 'subscribes', 'subject', 'owner',
              'price_post', 'price_story', 'coverage', ]

    ordering = ('name',)
    search_fields = ('name', 'link',)
