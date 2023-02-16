from rest_framework import serializers
from src.apps.notifications.models import Noti
import json
from django.core.serializers import serialize


class NotiSerializer(serializers.ModelSerializer):

    class Meta:
        model = Noti
        fields = ('id', 'user', 'desc', 'type')

    def to_noti(instance):
        return {
            # 'id': instance.id,
            # 'user': instance.user_id,
            'desc': instance.desc,
            'type': instance.type,
        }

    def getNotiUsr(request):
        try:
            notis = Noti.objects.filter(user=request.user.id).order_by('-updated_at')
        except Noti.DoesNotExist:
            return []
        serialized = []
        for noti in notis.iterator():
            fields = NotiSerializer.to_noti(noti)
            serialized.append(fields)
        return serialized
