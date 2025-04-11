from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import get_user_model
from rest_framework import serializers
from django.contrib.auth import authenticate

User = get_user_model()


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = 'email'

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['email'] = serializers.EmailField()
        self.fields.pop('username', None)  # Remove the username field

    def validate(self, attrs):
        email = attrs.get('email', '').lower().strip()
        password = attrs.get('password', '')

        if not email or not password:
            raise serializers.ValidationError(
                'Must include email and password fields')

        user = authenticate(request=self.context.get('request'),
                            email=email,
                            password=password)

        if not user:
            raise serializers.ValidationError(
                'Unable to log in with provided credentials.')

        if not user.is_active:
            raise serializers.ValidationError('User account is disabled.')

        data = super().validate(attrs)

        # You can add additional data to the token response here
        # data['email'] = user.email
        # data['name'] = user.name

        return data


class UserDetailsSerializer(serializers.ModelSerializer):
    delivery_address = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'delivery_address']

    def get_delivery_address(self, obj):
        item = obj.user_details.order_by("address_id").first()
        return item.street_address + ", " + item.city+" " + item.state + ", " + item.country+", "+item.postal_code
