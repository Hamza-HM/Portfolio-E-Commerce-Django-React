# from django.contrib.auth import get_user_model
# from rest_framework.viewsets import GenericViewSet
# from rest_framework import status
# from rest_framework.decorators import action

# from rest_framework.mixins import RetriveViewSet, ListModelMixin, UpdateModelMixin
# from rest_framework.response import Response


# from .serializers import UserSerializer

# User = get_user_model()

# class UserViewSet(RetriveViewSet, ListModelMixin, UpdateModelMixin, GenericViewSet):
#     serializer_class = UserSerializer
#     queryset = User.objects.all()
#     lookup_field = 'pk'

#     def get_queryset(self, *args, **kwargs):
#         assert isinstance(self.request.user.id, int)
#         return self.queryset.filter(id=self.request.user.id)
#     @action(detail=False)
#     def me(self, request):
#         serializer = UserSerializer(request.user, context={'request': request})
#         return Response(status.HTTP_200_OK, data=serializer.data)
