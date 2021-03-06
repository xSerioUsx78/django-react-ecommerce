# Generated by Django 3.1.8 on 2021-05-02 13:37

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('contenttypes', '0002_remove_content_type_name'),
    ]

    operations = [
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('object_id', models.PositiveIntegerField(verbose_name='شناسه')),
                ('content', models.TextField(verbose_name='نظر')),
                ('commented_timestamp', models.DateTimeField(default=django.utils.timezone.now, verbose_name='تاریخ و زمان ارسال')),
                ('approved_timestamp', models.DateTimeField(blank=True, null=True, verbose_name='تاریخ و زمان تایید')),
                ('is_approved', models.BooleanField(default=False, verbose_name='تایید شده')),
                ('viewed_by_admin', models.CharField(choices=[('N', 'نظر جدید'), ('V', 'بررسی شده')], default='N', editable=False, max_length=1, verbose_name='وضعیت بررسی')),
                ('content_type', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='contenttypes.contenttype', verbose_name='نوع محتوی')),
                ('reply', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='replies', to='comment.comment', verbose_name='پاسخ')),
            ],
            options={
                'verbose_name': 'نظر',
                'verbose_name_plural': 'نظرات',
            },
        ),
    ]
