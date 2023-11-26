from django.contrib.auth import get_user_model
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.viewsets import GenericViewSet
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status
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

class AddressUserViewset(CreateModelMixin, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin, GenericViewSet):
    serializer_class = AddressSerializer
    permission_classes = [IsAuthenticated]
    queryset = Address.objects.all()

    def get_object(self):
        user = self.request.user
        address_type = self.request.data.get('address_type', None)

        if address_type is not None:
            try:
                address = Address.objects.get(user=user, address_type=address_type)
                return address
            except Address.DoesNotExist:
                return Response({'detail': 'Address does not exist for this user and type.'}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({'detail': 'Address type not provided'}, status=status.HTTP_400_BAD_REQUEST)
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


class AddressUpdateView(UpdateAPIView):
    permission_classes = (IsAuthenticated, )
    serializer_class = AddressSerializer
    queryset = Address.objects.all()
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        response_data = [serializer.data]
        return Response(response_data, status=HTTP_200_OK)