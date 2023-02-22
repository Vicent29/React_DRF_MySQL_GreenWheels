from rest_framework import serializers
from src.apps.station.models import Station
import json
from django.core.serializers import serialize


class StationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Station
        fields = ('id', 'slug', 'name', 'long', 'lat', 'img')

    def to_stations(instance):
        return {
            'id': instance.id,
            'slug': instance.slug,
            'name': instance.name,
            'long': instance.long,
            'lat': instance.lat,
            'img': instance.img,
            'bikes': instance.bikes,
        }
    def to_station(instance):
        return {
            'id': instance.id,
            'slug': instance.slug,
            'name': instance.name,
            'long': instance.long,
            'lat': instance.lat,
            'img': instance.img,
        }

    def getStationsMapS():
        stations = Station.objects.raw(
            "SELECT s.*, COUNT(b.id) AS bikes FROM station_station s LEFT JOIN slot_slot sl ON s.id = sl.station_id LEFT JOIN bike_bike b ON sl.id = b.slot_id AND b.status=true GROUP BY s.id")
        serialized = []
        for station in stations.iterator():
            fields = StationSerializer.to_stations(station)
            serialized.append(fields)
        return serialized

    def updateStation(context, slug):
        print()
        station= Station.objects.get(slug=slug)
        for key, value in context.items():
                if hasattr(station, key):
                    setattr(station, key, value)
        station.save()
        resp_station = Station.objects.get(slug=slug)
        return StationSerializer.to_station(resp_station)
