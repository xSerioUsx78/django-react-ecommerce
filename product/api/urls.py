from django.urls import path
from .views import (
    LatestProductsAPIView, ProductDetailView,
    ProductListAPIView, ProductSearchAPIView
)


urlpatterns = [
    path('latest/', LatestProductsAPIView.as_view(), name='latest-products'),
    path('product/', ProductListAPIView.as_view(), name='product-list'),
    path('search/', ProductSearchAPIView.as_view(), name="product-search"),
    path('detail/<pk>/<slug>/', ProductDetailView.as_view(), name='product-detail')
]
