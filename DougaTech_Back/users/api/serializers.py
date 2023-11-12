from django.contrib.auth import get_user_model
from rest_framework import serializers
from ..models import UserProfile, Address
User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','email', 'first_name','last_name', 'password']


class UserProfileSerializer(serializers.ModelSerializer):
    email = serializers.SerializerMethodField(read_only=True)
    username = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model= UserProfile
        fields = [
            'id',
            'email',
            'username',
            'first_name',
            'last_name',
        ]
    def get_email(self, obj):
        return str(obj.user.email)
    def get_username(self, obj):
        return str(obj.user.username)
    
class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = [
            'id',
            'stree_address',
            'country',
            'zip',
            'address_type',
            'default'
        ]