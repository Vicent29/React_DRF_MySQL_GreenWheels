from django.shortcuts import render


from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status, viewsets
from rest_framework.response import Response


from src.apps.station.models import Station
from src.apps.station.serializers import StationSerializer
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
       station_serializer = StationSerializer(station, many=False)
       return JsonResponse(station_serializer.data, safe=False)


   def createStation(self, request):
       station_data = request.data
       station_serializer = StationSerializer(data=station_data)
       if (station_serializer.is_valid(raise_exception=True)):
           station_serializer.save()
       return Response(station_serializer.data)


  
   def deleteStation(self, request, id):
       Station.objects.get(id=id).delete()
       return JsonResponse({'message': 'Eliminada Correctamente'}, status=status.HTTP_204_NO_CONTENT)