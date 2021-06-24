from django.urls import path
from .views import (
    AddToCartView, CartAPIView,
    IncreaseQuantityAPIView, DecreaseQuantityAPIView,
    RemoveFromCartAPIView, AddressesAPIView,
    AddNewAddressAPIView, SetAddressAsDefaultAPIView,
    DeleteAddressAPIView, UpdateAddressAPIView,
    SetAddressToOrderAPIView
)


urlpatterns = [
    path('add-to-cart/<pk>/<slug>/', AddToCartView.as_view(),
         name='add-to-cart'),
    path('cart/', CartAPIView.as_view(), name='cart'),
    path('increase-quantity/', IncreaseQuantityAPIView.as_view(),
         name='increase-quantity'),
    path('decrease-quantity/', DecreaseQuantityAPIView.as_view(),
         name='decrease-quantity'),
    path('remove-from-cart/', RemoveFromCartAPIView.as_view(),
         name='remove-from-cart'),
    path('addresses/', AddressesAPIView.as_view(),
         name='addresses'),
    path('addresses/add/', AddNewAddressAPIView.as_view(),
         name='addresses-add'),
    path('addresses/set/', SetAddressAsDefaultAPIView.as_view(),
         name='addresses-set'),
    path('addresses/delete/', DeleteAddressAPIView.as_view(),
         name='addresses-delete'),
    path('addresses/update/', UpdateAddressAPIView.as_view(),
         name='addresses-update'),
    path('addresses/set-to-order/', SetAddressToOrderAPIView.as_view(),
         name='addresses-set-to-order') 
]
