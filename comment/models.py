from django.db import models
from django.utils.translation import gettext_lazy as _
from django.conf import settings
from django.utils import timezone
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey
from model_utils import FieldTracker

# Create your models here.


User = settings.AUTH_USER_MODEL


COMMENT_STATUS_CHOICES = (
    ('N', 'نظر جدید'),
    ('V', 'بررسی شده')
)


class CommentManager(models.Manager):
    ''' Comment QuerySet '''

    def unseen(self):
        return self.filter(viewed_by_admin='N')


class Comment(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE)
    reply = models.ForeignKey('self', models.CASCADE,
                              blank=True, null=True, related_name='replies')
    object_id = models.PositiveIntegerField()
    content_type = models.ForeignKey(
        ContentType,
        on_delete=models.CASCADE,
    )
    content_object = GenericForeignKey(
        'content_type',
        'object_id',
    )
    content = models.TextField()
    commented_timestamp = models.DateTimeField(
        default=timezone.now)
    approved_timestamp = models.DateTimeField(
        blank=True, null=True)
    is_approved = models.BooleanField(
        default=False)
    viewed_by_admin = models.CharField(
        choices=COMMENT_STATUS_CHOICES, max_length=1, default='N', editable=False)
    objects = CommentManager()
    tracker = FieldTracker()

    def __str__(self):
        return self.user.username

    def get_replies(self):
        return self.replies.filter(is_approved=True).order_by('-approved_timestamp')
