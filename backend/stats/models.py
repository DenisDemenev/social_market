from django.db import models


class Record(models.Model):
    name = models.CharField(max_length=200, verbose_name='Название')
    link = models.URLField(verbose_name='Ссылка')
    views = models.IntegerField(
        blank=True, null=True, verbose_name='Просмотры поста')
    release_date = models.DateTimeField(
        blank=True, null=True, verbose_name='Дата и время выхода')
    stats_date = models.DateTimeField(
        blank=True, null=True, verbose_name='Дата статистики')
    is_active = models.BooleanField(default=True, verbose_name='Активно')
    is_deleted = models.BooleanField(
        default=False, verbose_name='Удалена до снятия статистики')
    date_created = models.DateTimeField(
        auto_now_add=True, verbose_name='Дата создания')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Запись'
        verbose_name_plural = 'Записи'
