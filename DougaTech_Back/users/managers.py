from django.contrib.auth.models import UserManager as DjangoUserManager

class UserManager(DjangoUserManager):
    # Custom manager for the User model.

    def _create_user(self, email: str, password: str | None, **extra_fields):
        # create and save a user with the given email and password
        if not email:
            raise ValueError('The given email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)  # Use set_password to hash the password
        user.save()
        return user

    def create_user(self, email: str, password: str | None = None, **extra_fields):
        # Set a default password as None to handle social authentication cases
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True')

        # Ensure a password is provided for superuser creation
        if password is None:
            raise ValueError('Superuser must have a password')
        
        return self._create_user(email, password, **extra_fields)
