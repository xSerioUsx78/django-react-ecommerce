from .base import *
import django_heroku


ALLOWED_HOSTS = ["django-react-ecommerce-mn.herokuapp.com"]

DEBUG = False

SECRET_KEY = os.environ.get("SECRET_KEY")
STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles")
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'build', 'static')
]

DEFAULT_FILE_STORAGE = 'django_b2.storage.B2Storage'
B2_APP_KEY_ID = os.environ.get('B2_APP_KEY_ID')
B2_APP_KEY = os.environ.get('B2_APP_KEY')
B2_BUCKET_NAME = os.environ.get('B2_BUCKET_NAME')

django_heroku.settings(locals())
