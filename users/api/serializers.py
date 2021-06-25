from rest_framework import serializers
from django.core import exceptions
from django.contrib.auth import (
    authenticate, get_user_model, password_validation
)
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

User = get_user_model()


class UserSerilizer(serializers.ModelSerializer):

    cart_count = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'cart_count')

    def get_cart_count(self, obj):
        order_qs = obj.orders.filter(ordered=False)
        if order_qs.exists():
            order = order_qs[0]
            return order.get_cart_items_count()
        return 0


class RegisterSerilizer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, data):
        # here data has all the fields which have validated values
        # so we can create a User instance out of it
        user = User(**data)

        # get the password from the data
        password = data.get('password')

        errors = dict()
        try:
            # validate the password and catch the exception
            password_validation.validate_password(password=password, user=User)

        # the exception raised here is different than serializers.ValidationError
        except exceptions.ValidationError as e:
            errors['password'] = list(e.messages)

        if errors:
            raise serializers.ValidationError(errors)

        return super(RegisterSerilizer, self).validate(data)

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['username'],
            validated_data['email'],
            validated_data['password']
        )

        return user


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):
        # The default result (access/refresh tokens)
        data = super(CustomTokenObtainPairSerializer, self).validate(attrs)
        # Custom data you want to include
        data.update({
            'user': {
                'username': self.user.username,
                'email': self.user.email,
                'id': self.user.id,
            },
            'cart_count': self.get_cart_count()
        })
        # and everything else you want to send in the response
        return data

    def get_cart_count(self):
        order_qs = self.user.orders.filter(ordered=False)
        if order_qs.exists():
            order = order_qs[0]
            return order.get_cart_items_count()
        return 0
