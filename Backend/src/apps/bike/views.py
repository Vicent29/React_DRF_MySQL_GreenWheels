from django.shortcuts import render


from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status, viewsets
from rest_framework.response import Response

from src.apps.bike.models import Bike
from src.apps.bike.serializers import BikeSerializer

from rest_framework.permissions import (IsAuthenticated)
from src.apps.core.permissions import IsAdmin

# Create your views here.
# @api_view(['GET', 'POST', 'DELETE'])


class BikeView(viewsets.GenericViewSet):
    def getBikes(self, request):
        bike = Bike.objects.all()
        bike_serializer = BikeSerializer(bike, many=True)
        return JsonResponse(bike_serializer.data, safe=False)

    def getOneBike(self, request, id):
        bike = Bike.objects.get(id=id)
        bike_serializer = BikeSerializer(bike, many=False)
        return JsonResponse(bike_serializer.data, safe=False)

    def getBikesByStation(self, request, id):
        serialized = BikeSerializer.getBikesByStation(id)
        return JsonResponse(serialized, safe=False)

class OnlyAdmin(viewsets.GenericViewSet):
    permission_classes = [IsAuthenticated, IsAdmin]

    def createBike(self, request):
        bike_data = request.data
        bike_serializer = BikeSerializer(data=bike_data)
        if (bike_serializer.is_valid(raise_exception=True)):
            bike_serializer.save()
        return Response(bike_serializer.data)
    
    def changeStatus(self, request, id):
        serializer_bike = BikeSerializer.updateStatus(id)
        return Response(serializer_bike)
    
    def updateBike(self, request, id):
        serializer_bike = BikeSerializer.updateBike(request.data, id)
        return Response(serializer_bike)

    def deleteBike(self, request, id):
        bike_data = request.data
        bike_serializer = BikeSerializer(data=bike_data)
        if (bike_serializer.is_valid(raise_exception=True)):
            Bike.objects.get(id=id).delete()
        return JsonResponse({'message': 'Bici eliminada Correctamente', "Bike": bike_serializer.data}, status=status.HTTP_204_NO_CONTENT)