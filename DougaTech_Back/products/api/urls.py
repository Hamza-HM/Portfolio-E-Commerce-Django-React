from django.urls import path
from . import views
urlpatterns = [
    path('items/', views.ItemView.as_view({'get': 'list'}), name='item-list'),
    path('items/<int:pk>/', views.ItemView.as_view({'get': 'retrieve'}), name='item-retrieve'),
    path('coupons/', views.CouponView.as_view(), name='coupon-retrieve'),
    path('categories/', views.CategoryView.as_view(), name='category-list'),
    path('add_to_cart', views.AddToCart.as_view(), name='add-to-cart'),

]
