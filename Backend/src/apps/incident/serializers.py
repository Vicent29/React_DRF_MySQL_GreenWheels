from rest_framework import serializers
from src.apps.incident.models import IncidentBike, IncidentOther, IncidentSlot
from src.apps.user.models import ProfileUsr, User
from src.apps.notifications.models import Noti
from src.apps.notifications.serializers import NotiSerializer
import json
from django.core.serializers import serialize


class IncBikeSerializer(serializers.ModelSerializer):

    class Meta:
        model = IncidentBike
        fields = ('id', 'user', 'bike', 'desc')


class IncSlotSerializer(serializers.ModelSerializer):

    class Meta:
        model = IncidentSlot
        fields = ('id', 'user', 'slot', 'desc')


class IncOtherSerializer(serializers.ModelSerializer):

    class Meta:
        model = IncidentOther
        fields = ('id', 'user', 'location', 'desc')


class IncidentsSerializer(serializers.ModelSerializer):

    def to_slot_inc(instance):
        return {
            'id': instance.id,
            'slot': instance.slot,
            'user': instance.user,
            'desc': instance.desc
        }

    def to_bike_inc(instance):
        return {
            'id': instance['id'],
            'bike': instance['bike'],
            'user': instance['user'],
            'desc': instance['desc']
        }

    def to_other_inc(instance):
        return {
            'id': instance.id,
            'user': instance.user,
            'location': instance.location,
            'desc': instance.desc
        }

    def getAllIncidents():
        iBikes = IncidentBike.objects.filter(status__gt="ended")
        ibike_serializer = IncBikeSerializer(iBikes, many=True)
        serialized = []
        for bike in ibike_serializer.data:
            # fields = IncidentsSerializer.to_bike_inc(bike)
            serialized.append(bike)

        iSlots = IncidentSlot.objects.filter(status__gt="ended")
        islots_serializer = IncSlotSerializer(iSlots, many=True)
        for slot in islots_serializer.data:
            # fields = IncidentsSerializer.to_slot_inc(slot)
            serialized.append(slot)

        iothers = IncidentOther.objects.filter(status__gt="ended")
        iothers_serializer = IncOtherSerializer(iothers, many=True)
        for other in iothers_serializer.data:
            # fields = IncidentsSerializer.to_other_inc(other)
            serialized.append(other)
        return serialized

    def closeIncidence(context):
        if context['type'] == "bike":
            inc = IncidentBike.objects.get(id=context['id'])
        elif context['type'] == "slot":
            inc = IncidentSlot.objects.get(id=context['id'])
        elif context['type'] == "other":
            inc = IncidentOther.objects.get(id=context['id'])
        inc.status = "ended"
        inc.save()

        prf = ProfileUsr.objects.get(id=context['user'])
        prf.notis = prf.notis+1
        prf.save()

        context['type'] = ""
        noti = NotiSerializer(data=context)
        noti.id = None
        if (noti.is_valid(raise_exception=True)):
            noti.save()

        usr = User.objects.get(id=context['user'])
        return {'chatID': usr.chatID, 'desc': context['desc']}
