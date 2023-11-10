from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models import CharField, EmailField
from django.utils.translation import gettext_lazy as _
from django_countries.fields import CountryField
from django.conf import settings


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

    def save(self, *args, **kwargs):
        created = not self.pk
        super().save(*args, **kwargs)
        if created:
            UserProfile.objects.create(user=self)

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    first_name = CharField(_("First Name"), max_length=100, blank=True)
    last_name = CharField(_("Last Name"), max_length=100, blank=True)

    def __str__(self):
        return str(self.user.email)

class Address(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='address',
    blank=True, null=True)
    stree_address = models.CharField(_("Stree Address"), max_length=100)
    country = CountryField(_("Country"), multiple=True)
    zip = models.CharField(_("Zip Code"), max_length=100)
    address_type = models.CharField(_("Address Type"), max_length=1,
                                    choices = settings.ADDRESS_CHOICES)
    default = models.BooleanField(default=False)

