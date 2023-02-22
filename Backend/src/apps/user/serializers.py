from rest_framework import serializers
from src.apps.user.models import User, ProfileUsr
from src.apps.notifications.models import Noti


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'uuid', 'first_name', 'last_name',
                  'email', 'is_active', 'type')

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
                    'email or password not correct')

        except User.DoesNotExist:
            return "email not registered"

    def updateUser(current_user, context):
        user = User.objects.get(id=current_user.id)
        if user:
            if 'avatar' in context or 'notis' in context:
                profile = ProfileUsr.objects.get(user_id=user.id)
                if 'avatar' in context:
                    setattr(profile, "avatar", context['avatar'])
                if 'notis' in context:
                    profile.notis = context['notis']
                profile.save()

            if 'email' in context:
                try:
                    usuario = User.objects.get(email=context['email'])
                    if usuario:
                        raise serializers.ValidationError('Email exist')
                except User.DoesNotExist:
                    email_NotExist = True
            if 'password' in context:
                user.set_password(context['password'])
                context['password'] = user.password

            for key, value in context.items():
                if hasattr(user, key):
                    setattr(user, key, value)
        else:
            raise serializers.ValidationError('User not exist')
        user.save()
        user_save = User.objects.get(id=current_user.id)
        profile_save = ProfileUsr.objects.get(user_id=user_save.id)
        user_save.avatar = profile_save.avatar
        user_save.desc = profile_save.biography
        user_save.noti = profile_save.notis
        return UserSerializer.to_user(user_save)

    def checkChatID(context):
        try:
            user = User.objects.get(chatID=context['text'])
        except User.DoesNotExist:
            raise serializers.ValidationError('chatID not connected')
        user.chatID = context['chatID']
        user.save()
        return "User connected"

    def checkChatIDpy(id, text):
        print("entra test")
        try:
            user = User.objects.get(chatID=text)
        except User.DoesNotExist:
            return 'chatID not connected'
        user.chatID = id
        user.save()
        return "User connected"
    

    def changeStatus(id):
        user= User.objects.get(id=id)
        if user.is_active == 1:
            user.is_active = 0
        else:
            user.is_active = 1
        user.save()
        resp_user = User.objects.get(id=id)
        return UserSerializer.to_user_admin(resp_user)


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
