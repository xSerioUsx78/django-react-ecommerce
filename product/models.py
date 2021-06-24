from django.db import models
from Ecommerce.utils import convert_to_comma

# Create your models here.


class Product(models.Model):
    title = models.CharField(max_length=50)
    slug = models.SlugField(allow_unicode=True, blank=True, null=True)
    description = models.TextField()
    image = models.ImageField(blank=True, null=True)
    price = models.PositiveIntegerField()
    amount_price = models.PositiveIntegerField(blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True, blank=True, null=True)

    class Meta:
        ordering = ('id',)

    def __str__(self):
        return self.title

    def get_formated_price(self):
        return convert_to_comma(self.price)

    def get_discount(self):
        return self.price - self.amount_price if self.amount_price else None

    def get_formated_discount(self):
        discount = self.get_discount()
        return convert_to_comma(discount) if discount else None

    def get_percent(self):
        percent = self.amount_price / self.price * 100 if self.amount_price else None
        return round(percent, 1) if percent else None


class Variation(models.Model):
    product = models.ForeignKey(Product,
                                on_delete=models.CASCADE,
                                related_name='variations')
    name = models.CharField(max_length=20)

    class Meta:
        ordering = ('id',)
        unique_together = (
            ('product', 'name'),
        )

    def __str__(self):
        return f'{self.product.title}: {self.name}'


class ItemVariation(models.Model):
    variation = models.ForeignKey(Variation,
                                  on_delete=models.CASCADE,
                                  related_name='item_variations')
    name = models.CharField(blank=True, null=True, max_length=50)
    value = models.CharField(max_length=30)

    class Meta:
        ordering = ('id',)
        unique_together = (
            ('variation', 'value'),
        )

    def __str__(self):
        return f'{self.variation.name}: {self.value}'


class Specification(models.Model):
    product = models.ForeignKey(Product,
                                on_delete=models.CASCADE,
                                related_name='specifications')
    name = models.CharField(max_length=50)

    class Meta:
        ordering = ('id',)
        unique_together = (
            ('product', 'name'),
        )

    def __str__(self):
        return f'{self.product.title}: {self.name}'


class ItemSpecification(models.Model):
    specification = models.ForeignKey(Specification,
                                      on_delete=models.CASCADE,
                                      related_name='item_specifications')
    key = models.CharField(max_length=50)
    value = models.CharField(max_length=50)

    class Meta:
        ordering = ('id',)
        unique_together = (
            ('specification', 'key'),
        )

    def __str__(self):
        return f'{self.specification.name}: {self.key}'


class ProductImage(models.Model):
    product = models.ForeignKey(Product,
                                on_delete=models.CASCADE,
                                related_name='images')
    image = models.ImageField()

    class Meta:
        ordering = ('id',)

    def __str__(self):
        return self.product.title
