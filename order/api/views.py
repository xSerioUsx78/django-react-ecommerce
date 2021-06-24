from django.shortcuts import get_object_or_404
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from ..models import Order, OrderItem, Address
from .serializers import OrderSerializer, AddressSerializer


class AddToCartView(APIView):

    permissions = (permissions.IsAuthenticated,)

    def post(self, request, pk, slug, *args, **kwargs):
        color = self.request.data.get('color' or None)
        size = self.request.data.get('size' or None)
        variations = []
        if color is not None:
            variations.append(color)
        if size is not None:
            variations.append(size)
        user = self.request.user
        order, created = Order.objects.get_or_create(user=user, ordered=False)
        order_item_qs = OrderItem.objects.filter(order=order,
                                                 product_id=pk,
                                                 order__ordered=False
                                                 )
        if len(variations) == 2:
            order_item_qs = order_item_qs.filter(
                variation__id=variations[0],
            ).filter(variation__id=variations[1])
        elif len(variations) == 1:
            order_item_qs = order_item_qs.filter(
                variation__id=variations[0])
        if order_item_qs.exists():
            order_item = order_item_qs[0]
            order_item.quantity += 1
            order_item.save()
        else:
            order_item = OrderItem.objects.create(
                order=order, product_id=pk
            )
            order_item.variation.add(*variations)
        return Response({}, status=status.HTTP_201_CREATED)


class CartAPIView(generics.ListAPIView):
    permissions = (permissions.IsAuthenticated,)
    serializer_class = OrderSerializer
    queryset = Order.objects.filter(ordered=False)

    def get_queryset(self):
        queryset = super().get_queryset().filter(user=self.request.user)
        return queryset


class IncreaseQuantityAPIView(APIView):

    permissions = (permissions.IsAuthenticated,)

    def post(self, *args, **kwargs):
        user = self.request.user
        pk = self.request.data.get('pk' or None)
        order_item = get_object_or_404(
            OrderItem, order__user=user, pk=pk, order__ordered=False)
        order_item.quantity += 1
        order_item.save()
        data = {
            'get_total_price': order_item.get_total_price(),
            'get_total_order_price': order_item.order.get_total_price(),
            'get_total_fianl_price': order_item.order.get_total_fianl_price(),
            'get_final_amount': order_item.order.get_final_amount()
        }
        return Response(data, status=status.HTTP_200_OK)


class DecreaseQuantityAPIView(APIView):

    permissions = (permissions.IsAuthenticated,)

    def post(self, *args, **kwargs):
        user = self.request.user
        pk = self.request.data.get('pk' or None)
        order_item = get_object_or_404(
            OrderItem, order__user=user, pk=pk, order__ordered=False)
        if order_item.quantity <= 1:
            return Response({}, status=status.HTTP_400_BAD_REQUEST)
        order_item.quantity -= 1
        order_item.save()
        data = {
            'get_total_price': order_item.get_total_price(),
            'get_total_order_price': order_item.order.get_total_price(),
            'get_total_fianl_price': order_item.order.get_total_fianl_price(),
            'get_final_amount': order_item.order.get_final_amount()
        }
        return Response(data, status=status.HTTP_200_OK)


class RemoveFromCartAPIView(APIView):

    permissions = (permissions.IsAuthenticated,)

    def post(self, *args, **kwargs):
        user = self.request.user
        pk = self.request.data.get('pk' or None)
        order_item = get_object_or_404(
            OrderItem, order__user=user, pk=pk, order__ordered=False)
        order_item.delete()
        data = {
            'get_total_order_price': order_item.order.get_total_price(),
            'get_total_fianl_price': order_item.order.get_total_fianl_price(),
            'get_final_amount': order_item.order.get_final_amount()
        }
        return Response(data, status=status.HTTP_200_OK)


class AddressesAPIView(generics.ListAPIView):
    permissions = (permissions.IsAuthenticated,)
    serializer_class = AddressSerializer
    queryset = Address.objects.all()

    def get_queryset(self):
        queryset = super().get_queryset().filter(
            user=self.request.user).order_by('-default')
        return queryset


class AddNewAddressAPIView(APIView):

    permissions_classes = (permissions.IsAuthenticated,)

    def post(self, *args, **kwargs):
        serializer = AddressSerializer(data=self.request.data)
        user = self.request.user
        if serializer.is_valid():
            address = user.addresses.filter(default=True)
            if address.exists():
                address.update(default=False)
            serializer.save(user=user, default=True)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SetAddressAsDefaultAPIView(APIView):

    permissions_classes = (permissions.IsAuthenticated,)

    def post(self, *args, **kwargs):

        user = self.request.user
        pk = self.request.data.get('pk' or None)
        if pk is not None and pk != '':
            default_address = Address.objects.filter(
                user=user, default=True).update(default=False)
            address = get_object_or_404(Address, user=user, pk=pk)
            address.default = True
            address.save()
            return Response({}, status=status.HTTP_200_OK)
        return Response({'error': 'no object provided'}, status=status.HTTP_400_BAD_REQUEST)


class DeleteAddressAPIView(APIView):

    permissions_classes = (permissions.IsAuthenticated,)

    def post(self, *args, **kwargs):

        user = self.request.user
        pk = self.request.data.get('pk' or None)
        if pk is not None and pk != '':
            if user.addresses.count() > 1:
                address = get_object_or_404(Address, user=user, pk=pk)
                address.delete()
                first_address_pk = None
                if address.default:
                    first_address = user.addresses.first()
                    first_address.default = True
                    first_address.save()
                    first_address_pk = first_address.pk
                return Response({'pk': first_address_pk}, status=status.HTTP_200_OK)
            return Response({"error": "You only have one address, you can't delete that"},
                            status=status.HTTP_400_BAD_REQUEST)
        return Response({'error': 'no object provided'}, status=status.HTTP_400_BAD_REQUEST)


class UpdateAddressAPIView(APIView):

    permissions_classes = (permissions.IsAuthenticated,)

    def post(self, *args, **kwargs):
        user = self.request.user
        pk = self.request.data.get('id' or None)
        obj = get_object_or_404(Address, user=user, pk=pk)
        serializer = AddressSerializer(obj, data=self.request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SetAddressToOrderAPIView(APIView):

    permissions_classes = (permissions.IsAuthenticated,)

    def post(self, *args, **kwargs):

        user = self.request.user

        default_address_qs = user.addresses.filter(default=True)
        if default_address_qs.exists():
            default_address = default_address_qs[0]
            order_qs = user.orders.filter(ordered=False)
            if order_qs.exists():
                order = order_qs[0]
                order.address = default_address
                order.save()
                return Response({}, status=status.HTTP_200_OK)
            return Response({'error': 'No active order exists'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'error': 'No default address exists'}, status=status.HTTP_400_BAD_REQUEST)
