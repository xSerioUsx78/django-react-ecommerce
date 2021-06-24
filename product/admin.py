from django.contrib import admin
from .models import (
    Product, ProductImage, Variation, ItemVariation,
    Specification, ItemSpecification
)

# Register your models here.


class ProductImageInline(admin.StackedInline):
    model = ProductImage
    extra = 0


class VariationInline(admin.StackedInline):
    model = Variation
    extra = 0


class SpecificationInline(admin.StackedInline):
    model = Specification
    extra = 0


class ItemVariationInline(admin.StackedInline):
    model = ItemVariation
    extra = 0


class ItemSpecificationInline(admin.StackedInline):
    model = ItemSpecification
    extra = 0


@admin.register(Variation)
class VariationAdmin(admin.ModelAdmin):
    inlines = (ItemVariationInline,)


@admin.register(Specification)
class SpecificationAdmin(admin.ModelAdmin):
    inlines = (ItemSpecificationInline,)


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('title',)}
    inlines = (ProductImageInline, VariationInline, SpecificationInline)


admin.site.register(ItemVariation)
admin.site.register(ItemSpecification)
admin.site.register(ProductImage)
