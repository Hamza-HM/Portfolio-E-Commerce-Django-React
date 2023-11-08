from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models import CharField, EmailField
from django.utils.translation import gettext_lazy as _

from .managers import UserManager

class User(AbstractUser):
    # Replace the fields that you commented out with the following fields
    # name = CharField(_("First Name"), max_length=30, blank=True)
    first_name = CharField(_("First Name"), max_length=100, blank=True)
    last_name = CharField(_("Last Name"), max_length=100, blank=True)
    email = EmailField(_("Email Address"), unique=True)

    is_active = models.BooleanField(_("Active"), default=True)
    is_staff = models.BooleanField(_("Staff"), default=False)

    # Define the USERNAME_FIELD and REQUIRED_FIELDS
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ['first_name', 'last_name']

    objects = UserManager()

    def get_full_name(self):
        return f"{self.first_name} {self.last_name}"

    def get_short_name(self):
        return self.first_name

    def __str__(self):
        return self.email

    # You can uncomment the get_absolute_url method if needed
    # def get_absolute_url(self):
    #     return reverse("users:detail", kwargs={"pk": self.id})
