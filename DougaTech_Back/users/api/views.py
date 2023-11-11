from django.contrib.auth import get_user_model
from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import RetrieveModelMixin, ListModelMixin, UpdateModelMixin, DestroyModelMixin, CreateModelMixin
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer, UserProfileSerializer, AddressSerializer
from ..models import UserProfile, Address

User = get_user_model()

class UserControleViewSet(ListModelMixin, UpdateModelMixin, DestroyModelMixin, GenericViewSet):
    serializer_class = UserProfileSerializer
    queryset = UserProfile.objects.all()
    permission_classes = [IsAdminUser]
    lookup_field = 'pk'

class UserProfileViewSet(RetrieveModelMixin, UpdateModelMixin, GenericViewSet):
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        user = self.request.user
        return user.profile
    
class AddressControlViewSet(RetrieveModelMixin, ListModelMixin, UpdateModelMixin, DestroyModelMixin, GenericViewSet):
    serializer_class = AddressSerializer
    permission_classes = [IsAdminUser]
    queryset = Address.objects.all()

class AddressUserViewset(CreateModelMixin, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin, GenericViewSet):
    serializer_class = AddressSerializer
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        return self.request.user.Address