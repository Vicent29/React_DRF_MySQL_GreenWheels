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
            'station': instance.station_id,
            'active': instance.active,
        }

    def getSlotWithoutBike():
        slots = Slot.objects.raw(
            "SELECT * FROM slot_slot sl WHERE NOT EXISTS(SELECT * FROM bike_bike b WHERE b.slot_id=sl.id)")
        serialized = []
        for slot in slots.iterator():
            fields = SlotSerializer.to_slots(slot)
            serialized.append(fields)
        return serialized

    def updateSlot(context, id):
        slot = Slot.objects.get(id=id)
        for key, value in context.items():
            if hasattr(slot, key):
                setattr(slot, key, value)
        slot.save()
        resp_slot = Slot.objects.get(id=id)
        return SlotSerializer.to_slots(resp_slot)
