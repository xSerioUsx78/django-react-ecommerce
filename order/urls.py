from django.urls import path, include


app_name = 'order'

urlpatterns = [
    path('api/', include('order.api.urls'))
]
