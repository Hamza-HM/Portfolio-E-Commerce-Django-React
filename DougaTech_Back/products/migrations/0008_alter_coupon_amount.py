# Generated by Django 4.2.7 on 2023-12-03 10:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0007_alter_coupon_amount_alter_item_discount_price'),
    ]

    operations = [
        migrations.AlterField(
            model_name='coupon',
            name='amount',
            field=models.DecimalField(decimal_places=2, max_digits=3),
        ),
    ]
