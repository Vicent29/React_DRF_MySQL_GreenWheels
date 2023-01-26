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
        }
    
