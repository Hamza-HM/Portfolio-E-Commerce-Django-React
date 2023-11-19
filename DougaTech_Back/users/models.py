from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models import CharField, EmailField
from django.utils.translation import gettext_lazy as _
from django_countries.fields import CountryField
from django.conf import settings

from django.db.models.signals import post_save
from django.dispatch import receiver
from .managers import UserManager

class User(AbstractUser):
    email = EmailField(_("Email Address"), unique=True)
    is_active = models.BooleanField(_("Active"), default=True)
    is_staff = models.BooleanField(_("Staff"), default=False)
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ['username']

    objects = UserManager()

    def get_full_name(self):
        return str(self.email)

    def __str__(self):
        return str(self.email)

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    first_name = CharField(_("First Name"), max_length=100, blank=True)
    last_name = CharField(_("Last Name"), max_length=100, blank=True)
    phone_number = models.CharField(max_length=15, blank=True)
    shipping_address = models.TextField(blank=True)
    billing_address = models.TextField(blank=True)
    date_of_birth = models.DateField(blank=True, null=True)
    profile_picture = models.ImageField(upload_to='profile/', blank=True)
    loyalty_points = models.IntegerField(default=0)
    social_media_facebook = models.URLField(blank=True)
    social_media_twitter = models.URLField(blank=True)
    social_media_instagram = models.URLField(blank=True)
    stripe_customer_id = models.CharField(max_length=50, blank=True, null=True)
    one_click_purchasing = models.BooleanField(default=False)

    def __str__(self):
        return str(self.user.email)

class Address(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='address')
    street_address = models.CharField(_("Street Address"), max_length=100, null=True, blank=True)
    country = CountryField(multiple=False)
    zip = models.CharField(_("Zip Code"), max_length=100, null=True, blank=True)
    address_type = models.CharField(_("Address Type"), max_length=1,
                                    choices = settings.ADDRESS_CHOICES, null=True, blank=True)
    default_addr = models.BooleanField(default=False)

    def __str__(self):
        return str(self.user)

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created and not hasattr(instance, 'profile'):
        UserProfile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    if hasattr(instance, 'profile'):
        instance.profile.save()
    else:
        UserProfile.objects.create(user=instance)