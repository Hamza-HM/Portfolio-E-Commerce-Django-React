from rest_framework import serializers
from django.core.exceptions import ObjectDoesNotExist

from products.models import (
    Category,
    Label,
    Item,
    Order,
    OrderItem,
    Coupon,
    Variation,
    ItemVariation,
)

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = [
            'id',
            'title'
        ]
class LabelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Label
        Fields = [
            'id',
            'title'
        ]

class StringSerializer(serializers.StringRelatedField):
    def to_internal_value(self, data):
        return super().to_internal_value(data)
    
class CouponSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coupon
        fields = [
            'id',
            'code',
            'amount'
        ]

class ItemSerializer(serializers.ModelSerializer):
    category = serializers.SerializerMethodField()
    Label = serializers.SerializerMethodField()
    class Meta:
        model = Item
        fields = [
            'id',
            'title',
            'price',
            'discount_price',
            'category',
            'label',
            'slug',
            'description',
            'image'
        ]
    def get_category(self, obj):
        return CategorySerializer(obj.category).data

    def get_label(self, obj):
        return CategorySerializer(obj.label).data


class VariationDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Variation
        fields = [
            'id',
            'name'
        ]

class ItemVariationDetailSerializer(serializers.ModelSerializer):
    variation = serializers.SerializerMethodField()
    class Meta:
        model = ItemSerializer
        fields = [
            'id',
            'variation',
            'value',
            'attachment'
        ]

    def get_variation(self, obj):
        return  VariationDetailSerializer(obj.variation).data

class OrderItemSerializer(serializers.ModelSerializer):
    item = serializers.SerializerMethodField()
    final_price = serializers.SerializerMethodField()
    item_variations = serializers.SerializerMethodField()

    class Meta:
        model = OrderItem
        fields = [
            'id',
            'item',
            'quantity',
            'final_price',
            'item_variations'
        ]

    def get_item(self, obj):
        return ItemSerializer(obj.item).data

    def get_final_price(self, obj):
        return obj.get_final_price()

    def get_item_variations(self, obj):
        return ItemVariationDetailSerializer(obj.item_variations.all(), many=True).data

class OrderSerializer(serializers.ModelSerializer):
    order_items = serializers.SerializerMethodField()
    coupon = serializers.SerializerMethodField()
    class Meta:
        model = OrderItem
        fields = [
            'id',
            'order_items',
            'total',
            'coupon'
        ]
    def get_order_items(self, obj):
        try:
            if obj.items is not None:
                return OrderItemSerializer(obj.items.all()).data
        except ObjectDoesNotExist as e:
            return {'error': str(e)}
    def get_total(self, obj):
        return obj.get_total()

    def get_coupon(self, obj):
        if obj.coupon is None:
            return None
        return CouponSerializer(obj.coupon).data

class ItemVariationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemVariation
        fields = [
            'id',
            'value',
            'attachment'
        ]

class VariationSerializer(serializers.ModelSerializer):
    item_variations = serializers.SerializerMethodField()
    class Meta:
        Model  = Variation
        fields = [
            'id',
            'item_variations',
            'name'
        ]

    def get_item_variations(self, obj):
        if isinstance(obj, Variation) and obj.item_variations:
            return ItemVariationSerializer(obj.item_variations.all(), many=True).data
        return []
    
class ItemDetailSerializer(serializers.ModelSerializer):
    category = serializers.SerializerMethodField()
    label = serializers.SerializerMethodField()