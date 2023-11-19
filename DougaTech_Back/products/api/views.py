from django_countries import countries
from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from rest_framework.generics import RetrieveAPIView, ListAPIView, DestroyAPIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.core.exceptions import ObjectDoesNotExist
import stripe

from django.utils import timezone
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
from users.models import UserProfile

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
    serializer_class = CouponSerializer
    def get_object(self):
        code = self.request.data.get('code', None)
        if code is None:
            return None
        try:
            coupon = Coupon.objects.get(code=code)
            return coupon
        except Coupon.DoesNotExist:
            return None

class CategoryView(ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = CategorySerializer
    queryset = Category.objects.all()


class OrderItemDeleteView(DestroyAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = OrderItem.objects.all()

class OrderQuantityUpdateView(APIView):
    permission_classes = (IsAuthenticated,)
    def post(self, request, *args, **kwargs):
        slug = request.data.get("slug", None)
        variations = request.data.get("variations", [])

        if slug is None or variations is None:
            return Response({"message", "Invalid data"}, status.HTTP_400_BAD_REQUEST)

        item = get_object_or_404(Item, slug=slug)
        min_variations_count = Variation.objects.filter(item=item).count()

        if len(variations) < min_variations_count or len(variations) > min_variations_count:
            return Response({"message": "Please specify the required variations."}, status.HTTP_400_BAD_REQUEST)

        order_qs = Order.objects.filter(
            user=request.user,
            ordered=False
        )
        if order_qs.exists():
            order_item_qs = OrderItem.objects.filter(
                user=request.user,
                item=item,
                ordered=False
            )
            for v in variations:
                order_item_qs = order_item_qs.filter(
                    item_variations__exact=v
                )
            if order_item_qs.exists():
                order_item = order_item_qs.first()
                if order_item.quantity > 1:
                    order_item.quantity -= 1
                    order_item.save()
                else:
                    # order.items.remove(order_item.id)
                    order_item.delete()
                    return Response({'detail': 'Item Deleted'}, status.HTTP_200_OK)
                return Response({'detail': 'quantity updated'}, status.HTTP_200_OK)
            else:
                return Response({"message": "No such item in cart"}, status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"message": "You have no orders"}, status.HTTP_400_BAD_REQUEST)




class AddToCart(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        slug = request.data.get("slug", None)
        variations = request.data.get("variations", [])
        if slug is None:
            return Response({"detail": "Invalid request"}, status.HTTP_400_BAD_REQUEST)

        item = get_object_or_404(Item, slug=slug)

        min_variations_count = Variation.objects.filter(item=item).count()

        if len(variations) < min_variations_count:
            return Response({"message": "Please specify the required variations."}, status.HTTP_400_BAD_REQUEST)

        order_item_qs = OrderItem.objects.filter(
            item=item,
            user=request.user,
            ordered=False
        )
        for v in variations:
            order_item_qs = order_item_qs.filter(
                item_variations__exact=v
            )
        if order_item_qs.exists():
            order_item = order_item_qs.first()
            order_item.quantity += 1
            order_item.save()
        else:
            order_item = OrderItem.objects.create(
                item=item,
                user=request.user,
                ordered=False
            )
            order_item.item_variations.add(*variations)
            order_item.save()

        order_qs = Order.objects.filter(user=request.user, ordered=False)
        if order_qs.exists():
            order = order_qs.first()
            # check if the order item is in the order
            if not order.items.filter(item__id=order_item.id).exists():
                order.items.add(order_item)
            return Response({'detail': 'added'}, status.HTTP_200_OK)
        else:
            ordered_date = timezone.now()
            order = Order.objects.create(
                user=request.user, ordered_date=ordered_date)
            order.items.add(order_item)
            return Response({'detail': 'created & added'}, status.HTTP_200_OK)



class OrderDetailView(RetrieveAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        try:
            order = Order.objects.get(user=self.request.user,
                                      ordered=False)
            return order
        except Order.DoesNotExist:
            return None

class PaymentView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        order = Order.objects.get(user=self.request.user, ordered=False)
        user_profile = UserProfile.objects.get(user=self.request.user)
        token = request.data.get('stripe_token')
        selected_billing_id = request.data.get("billing")
        selected_shipping_id = request.data.get("shipping")
        billing_address = Address.objects.get(id=selected_billing_id)
        shipping_address = Address.objects.get(id=selected_shipping_id)

        if token:
            payment_method = stripe.PaymentMethod.create(
                type='card',
                card={
                    "token": token
                }
            )
        if user_profile.stripe_customer_id:
            stripe.PaymentMethod.attach(
                payment_method.id,
                customer=user_profile.stripe_customer_id
            )
            stripe.Customer.modify(
                user_profile.stripe_customer_id,
                invoice_settings={'default_payment_method': payment_method.id}
            )
        else:
            customer = stripe.Customer.create(
                email=self.request.user.email,
                payment_method=payment_method.id
            )
            user_profile.stripe_customer_id = customer.id
            user_profile.one_click_purchasing = True
            user_profile.save()
        
        amount = int(order.get_total())

class AddCouponView(APIView):
    def post(self, request, *args, **kwargs):
        code = request.data.get('code', None)
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

