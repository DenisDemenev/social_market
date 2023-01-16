from django.contrib import admin

from price.models import (Groups, Partner,
                          Requisites, Subject)


@admin.register(Groups)
class GroupsAdmin(admin.ModelAdmin):
    list_display = ('name', 'link', 'owner', 'stats', 'cpm')
    fields = ['vk_id', 'subject', 'owner',
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


@admin.register(Subject)
class SubjectAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'slug')
    prepopulated_fields = {'slug': ('name',)}
    ordering = ('name',)
    search_fields = ('name',)
