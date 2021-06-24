from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from django.shortcuts import get_object_or_404
from .serializers import ProductListSerializer, ProductDetailSerializer
from ..models import Product
from order.models import Order, OrderItem
from .pagination import CustomPageNumberPagination


class LatestProductsAPIView(generics.ListAPIView):
    permissions = (permissions.AllowAny,)
    queryset = Product.objects.all().order_by('-timestamp')[:16]
    serializer_class = ProductListSerializer


class ProductDetailView(APIView):

    permissions = (permissions.IsAuthenticated,)

    def get(self, request, pk, slug, *args, **kwargs):
        obj = get_object_or_404(Product, pk=pk)
        serializer = ProductDetailSerializer(obj, context={'request': request})
        return Response(serializer.data)


class ProductListAPIView(generics.ListAPIView):
    permissions = (permissions.AllowAny,)
    queryset = Product.objects.all().order_by('-timestamp')
    serializer_class = ProductListSerializer
    pagination_class = CustomPageNumberPagination

    def data_is_valid(self, data):
        if data is not None and data != '':
            return True
        return False

    def ordering_distructure(self, o):
        dist = {
            'c': 'price',
            'e': '-price',
            'n': '-timestamp'
        }
        return dist[o]

    def get_queryset(self):
        queryset = super().get_queryset()
        o = self.request.query_params.get('o' or None)
        q = self.request.query_params.get('q' or None)
        avaible = self.request.query_params.get('avaible' or None)
        if self.data_is_valid(o):
            queryset = queryset.order_by(self.ordering_distructure(o))
        if self.data_is_valid(q):
            queryset = queryset.filter(title__icontains=q)
        return queryset


class ProductSearchAPIView(generics.ListAPIView):
    permissions = (permissions.AllowAny,)
    queryset = Product.objects.all().order_by('-timestamp')
    serializer_class = ProductListSerializer

    def data_is_valid(self, data):
        if data is not None and data != '':
            return True
        return False

    def get_queryset(self):
        queryset = super().get_queryset()
        q = self.request.query_params.get('q' or None)
        if self.data_is_valid(q):
            queryset = queryset.filter(title__icontains=q)
        return queryset
