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
        fields = [
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
    category = CategorySerializer()  # Use the CategorySerializer directly
    label = LabelSerializer()  # Use the LabelSerializer directly
    discount_price = serializers.SerializerMethodField()
    variations = serializers.SerializerMethodField()
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
            'variations',
            'description',
            'image'
        ]
    def get_discount_price(self, obj):
        if obj.discount_price:
            return float(obj.price) * float(obj.discount_price)
        return 0.0
    def get_variations(self, obj):
        return VariationDetailSerializer(obj.variations.all(), many=True).data


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
        model = ItemVariation
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
    total = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = [
            'id',
            'order_items',
            'total',
            'coupon'
        ]

    def get_order_items(self, obj):
        try:
            if obj.items.all().exists():
                return OrderItemSerializer(obj.items.all(), many=True).data
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
        model  = Variation
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
    category = serializers.StringRelatedField()
    label = serializers.StringRelatedField()
    variations = serializers.SerializerMethodField()
    class Meta:
        model = Item
        fields = [
            "id",
            "title",
            "price",
            "discount_price",
            "category",
            "label",
            "slug",
            "description",
            "image",
            "variations",
        ]
    # def get_category(self, obj):
    #     return CategorySerializer(obj.category).data

    # def get_label(self, obj):
    #     return LabelSerializer(obj.label).data
    
    def get_variations(self, obj):
        return VariationSerializer(obj.variations.all(), many=True).data