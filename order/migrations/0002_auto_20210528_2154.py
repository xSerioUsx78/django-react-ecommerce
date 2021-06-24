# Generated by Django 3.2.3 on 2021-05-28 21:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0006_itemvariation_name'),
        ('order', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='orderitem',
            name='variation',
        ),
        migrations.AddField(
            model_name='orderitem',
            name='variation',
            field=models.ManyToManyField(blank=True, related_name='order_item_variations', to='product.ItemVariation'),
        ),
    ]