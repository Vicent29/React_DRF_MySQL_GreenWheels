from rest_framework import serializers
from src.apps.profile_user.models import Profile
import json


class ProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = Profile
        fields = ('id', 'user', 'avatar', 'biography')

    def to_profile(instance):
        return {
            'id': instance.id,
            'user': instance.user_id,
            'avatar': instance.avatar,
            'biography': instance.biography,
        }
