from .base import *


ALLOWED_HOSTS = []

DEBUG = True

SECRET_KEY = 'django-insecure-m66x3lk95+&jt-&)=t%(a@d(%b64#zg7cuyd0e%yibws_09(6h'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
