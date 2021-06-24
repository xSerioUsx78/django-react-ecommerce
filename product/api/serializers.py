from rest_framework import serializers
from ..models import (
    Product, Variation, ItemVariation, ProductImage,
    Specification, ItemSpecification
)


class ProductListSerializer(serializers.ModelSerializer):

    image = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ('id', 'slug', 'title', 'get_formated_price', 'get_formated_discount',
                  'get_percent', 'image'
                  )

    def get_image(self, obj):
        if obj.image:
            request = self.context.get('request')
            image_url = obj.image.url
            return request.build_absolute_uri(image_url)
        return ''


class ProductImageSerializer(serializers.ModelSerializer):

    image = serializers.SerializerMethodField()

    class Meta:
        model = ProductImage
        exclude = ('product',)

    def get_image(self, obj):
        if obj.image:
            request = self.context.get('request')
            image_url = obj.image.url
            return request.build_absolute_uri(image_url)
        return ''


class ItemVariationSerializer(serializers.ModelSerializer):

    class Meta:
        model = ItemVariation
        exclude = ('variation',)


class VariationSerializer(serializers.ModelSerializer):

    item_variations = ItemVariationSerializer(many=True, read_only=True)

    class Meta:
        model = Variation
        exclude = ('product',)


class ItemSpecificationSerializer(serializers.ModelSerializer):

    class Meta:
        model = ItemSpecification
        exclude = ('specification',)


class SpecificationSerializer(serializers.ModelSerializer):

    item_specifications = ItemSpecificationSerializer(
        many=True, read_only=True)

    class Meta:
        model = Specification
        exclude = ('product',)


class ProductDetailSerializer(serializers.ModelSerializer):

    image = serializers.SerializerMethodField()
    images = ProductImageSerializer(many=True, read_only=True)
    variations = VariationSerializer(many=True, read_only=True)
    specifications = SpecificationSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = ('id', 'slug', 'title', 'get_formated_price', 'get_formated_discount',
                  'get_percent', 'description', 'image', 'images', 'variations',
                  'specifications'
                  )

    def get_image(self, obj):
        if obj.image:
            request = self.context.get('request')
            image_url = obj.image.url
            return request.build_absolute_uri(image_url)
        return ''
