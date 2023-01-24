from rest_framework import serializers
from src.apps.stations.models import Station


class StationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Station
        fields = ('id',
                  'name',
                  'location')
