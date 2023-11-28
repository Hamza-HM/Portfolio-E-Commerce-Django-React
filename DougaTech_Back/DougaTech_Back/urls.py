# urls.py

from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.shortcuts import render
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
def index(request):
   return render(request, 'index.html')

@api_view(['GET'])
@ensure_csrf_cookie
@permission_classes([AllowAny])
def get_csrf_token(request):
   return Response(status=status.HTTP_200_OK)

urlpatterns = [
    path('admin/', admin.site.urls),
    #users
    re_path(r'^auth/', include('djoser.urls')),
    re_path(r'^auth/', include('djoser.social.urls')),
    path('', include('djoser.urls.jwt')),
    path('api/users/', include('users.urls')),
    path('api/products/', include('products.api.urls')),
    path('crsf-token/', get_csrf_token, name='csrf-token'),

  # others
]

if settings.DEBUG:
   urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
   urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
   urlpatterns += [re_path(r"^.*", index, name="api-index")]