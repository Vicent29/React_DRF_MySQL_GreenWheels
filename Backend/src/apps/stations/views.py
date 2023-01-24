from django.shortcuts import render

from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status, viewsets

from src.apps.stations.models import Station
from src.apps.stations.serializers import StationSerializer
from rest_framework.views import APIView

# Create your views here.
# @api_view(['GET', 'POST', 'DELETE'])


class StationView(viewsets.GenericViewSet):
    def getStations(self, request):
        station = Station.objects.all()
        station_serializer = StationSerializer(station, many=True)
        return JsonResponse(station_serializer.data, safe=False)

    def getOneStation(self, request, id):
        station = Station.objects.get(id=id)
        station_serializer = StationSerializer(station, many=True)
        return JsonResponse(station_serializer, safe=False)

    def createStation(self, request):
        station_data = JSONParser().parse(request)
        station_serializer = StationSerializer(data=station_data)
        if station_serializer.is_valid():
            station_serializer.save()
            return JsonResponse(station_serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(station_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def deleteStation(self, request, id):
        Station.objects.get(id=id).delete()
        return JsonResponse({'message': 'Eliminada Correctamente'}, status=status.HTTP_204_NO_CONTENT)
