from django.contrib import admin
from django.contrib.auth import admin as auth_admin
from django.contrib.auth import decorators, get_user_model
from django.utils.translation import gettext_lazy as _
# from rest_framework_simplejwt.models import Token
from .models import UserProfile, Address
User = get_user_model()


class UserProfileAdmin(admin.ModelAdmin):
    list_display = ['user_email', 'user_username']

    def user_email(self, obj):
        return str(obj.user.email)

    def user_username(self, obj):
        return str(obj.user.username)

@admin.register(User)
class UserAdmin(auth_admin.UserAdmin):
    fieldsets = (
        (None, {"fields": ("username", "email", "password",)}),
        (_("Personal info"), {"fields": ()}),
        (
            _("Permissions"),
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                ),
            },
        ),
        (_("Important dates"), {"fields": ("last_login", "date_joined")}),
    )
    list_display = ["email", "is_superuser", 'profile', 'is_activated']
    search_fields = ["email"]
    ordering = ["id"]
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("email", "password1", "password2"),
            },
        ),
    )
    def is_activated(self, obj):
        return obj.is_active
    is_activated.boolean = True
    is_activated.short_description = "Activated"

admin.site.register(UserProfile, UserProfileAdmin)
admin.site.register(Address)
