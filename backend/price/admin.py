from django.contrib import admin

from .models import (Groups, GroupsTG, GroupsInsta,
                     Partner, Requisites, Subject)

@admin.register(Groups)
class GroupsAdmin(admin.ModelAdmin):
    list_display = ('name', 'link', 'owner', 'stats', 'cpm')
    fields = ['vk_id', 'subject', 'owner',
              'price', 'coverage', 'label', ]

    ordering = ('name',)
    search_fields = ('name', 'vk_id', 'link',)


@admin.register(GroupsTG)
class GroupsTGAdmin(admin.ModelAdmin):
    list_display = ('name', 'link', 'owner', 'cpm')
    fields = ['name', 'link', 'stats', 'tg_id', 'subject', 'owner',
              'price', 'coverage', ]

    ordering = ('name',)
    search_fields = ('name', 'tg_id', 'link',)


@admin.register(GroupsInsta)
class GroupsInstaAdmin(admin.ModelAdmin):
    list_display = ('name', 'link', 'owner', 'cpm')
    fields = ['name', 'link', 'subject', 'owner',
              'price', 'price_storys', 'coverage', ]

    ordering = ('name',)
    search_fields = ('name', 'link',)


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


@admin.register(Subject)
class SubjectAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'slug')
    prepopulated_fields = {'slug': ('name',)}
    ordering = ('name',)
    search_fields = ('name',)
