from django.contrib import admin
from .models import Order, OrderItem, Coupon, Address

# Register your models here.


class OrderItemInline(admin.StackedInline):
    model = OrderItem
    extra = 0


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('user', 'ordered', 'is_refund',
                    'ordered_timestamp', 'tracking_code')
    inlines = (OrderItemInline,)


admin.site.register(OrderItem)
admin.site.register(Coupon)
admin.site.register(Address)
