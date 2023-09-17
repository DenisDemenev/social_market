from django.contrib import admin
from stats.models import Record
from django.utils.translation import ngettext
from django.contrib import messages
from stats.tasks import manual_release_date_task, manual_views_task


@admin.action(description='Обновить')
def update(self, request, queryset):
    try:
        for obj in queryset:
            manual_release_date_task.delay(obj.id)
        updated = queryset.count()
        self.message_user(request, ngettext(
            '%d запись обновлена.',
            '%d записи обновлены.',
            updated,
        ) % updated, messages.SUCCESS)
    except Exception as e:
        updated = queryset.count()
        self.message_user(request, ngettext(
            f'%d запись необновлены. Запись: {obj.name} Ошибка: {e}',
            f'%d записи необновлены. Запись: {obj.name} Ошибка: {e}',
            updated,
        ) % updated, messages.ERROR)


@admin.action(description='Снять статистику в ручную')
def stats(self, request, queryset):
    try:
        for obj in queryset:
            manual_views_task.delay(obj.id)
        updated = queryset.count()
        self.message_user(request, ngettext(
            '%d запись обновлена.',
            '%d записи обновлены.',
            updated,
        ) % updated, messages.SUCCESS)
    except Exception as e:
        updated = queryset.count()
        self.message_user(request, ngettext(
            f'%d запись необновлены. Запись: {obj.name} Ошибка: {e}',
            f'%d записи необновлены. Запись: {obj.name} Ошибка: {e}',
            updated,
        ) % updated, messages.ERROR)


@admin.register(Record)
class RecordAdmin(admin.ModelAdmin):
    list_display = ('name', 'link', 'views', 'release_date',
                    'stats_date', 'is_active', 'is_deleted')
    fields = ['name', 'link', 'is_active', ]
    ordering = ('-date_created',)
    search_fields = ('is_active', 'is_deleted',)
    actions = [update, stats,]
    list_filter = ('is_active', 'is_deleted')
