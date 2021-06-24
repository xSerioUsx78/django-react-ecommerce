from django.urls import path, include


app_name = 'product'

urlpatterns = [
    path('api/', include('product.api.urls')),
]
