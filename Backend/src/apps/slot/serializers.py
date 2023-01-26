from rest_framework import serializers
from src.apps.slot.models import Slot
import json
from django.core.serializers import serialize


class SlotSerializer(serializers.ModelSerializer):

    class Meta:
        model = Slot
        fields = ('id', 'slug', 'station', 'active')

    def to_slots(instance):
        return {
            'id': instance.id,
            'slug': instance.slug,
            'station': instance.station,
            'active': instance.active,
        }
    
