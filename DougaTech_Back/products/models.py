from django.db import models
from django.contrib.auth import get_user_model
from users.models import Address
import math
from django.core.validators import MinValueValidator, MaxValueValidator

User = get_user_model()
# Create your models here.


class Category(models.Model):
    title = models.CharField(max_length=100)
    def __str__(self):
        return str(self.title)

class Label(models.Model):
    title = models.CharField(max_length=100)
    def __str__(self):
        return str(self.title)

class Item(models.Model):
    title = models.CharField(max_length=100)
    price = models.FloatField()
    discount_price = models.DecimalField(
        max_digits=3,  # Total digits
        decimal_places=2,  # Digits after the decimal point
        null=True,
        blank=True,
        validators=[MinValueValidator(0), MaxValueValidator(1)]
    )
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='category_items')
    label = models.ForeignKey(Label, on_delete=models.CASCADE, related_name='label_items')
    slug = models.SlugField()
    description = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to='products/', blank=True, null=True)

    def __str__(self):
        return str(self.title)

class Variation(models.Model):
    item = models.ForeignKey(Item, on_delete=models.CASCADE, related_name='variations')
    name = models.CharField(max_length=50)

    class Meta:
        unique_together = (
            ('item', 'name')
        )
    def __str__(self):
        return str(self.name)

class ItemVariation(models.Model):
    variation = models.ForeignKey(Variation, on_delete=models.CASCADE, related_name='item_variations')
    value = models.CharField(max_length=50)
    attachment = models.ImageField(blank=True, null=True)
    class Meta:
        unique_together = (
            ('variation', 'value')
        )
    def __str__(self):
        return str(self.value)

class OrderItem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='order_items')
    item = models.ForeignKey(Item, on_delete=models.CASCADE, related_name='order_item')
    item_variations = models.ManyToManyField(ItemVariation)
    ordered = models.BooleanField(default=False)
    quantity = models.IntegerField(default=1)

    def __str__(self):
        return f'{self.quantity} of {self.item}'

    def get_total_item_price(self):
        return self.quantity * self.item.price

    def get_total_item_discount_price(self):
        return float(self.item.price) * float(self.item.discount_price)

    def get_total_discount_price(self):
        return self.get_total_item_discount_price() * self.quantity

    def get_amount_saved(self):
        return self.get_total_item_price() - self.get_total_discount_price()

    def get_final_price(self):
        if self.item.discount_price:
            return self.get_amount_saved()
        return self.get_total_item_price()

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
    ref_code = models.CharField(max_length=20, blank=True, null=True)
    items = models.ManyToManyField(OrderItem, related_name='order_set')
    start_data = models.DateTimeField(auto_now_add=True)
    ordered_date = models.DateTimeField()
    ordered = models.BooleanField(default=False)
    shipping_address = models.ForeignKey(Address, related_name='shipping_address', on_delete=models.SET_NULL, blank=True, null=True)
    billing_address = models.ForeignKey(Address, related_name='billing_address', on_delete=models.SET_NULL, blank=True, null=True)
    payment = models.ForeignKey('Payment', on_delete=models.SET_NULL, blank=True, null=True)
    coupon = models.ForeignKey('Coupon', on_delete=models.SET_NULL, null=True, blank=True)
    being_delivered = models.BooleanField(default=False)
    received = models.BooleanField(default=False)
    refund_requested = models.BooleanField(default=False)
    refund_granted = models.BooleanField(default=False)

    def __str__(self):
        return str(self.user)

    def get_total(self):
        total = 0.0
        for order_item in self.items.all():
            total += order_item.get_final_price()
        if self.coupon is not None:
            total -=  (total * float(self.coupon.amount))
        return custom_round(total)

class Payment(models.Model):
    user = models.ForeignKey(User,
                             on_delete=models.SET_NULL, blank=True, null=True, related_name="payments")
    stripe_charge_id = models.CharField(max_length=50)
    amount = models.FloatField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.user)

class Coupon(models.Model):
    code = models.CharField(max_length=15)
    amount = models.DecimalField(
        max_digits=3,
          decimal_places=2,
                  validators=[MinValueValidator(0), MaxValueValidator(1)]

          )

    def __str__(self):
        return str(self.code)

class Refund(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    reason = models.TextField()
    accepted = models.BooleanField(default=False)
    email = models.EmailField()

    def __str__(self):
        return str(self.order)

def custom_round(number):
    rounded_number = round(number, 2)
    rounded_down_number = math.floor(rounded_number * 100) / 100
    return rounded_down_number