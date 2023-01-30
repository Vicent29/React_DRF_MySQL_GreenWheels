from rest_framework import serializers
from src.apps.user.models import User
import json
from django.core.serializers import serialize


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'uuid', 'first_name', 'last_name', 'email', 'password', 'is_active', 'type')

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