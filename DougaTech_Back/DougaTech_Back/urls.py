# urls.py

from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.shortcuts import render

def index(request):
   return render(request, 'index.html')

urlpatterns = [
    path('admin/', admin.site.urls),
    #users
    re_path(r'^auth/', include('djoser.urls')),
    path('', include('djoser.urls.jwt')),
    path('api/users/', include('users.urls')),
    path('api/products/', include('products.api.urls')),
    re_path(r"^.*", index, name="api-index")
  # others
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
