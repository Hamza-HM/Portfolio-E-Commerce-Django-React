from django.contrib.auth import get_user_model
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.viewsets import GenericViewSet
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status

from rest_framework.mixins import (
                                RetrieveModelMixin,
                                ListModelMixin,
                                UpdateModelMixin,
                                DestroyModelMixin,
                                CreateModelMixin)
from .serializers import (
                        UserSerializer,
                        UserProfileSerializer,
                        AddressSerializer)

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

    def get_queryset(self):
        address_type = self.request.query_params.get('address_type')
        if address_type:
            return Address.objects.filter(address_type=address_type)
        return super().get_queryset()

class AddressUserViewset(CreateModelMixin, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin, GenericViewSet):
    serializer_class = AddressSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        user = self.request.user
        address_type = self.request.query_params.get('address_type')

        if address_type:
            try:
                address = Address.objects.get(user=user, address_type=address_type)
            except Address.DoesNotExist:
                address = Address.objects.create(user=user, address_type=address_type)
                return address 
        else:
            return Response({'detail': 'Address type not provided'}, status=status.HTTP_400_BAD_REQUEST)

        return address
