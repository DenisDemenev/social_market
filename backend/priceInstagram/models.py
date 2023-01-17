from django.db import models
from price.models import Subject, Partner


class GroupsInstagram(models.Model):
    name = models.CharField(max_length=64, verbose_name='Название')
    link = models.URLField(verbose_name='Ссылка на группу')
    avatar = models.URLField(verbose_name='Аватар группы')
    subject = models.ManyToManyField(Subject, verbose_name='Тематика',
                                     related_name='instagram_subject')
    stats = models.URLField(verbose_name='Ссылка на статистику',
                            blank=True, null=True)
    owner = models.ForeignKey(Partner, on_delete=models.CASCADE,
                              verbose_name='Владелец')
    price_post = models.PositiveIntegerField(verbose_name='Цена поста')
    price_story = models.PositiveIntegerField(verbose_name='Цена сторис', 
                                              blank=True, null=True)
    subscribes = models.PositiveIntegerField(verbose_name='Подписчики')
    coverage = models.PositiveIntegerField(verbose_name='Охват',
                                           blank=True, null=True)
    cpm = models.PositiveIntegerField(default=500, verbose_name='CPM',
                                      blank=True, null=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.coverage:
            self.coverage = 500
        self.cpm = (self.price_post / self.coverage * 1000)
        super(GroupsInstagram, self).save(*args, **kwargs)

    class Meta():
        ordering = ['-subscribes']
        verbose_name = 'Группу Instagram'
        verbose_name_plural = 'Группы Instagram'
