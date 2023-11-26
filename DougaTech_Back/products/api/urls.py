from django.urls import path
from . import views

urlpatterns = [
    path('items/', views.ItemView.as_view({'get': 'list'}), name='item-list'),
    path('items/<int:pk>/', views.ItemView.as_view({'get': 'retrieve'}), name='item-retrieve'),
    path('coupons/', views.CouponView.as_view(), name='coupon-retrieve'),
    path('categories/', views.CategoryView.as_view(), name='category-list'),
    path('add-to-cart/', views.AddToCart.as_view(), name='add-to-cart'),
    path('update-quantity/', views.OrderQuantityUpdateView.as_view(), name='update-quantity'),
    path('order-summary/', views.OrderDetailView.as_view(), name='order-summary'),
    path('order-items/<int:pk>/delete/', views.OrderItemDeleteView.as_view(), name='del-order-item'),
    path('payment/', views.PaymentView.as_view(), name='payment'),
    path('countries/', views.CountryListView.as_view(), name='country-list')

]
