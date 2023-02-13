from django.shortcuts import render

from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status, viewsets
from rest_framework.response import Response

from src.apps.incident.models import IncidentBike, IncidentSlot, IncidentOther
from src.apps.incident.serializers import IncBikeSerializer, IncOtherSerializer, IncSlotSerializer

# Create your views here.


class Incident(viewsets.GenericViewSet):

    def createIBike(self, request):
        ibike_data = request.data
        ibike_serializer = IncBikeSerializer(data=ibike_data)
        if (ibike_serializer.is_valid(raise_exception=True)):
            ibike_serializer.save()
        return Response(ibike_serializer.data)

    def createISlot(self, request):
        islot_data = request.data
        islot_serializer = IncSlotSerializer(data=islot_data)
        if (islot_serializer.is_valid(raise_exception=True)):
            islot_serializer.save()
        return Response(islot_serializer.data)

    def createIOther(self, request):
        iother_data = request.data
        iother_serializer = IncOtherSerializer(data=iother_data)
        if (iother_serializer.is_valid(raise_exception=True)):
            iother_serializer.save()
        return Response(iother_serializer.data)


class OnlyAdmin(viewsets.GenericViewSet):
    def getAllIncidentsBikes(self, request):
        iBike = IncidentBike.objects.all()
        ibike_serializer = IncBikeSerializer(iBike, many=True)
        return JsonResponse(ibike_serializer.data, safe=False)

    def getAllIncidentsSlots(self, request):
        iSlot = IncidentSlot.objects.all()
        islot_serializer = IncSlotSerializer(iSlot, many=True)
        return JsonResponse(islot_serializer.data, safe=False)

    def getAllIncidentsOthers(self, request):
        iOther = IncidentOther.objects.all()
        iother_serializer = IncOtherSerializer(iOther, many=True)
        return JsonResponse(iother_serializer.data, safe=False)
