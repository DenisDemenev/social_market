from celery import shared_task
from celery.utils.log import get_task_logger


logger = get_task_logger(__name__)


@shared_task()
def update_group_task():
    import time

    from price.models import GroupsVk

    groups = GroupsVk.objects.all()
    for group in groups:
        time.sleep(1)
        group.save()


@shared_task()
def manual_update_group_task(id):
    import time

    from price.models import GroupsVk

    group = GroupsVk.objects.get(id=id)
    time.sleep(1)
    group.save()
