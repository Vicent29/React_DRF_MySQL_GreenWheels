from rest_framework import serializers
from src.apps.incident.models import IncidentBike, IncidentOther, IncidentSlot
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
