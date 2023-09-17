from celery import shared_task
from celery.utils.log import get_task_logger


logger = get_task_logger(__name__)


@shared_task()
def update_group_task():
    from price.models import GroupsVk
    import time
    groups = GroupsVk.objects.all()
    for group in groups:
        time.sleep(1)
        group.save()


@shared_task()
def manual_update_group_task(id):
    from price.models import GroupsVk
    import time
    group = GroupsVk.objects.get(id=id)
    time.sleep(1)
    group.save()
