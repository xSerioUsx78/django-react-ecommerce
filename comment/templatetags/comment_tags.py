from django import template
from django.contrib.contenttypes.models import ContentType
from ..models import Comment

register = template.Library()


@register.simple_tag
def get_comments_count(obj):
    ctype = ContentType.objects.get_for_model(obj)
    return Comment.objects.filter(
        content_type=ctype,
        object_id=obj.pk,
        is_approved=True
    ).count()
