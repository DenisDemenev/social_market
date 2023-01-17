from django.db import models
from price.models import Subject, Partner


class GroupsTelegram(models.Model):
    name = models.CharField(max_length=64, verbose_name='Название')
    tg_id = models.PositiveIntegerField(verbose_name='ID группы в Telegram',
                                        unique=True)
    link = models.URLField(verbose_name='Ссылка на группу')
    avatar = models.ImageField(upload_to='telegram/',
                               verbose_name='Аватар', blank=True)
    subject = models.ManyToManyField(Subject, verbose_name='Тематика',
                                     related_name='telegram_subject')
    stats = models.URLField(verbose_name='Ссылка на статистику',
                            blank=True, null=True)
    owner = models.ForeignKey(Partner, on_delete=models.CASCADE,
                              verbose_name='Владелец')
    price = models.PositiveIntegerField(verbose_name='Цена')
    subscribes = models.PositiveIntegerField(verbose_name='Подписчики')
    coverage = models.PositiveIntegerField(verbose_name='Охват',
                                           blank=True, null=True)
    cpm = models.PositiveIntegerField(default=500, verbose_name='CPM')

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.coverage:
            self.coverage = 500
        self.cpm = (self.price / self.coverage * 1000)
        super(GroupsTelegram, self).save(*args, **kwargs)

    class Meta():
        ordering = ['-subscribes']
        verbose_name = 'Группу Telegram'
        verbose_name_plural = 'Группы Telegram'
