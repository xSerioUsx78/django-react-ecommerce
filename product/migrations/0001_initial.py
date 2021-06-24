# Generated by Django 3.2.3 on 2021-05-25 17:10

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=50)),
                ('slug', models.SlugField(allow_unicode=True, blank=True, null=True)),
                ('description', models.TextField()),
                ('price', models.PositiveIntegerField()),
                ('discount_price', models.PositiveIntegerField(blank=True, null=True)),
            ],
        ),
    ]
