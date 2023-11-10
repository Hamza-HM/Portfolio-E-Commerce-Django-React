from django.test import TestCase

# Create your tests here.

from django.contrib.auth import get_user_model

User = get_user_model()

class UserProfileTest(TestCase):
    def test_user_model_has_profile(self):
        user = User.objects.create(
            email='hamzaxskull@gmail.com',
            password='littlelemon&&',
        )

        user.save()
        print(user.profile, 'userrrrrrrrrrrrrrrrrrrr')
        self.assertTrue(hasattr(user, 'profile'))