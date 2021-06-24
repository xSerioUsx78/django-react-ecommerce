from django.db import models
from django.db.models import Sum
from django.conf import settings
from phonenumber_field.modelfields import PhoneNumberField
from Ecommerce.utils import generate_random_code
from Ecommerce.utils import convert_to_comma, convert_to_int

# Create your models here.

User = settings.AUTH_USER_MODEL


class Order(models.Model):
    user = models.ForeignKey(User,
                             on_delete=models.CASCADE, related_name='orders')
    ordered = models.BooleanField(default=False)
    ordered_timestamp = models.DateTimeField(blank=True, null=True)
    is_refund = models.BooleanField(default=False)
    coupon_code = models.ForeignKey(
        'Coupon',
        on_delete=models.SET_NULL,
        blank=True, null=True, related_name='coupons_order')
    tracking_code = models.PositiveIntegerField(blank=True, null=True)
    address = models.ForeignKey('Address',
                                on_delete=models.SET_NULL,
                                blank=True, null=True,
                                related_name='order_addresses')

    def __str__(self):
        return self.user.username

    def get_total_price(self):
        order_items = self.order_items.all()
        final_price = 0
        for item in order_items:
            total_price = convert_to_int(
                item.get_total_price_without_discount())
            final_price += total_price
        return convert_to_comma(final_price)

    def get_total_fianl_price(self):
        order_items = self.order_items.all()
        final_price = 0
        for item in order_items:
            total_price = convert_to_int(item.get_total_price())
            final_price += total_price
        return convert_to_comma(final_price)

    def get_final_amount(self):
        order_items = self.order_items.all()
        final_amount = 0
        for item in order_items:
            total_amount = item.get_total_amount()
            final_amount += total_amount
        return convert_to_comma(final_amount)


class OrderItem(models.Model):
    order = models.ForeignKey(Order,
                              on_delete=models.CASCADE,
                              related_name='order_items')
    product = models.ForeignKey("product.Product",
                                on_delete=models.CASCADE,
                                related_name="order_items")
    variation = models.ManyToManyField("product.ItemVariation",
                                       blank=True,
                                       related_name='order_item_variations')
    quantity = models.PositiveIntegerField(default=1)
    added_to_cart_timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.order.user.username

    def get_total_price_without_discount(self):
        price = self.product.price
        quantity = self.quantity
        total = price * quantity
        return convert_to_comma(total)

    def get_total_price(self):
        product = self.product
        price = product.price
        quantity = self.quantity
        if product.amount_price:
            price = product.get_discount()
        total = price * quantity
        return convert_to_comma(total)

    def get_total_amount(self):
        product = self.product
        amount_price = product.amount_price
        amount = amount_price if amount_price else 0
        quantity = self.quantity
        total = amount * quantity
        return total


class Coupon(models.Model):
    code = models.CharField(max_length=10, default=generate_random_code)
    amount = models.PositiveIntegerField()
    usable_times = models.PositiveIntegerField(blank=True, null=True)
    expire_time = models.DateTimeField(blank=True, null=True)
    used_count = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.code


class Address(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE,
                             related_name='addresses')
    state = models.CharField(max_length=50)
    city = models.CharField(max_length=50)
    district = models.CharField(max_length=30)
    postal_address = models.CharField(
        max_length=250)
    plaque = models.PositiveIntegerField()
    unit = models.PositiveIntegerField(blank=True, null=True)
    postal_code = models.CharField(max_length=10)
    recipients_first_name = models.CharField(max_length=50)
    recipients_last_name = models.CharField(max_length=50)
    national_code = models.CharField(max_length=10)
    phone_number = PhoneNumberField(max_length=13, region='IR')
    default = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.recipients_first_name} {self.recipients_last_name}'

    def get_full_name(self):
        return f'{self.recipients_first_name} {self.recipients_last_name}'

    def get_full_address(self):
        unit = f', واحد {self.unit}' if self.unit else ''
        address = f'{self.state}, {self.city}, {self.district}, {self.postal_address}, پلاک {self.plaque}{unit}'
        return address
