from rest_framework import serializers
from src.apps.user.models import User
import json
from django.core.serializers import serialize

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'uuid', 'first_name', 'last_name',
                  'email', 'password', 'is_active', 'type')

    def to_users(instance):
        return {
            'id': instance.id,
            'uuid': instance.uuid,
            'first_name': instance.first_name,
            'last_name': instance.last_name,
            'email': instance.email,
            'password': instance.password,
            'is_active': instance.is_active,
            'type': instance.type,
        }

    def register(context):

        email = context['email']
        password = context['password']
        first_name = context['first_name']
        last_name = context['last_name']

        try:
            user = User.objects.get(email=email)

            raise serializers.ValidationError(
                'Email exist.'
            )

        except User.DoesNotExist:
            user = User.objects.create_user(
                first_name, last_name, email, password)

        return {
            'user': {
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'is_active': user.is_active,
                'type': user.type
            },
            'token': user.token,
            'rftoken': user.refresh_token,
        }

    def login(context):

        email = context['email']
        password = context['password']

        try:
            user = User.objects.get(email=email)
            if user.check_password(password):

                return {
                    'user': {
                        'email': user.email,
                        'first_name': user.first_name,
                        'last_name': user.last_name,
                        'is_active': user.is_active,
                        'type': user.type
                    },
                    'token': user.token,
                    'rftoken': user.refresh_token,
                }
            else:
                return "email or password not correct"

        except User.DoesNotExist:
            return "email not registered"
