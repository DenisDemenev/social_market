from celery import shared_task
from celery.utils.log import get_task_logger


logger = get_task_logger(__name__)


@shared_task(bind=True, max_retries=3)
def views_task(self, id):
    from celery.exceptions import Retry

    from stats.models import Record
    from stats.utils import release_date
    import time

    try:
        time.sleep(1)
        record = Record.objects.get(id=id)
        post = release_date(record.link.split('=wall')[1])
        views = post['views']['count']
        if views:
            record.views = views
            record.save()
        else:
            record.is_deleted = True
            record.is_active = False
            record.save()
    except Exception as exc:
        self.retry(exc=exc, countdown=5)


@shared_task
def release_date_task():
    from stats.models import Record
    from stats.utils import release_date
    import datetime
    import time

    record = Record.objects.filter(is_active=True)
    for rec in record:
        if not rec.release_date:
            time.sleep(1)
            post = release_date(rec.link.split('=wall')[1])
            if (post):
                rec.release_date = datetime.datetime.fromtimestamp(
                    post['date'])
                stats_date = int(post['date']) + 85800
                rec.stats_date = datetime.datetime.fromtimestamp(stats_date)
                rec.save()
                time_out = stats_date - time.time()
                if time_out > 0:
                    # views_task.delay(time_out, rec.id)
                    views_task.apply_async((rec.id,), countdown=time_out)
                else:
                    rec.is_deleted = True
                    rec.is_active = False
                    rec.save()


@shared_task
def is_active_task():
    from stats.models import Record

    record = Record.objects.filter(is_active=True)
    for rec in record:
        if rec.views or rec.is_deleted:
            rec.is_active = False
            rec.save()


@shared_task
def manual_release_date_task(record_id):
    from stats.models import Record
    from stats.utils import release_date
    import datetime
    import time

    record = Record.objects.get(id=record_id)
    time.sleep(1)
    post = release_date(record.link.split('=wall')[1])
    if (post):
        record.release_date = datetime.datetime.fromtimestamp(
            post['date'])
        stats_date = int(post['date']) + 85800
        record.stats_date = datetime.datetime.fromtimestamp(stats_date)
        record.save()


@shared_task
def views_time_out_task():
    from stats.models import Record
    import time

    record = Record.objects.filter(is_active=True)
    for rec in record:
        if rec.stats_date and not rec.views:
            time_out = int(rec.stats_date.timestamp() - time.time())
            if time_out <= 1800:
                views_task.apply_async((rec.id,), countdown=time_out)


@shared_task(bind=True, max_retries=3)
def manual_views_task(self, record_id):
    from stats.models import Record
    from stats.utils import release_date
    import time

    try:
        time.sleep(1)
        record = Record.objects.get(id=record_id)
        post = release_date(record.link.split('=wall')[1])
        views = post['views']['count']
        if views:
            record.views = views
            record.save()
        else:
            record.is_deleted = True
            record.is_active = False
            record.save()
    except Exception as exc:
        self.retry(exc=exc, countdown=5)
