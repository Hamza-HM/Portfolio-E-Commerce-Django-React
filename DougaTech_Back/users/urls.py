from django.urls import path
from .api import views

urlpatterns = [
    path('profiles/', views.UserControleViewSet.as_view({'get': 'list'}), name='profiles-list'),
    path('profiles/<int:pk>/', views.UserControleViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'}), name='profiles-detail'),
    path('profile/', views.UserProfileViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update'}), name='profile-detail'),
]
