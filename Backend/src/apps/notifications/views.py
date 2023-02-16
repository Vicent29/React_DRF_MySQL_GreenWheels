from django.shortcuts import render

from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status, viewsets
from rest_framework.response import Response

from src.apps.notifications.models import Noti
from src.apps.notifications.serializers import NotiSerializer

from rest_framework.permissions import (
    AllowAny, IsAuthenticatedOrReadOnly, IsAuthenticated, IsAdminUser,)
from src.apps.core.permissions import IsAdmin

# Create your views here.


class NotiUser(viewsets.GenericViewSet):
    permission_classes = [IsAuthenticated,]

    def getNotiUsr(self, request):
        return JsonResponse(NotiSerializer.getNotiUsr(request=request), safe=False)


class OnlyAdmin(viewsets.GenericViewSet):
    permission_classes = [IsAuthenticated, IsAdmin]

    def getNotis(self, request):
        bike = Noti.objects.all()
        bike_serializer = NotiSerializer(bike, many=True)
        return JsonResponse(bike_serializer.data, safe=False)

    def createNoti(self, request):
        return Response("hello")
