# Generated by Django 3.2.3 on 2021-05-28 21:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0005_itemspecification_itemvariation_productimage_specification_variation'),
    ]

    operations = [
        migrations.AddField(
            model_name='itemvariation',
            name='name',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]
