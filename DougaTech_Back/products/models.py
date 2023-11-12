from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()
# Create your models here.


class Categories(models.Model):
    title = models.CharField(max_length=100)
    def __str__(self):
        return str(self.title)
    
class Labels(models.Model):
    title = models.CharField(max_length=100)
    def __str__(self):
        return str(self.title)
    
class Item(models.Model):
    #variants TODO
    title = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    discount_price = models.DecimalField(max_digits=1, decimal_places=2 ,null=True, blank=True)
    category = models.ForeignKey(Categories, on_delete=models.CASCADE, related_name='category_items')
    label = models.ForeignKey(Labels, on_delete=models.CASCADE, related_name='label_items')
    slug = models.SlugField()
    description = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to='media')

    def __str__(self):
        return str(self.title)



class OrderItem(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='order_items')
    item = models.ForeignKey(Item, on_delete=models.CASCADE, related_name='order_item')
    # item_variations TODO
    ordered = models.BooleanField(default=False)
    quantity = models.IntegerField(default=1)