from rest_framework import serializers
from phonenumber_field.serializerfields import PhoneNumberField
from product.models import Product
from product.api.serializers import (
    ItemVariationSerializer, ProductListSerializer
)
from ..models import Order, OrderItem, Address


class ProductSerializer(ProductListSerializer):

    class Meta:
        model = Product
        fields = ('id', 'slug', 'title', 'image', 'get_formated_price',
                  'get_formated_discount', 'get_percent')


class OrderItemSerializer(serializers.ModelSerializer):

    product = ProductSerializer()
    variation = ItemVariationSerializer(many=True, read_only=True)

    class Meta:
        model = OrderItem
        fields = ('id', 'product', 'variation',
                  'quantity', 'get_total_price')


class OrderSerializer(serializers.ModelSerializer):

    order_items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = ('id', 'coupon_code', 'address', 'order_items',
                  'get_total_price',
                  'get_total_fianl_price', 'get_final_amount')


class AddressSerializer(serializers.ModelSerializer):

    unit = serializers.CharField(allow_blank=True, allow_null=True)

    class Meta:
        model = Address
        fields = ('id', 'state', 'city',
                  'district',
                  'postal_address',
                  'plaque',
                  'unit',
                  'postal_code',
                  'recipients_first_name',
                  'recipients_last_name',
                  'national_code',
                  'phone_number',
                  'default',
                  'get_full_name',
                  'get_full_address'
                  )
