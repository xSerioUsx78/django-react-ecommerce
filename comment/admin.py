from django.contrib import admin
from django.contrib.contenttypes.models import ContentType
from django.shortcuts import get_object_or_404
from django.utils.html import format_html
from .models import Comment

# Register your models here.


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('viewed_by_admin_color', 'user', 'reply', 'get_item',
                    'get_content', 'commented_timestamp', 'is_approved', 'approved_timestamp')
    list_display_links = ('viewed_by_admin_color', 'user')
    list_editable = ('is_approved',)
    list_filter = ('is_approved',)
    search_fields = ('user__username', 'user__pk', 'content', 'pk')
    list_per_page = 20

    def save_model(self, request, instance, form, change):
        user = request.user
        instance = form.save(commit=False)
        if not change and not None:
            instance.user = user
            super().save_model(request, instance, form, change)
        super().save_model(request, instance, form, change)

    def change_view(self, request, object_id, form_url='', extra_context=None):
        obj = get_object_or_404(Comment, id=object_id)
        if obj.viewed_by_admin == 'N':
            obj.viewed_by_admin = 'V'
            obj.save()
        return super(CommentAdmin, self).change_view(
            request, object_id, form_url, extra_context=extra_context,
        )

    def viewed_by_admin_color(self, obj):
        if obj.viewed_by_admin == 'N':
            obj_html = format_html(
                u'<span class="badge badge-danger">{}</span>', obj.get_viewed_by_admin_display())
        elif obj.viewed_by_admin == 'V':
            obj_html = format_html(
                u'<span class="badge badge-success">{}</span>', obj.get_viewed_by_admin_display())
        else:
            obj_html = format_html(
                u'<span class="badge badge-secondary">{}</span>', 'پشتیبان')
        return obj_html

    viewed_by_admin_color.short_description = 'وضعیت بررسی'
    viewed_by_admin_color.admin_order_field = 'viewed_by_admin'

    def get_content(self, instance):
        return instance.content[:30] + ' ...' if len(instance.content) > 30 else instance.content

    get_content.short_description = 'نظر'
    get_content.admin_order_field = 'content'

    def get_item(self, instance):
        try:
            return instance.content_object.title
        except:
            return 'ندارد'

    get_item.short_description = 'آموزش'
