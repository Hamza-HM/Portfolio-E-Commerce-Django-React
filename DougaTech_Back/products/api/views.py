from django_countries import countries
from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from rest_framework.generics import RetrieveAPIView, ListAPIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.core.exceptions import ObjectDoesNotExist

from datetime import timezone
from .serializers import (
    ItemDetailSerializer,
    ItemSerializer,
    CouponSerializer,
    CategorySerializer,
    OrderItemSerializer,
    OrderSerializer
)

from ..models import (
    Item,
    Coupon,
    Category,
    Variation,
    OrderItem,
    Order
)

class ItemView(GenericViewSet, ListModelMixin, RetrieveModelMixin):
    permission_classes = [AllowAny]
    queryset = Item.objects.all()

    def get_serializer_class(self):
        if self.action == 'list':
            return ItemSerializer
        if self.action == 'retrieve':
            return ItemDetailSerializer
        return Response({'detail': 'method not allowed'})

class CouponView(RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CouponSerializer
    queryset = Coupon.objects.all()

class CategoryView(ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = CategorySerializer
    queryset = Category.objects.all()


class AddToCart(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        slug = request.data.get('slug', None)
        variations = request.data.get('variations', [])

        if slug is None:
            return Response({'detail': 'Invalid request'}, status.HTTP_400_BAD_REQUEST)

        item = get_object_or_404(Item, slug=slug)
        min_variations_count = Variation.objects.filter(item=item).count()

        if len(variations < min_variations_count):
            return Response({"message": "Please specify the required variations."}, status.HTTP_400_BAD_REQUEST)

        user = request.user
        order_item_qs = OrderItem.objects.filter(
            item=item,
            user=user,
            ordered=False
        )

        for v in variations:
            order_item_qs = order_item_qs.filter(item_variations_exact=v)

        if order_item_qs.exists():
            order_item = order_item_qs.first()
            order_item.quantity += 1
            order_item.save()
        else:
            order_item = OrderItem.objects.create(
                item=item,
                user=user,
                ordered=False
            )
            order_item.item_variations.add(*variations)
            order_item.save()

            order_qs = Order.objects.filter(user=user, ordered=False)

            if not order_qs.exists():
                ordered_date= timezone.now()
                order = Order.objects.create(
                    user=user,
                    ordered_date=ordered_date
                )
                order.items.add(order_item)
                return Response(status.HTTP_200_OK)

            order = order_qs.first()
            if not order.items.filter(item__id=order_item.id).exists():
                order.items.add(order_item)
            return Response({'detail': 'Success'}, status.HTTP_200_OK)


class OrderDetailView(RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = OrderSerializer

    def get_object(self):
        try:
            order = Order.objects.get(user=self.request.user,
                                      ordered=False)
            return Order
        except ObjectDoesNotExist:
            return Response({'detail': 'No active'}, status.HTTP_404_NOT_FOUND)

class AddCouponView(APIView):
    def post(self, request, *args, **kwargs):
        code = request.data.get('code', None):
        if code is None:
            return Response({'detail': 'Invalid Coupon'}, status.HTTP_400_BAD_REQUEST)
        try:
            order = Order.objects.get(user=request.user,
                                     ordered=False)
            coupon = get_object_or_404(Coupon, code=code)
            order.coupon = coupon
            order.save()
        except ObjectDoesNotExist:
            return Response({'detail': 'Invalid data'}, status.HTTP_404_NOT_FOUND)
