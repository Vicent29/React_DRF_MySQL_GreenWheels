from rest_framework import serializers
from src.apps.user.models import User, ProfileUsr
from src.apps.notifications.models import Noti


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'uuid', 'first_name', 'last_name',
                  'email', 'password', 'is_active', 'type')

    def to_user(instance):
        return {
            'user': {
                'email': instance.email,
                'first_name': instance.first_name,
                'last_name': instance.last_name,
                'is_active': instance.is_active,
                'type': instance.type,
                'avatar': instance.avatar,
                'desc': instance.desc,
                'noti': instance.noti
            },
            'token': instance.token,
            'rftoken': instance.refresh_token,
        }

    def to_user_admin(instance):
        return {
            'first_name': instance.first_name,
            'last_name': instance.last_name,
            'email': instance.email,
            'is_active': instance.is_active,
            'type': instance.type,
        }

    def getUserTk(context):
        user = User.objects.get(id=context)
        if user:
            profile = ProfileUsr.objects.get(user_id=user.id)
            user.avatar = profile.avatar
            user.desc = profile.biography
            user.noti = profile.notis
        return UserSerializer.to_user(user)

    def allchatID():
        chat_ids = User.objects.filter(
            chatID__gt="").values_list('chatID', flat=True)
        return chat_ids

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
        if user:
            data_profile_serialized = ProfileSerializer(data={'user': user.id})
            if (data_profile_serialized.is_valid(raise_exception=True)):
                profile = data_profile_serialized.save()
                user.avatar = profile.avatar
                user.desc = profile.biography
                user.noti = profile.notis
        return UserSerializer.to_user(user)

    def login(context):

        email = context['email']
        password = context['password']

        try:
            user = User.objects.get(email=email)
            if user:
                profile = ProfileUsr.objects.get(user_id=user.id)
                user.avatar = profile.avatar
                user.desc = profile.biography
                user.noti = profile.notis
            if user.check_password(password):
                return UserSerializer.to_user(user)
            else:
                raise serializers.ValidationError(
                    'email or password not correct'
                )

        except User.DoesNotExist:
            return "email not registered"


class ProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProfileUsr
        fields = ('id', 'user', 'avatar', 'biography')

    def to_profile(instance):
        return {
            'id': instance.id,
            'user': instance.user_id,
            'avatar': instance.avatar,
            'biography': instance.biography,
        }
