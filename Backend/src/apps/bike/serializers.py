from rest_framework import serializers
from src.apps.bike.models import Bike
import json
from django.core.serializers import serialize


class BikeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Bike
        fields = ('id', 'slug', 'slot', 'status', 'img_bike', 'pfm')

    def to_stations(instance):
        return {
            'id': instance.id,
            'slug': instance.slug,
            'slot': instance.id_slot,
            'status': instance.status,
            'img_bike': instance.img_bike,
            'pfm': instance.pfm,
        }
    
