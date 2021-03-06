# Generated by Django 3.2.3 on 2021-05-28 14:28

import Ecommerce.utils
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import phonenumber_field.modelfields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('product', '0005_itemspecification_itemvariation_productimage_specification_variation'),
    ]

    operations = [
        migrations.CreateModel(
            name='Address',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('state', models.CharField(max_length=50)),
                ('city', models.CharField(max_length=50)),
                ('district', models.CharField(max_length=30)),
                ('postal_address', models.CharField(max_length=250)),
                ('plaque', models.PositiveIntegerField()),
                ('unit', models.PositiveIntegerField(blank=True, null=True)),
                ('postal_code', models.CharField(max_length=10)),
                ('recipients_first_name', models.CharField(max_length=50)),
                ('recipients_last_name', models.CharField(max_length=50)),
                ('national_code', models.CharField(max_length=10)),
                ('phone_number', phonenumber_field.modelfields.PhoneNumberField(max_length=13, region='IR')),
                ('default', models.BooleanField(default=False)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='addresses', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Coupon',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(default=Ecommerce.utils.generate_random_code, max_length=10)),
                ('amount', models.PositiveIntegerField()),
                ('usable_times', models.PositiveIntegerField(blank=True, null=True)),
                ('expire_time', models.DateTimeField(blank=True, null=True)),
                ('used_count', models.PositiveIntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ordered', models.BooleanField(default=False)),
                ('ordered_timestamp', models.DateTimeField(blank=True, null=True)),
                ('is_refund', models.BooleanField(default=False)),
                ('tracking_code', models.PositiveIntegerField(blank=True, null=True)),
                ('address', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='order_addresses', to='order.address')),
                ('coupon_code', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='coupons_order', to='order.coupon')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='orders', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='OrderItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.PositiveIntegerField(default=1)),
                ('added_to_cart_timestamp', models.DateTimeField(auto_now_add=True)),
                ('order', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='order_items', to='order.order')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='order_items', to='product.product')),
                ('variation', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='order_item_variations', to='product.itemvariation')),
            ],
        ),
    ]
