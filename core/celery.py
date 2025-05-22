from celery import Celery
import os

from django.conf import settings



os.environ.setdefault('DJANGO_SETTINGS_MODULE','core.settings')
app = Celery('dailydelish')
app.conf.enable_utc = False
app.conf.update(timezone='Asia/Kolkata')
app.config_from_object(settings, namespace='CELERY')

#celery-beat-config

app.autodiscover_tasks()

@app.task(bind=True)
def debug_task(self):
    print(f"Request: {self.request}")