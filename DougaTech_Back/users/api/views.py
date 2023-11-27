from django.contrib.auth import get_user_model
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.viewsets import GenericViewSet
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework.generics import (
    CreateAPIView,
    UpdateAPIView
    
    )
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

class UserControleViewSet(ListModelMixin, GenericViewSet):
    serializer_class = UserProfileSerializer
    queryset = UserProfile.objects.all()
    permission_classes = [IsAdminUser]

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

class AddressUserViewset(ListModelMixin, CreateModelMixin, UpdateModelMixin, DestroyModelMixin, GenericViewSet):
    serializer_class = AddressSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        address_type = self.request.query_params.get('address_type', None)

        if address_type:
            try:
                address = Address.objects.filter(user=user, address_type=address_type)
                return address
            except Address.DoesNotExist:
                return Address.objects.none()
        else:
            try:
                address = Address.objects.filter(user=user)
                return address
            except Address.DoesNotExist:
                return Address.objects.none()
    def get_object(self):
        user = self.request.user
        address_type = self.request.data.get('address_type', None)
        if address_type:
            try:
                address = Address.objects.get(user=user, address_type=address_type)
                return address
            except Address.DoesNotExist:
                return None
        else:
            return None

    def create(self, request, *args, **kwargs):
        user = request.user
        address_type = request.data.get('address_type')
        if address_type is not None:
            try:
                Address.objects.get(user=user, address_type=address_type)
                return Response({'detail': 'Address type already exists'}, status.HTTP_400_BAD_REQUEST)
            except Address.DoesNotExist:
                return super().create(request, *args, **kwargs)
        return Response({'detail': 'Address type not provided'}, status=status.HTTP_400_BAD_REQUEST)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        # Response(serializer.data, status.HTTP_201_CREATED)
