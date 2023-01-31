from rest_framework import serializers
from src.apps.bike.models import Bike
import json
from django.core.serializers import serialize


class BikeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Bike
        fields = ('id', 'slug', 'slot', 'status', 'img_bike', 'pfm')

    def to_bikes(instance):
        return {
            'id': instance.id,
            'slug': instance.slug,
            'slot': instance.slot_id,
            'status': instance.status,
            'img_bike': instance.img_bike,
            'pfm': instance.pfm,
        }

    def getBikesByStation(id):
        bikes = Bike.objects.raw(
            "SELECT b.* FROM station_station s INNER JOIN slot_slot sl ON s.id = sl.station_id AND s.id=%s INNER JOIN bike_bike b ON sl.id = b.slot_id AND b.status=true", [id])
        serialized = []
        for bike in bikes.iterator():
            fields = BikeSerializer.to_bikes(bike)
            serialized.append(fields)
        return serialized
