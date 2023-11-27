from django.urls import path
from .api import views

urlpatterns = [
    path('profiles/', views.UserControleViewSet.as_view({'get': 'list'}), name='profiles-list'),
    path('profiles/<int:pk>/', views.UserControleViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update'}), name='profiles-controle'),
    path('profile/', views.UserProfileViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update'}), name='profile-detail'),
    path('addresses', views.AddressControlViewSet.as_view({'get': 'list'}), name='Address-list'),
    path('addresses/<int:pk>', views.AddressControlViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'}), name='Address-controle'),
    path('address/', views.AddressUserViewset.as_view({'get': 'retrieve', 'post': 'create', 'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'}), name='Address-detail'),
]
