from django.urls import path
from rest_framework_simplejwt.views import (
    TokenRefreshView,
    TokenVerifyView
)
from .views import RegisterAPIView, GetUserAPIView, CustomTokenObtainPairView

urlpatterns = [
    path('register/', RegisterAPIView.as_view(), name='register'),
    path('user/', GetUserAPIView.as_view(), name='get_user'),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
]