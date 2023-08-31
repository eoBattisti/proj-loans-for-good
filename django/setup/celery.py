import os 
from django.conf import settings

from celery import Celery


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'setup.settings')

app = Celery('setup')

app.config_from_object('django.conf:settings', namespace='CELERY')

app.autodiscover_tasks(lambda: settings.INSTALLED_APPS)

@app.task
def debug_task(self):
    """
    Debug Task.
    """
    print(f'Request: {self.request!r}')

