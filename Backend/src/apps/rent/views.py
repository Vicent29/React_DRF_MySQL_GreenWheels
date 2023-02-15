from django.shortcuts import render

from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.permissions import (
    AllowAny, IsAuthenticatedOrReadOnly, IsAuthenticated, IsAdminUser,)
from src.apps.core.permissions import IsAdmin


from src.apps.rent.models import Rent
from src.apps.rent.serializers import RentSerializer

# Create your views here.
# @api_view(['GET', 'POST', 'DELETE'])


class RentView(viewsets.GenericViewSet):
    permission_classes = [IsAuthenticated,]

    def getOneRent(self, request, id):
        rent = Rent.objects.get(id=id)
        rent_serializer = RentSerializer(rent, many=False)
        return JsonResponse(rent_serializer.data, safe=False)

    # def createRent(self, request):
    #     rent_data = request.data
    #     rent_serializer = RentSerializer(data=rent_data)
    #     if (rent_serializer.is_valid(raise_exception=True)):
    #         rent_serializer.save()
    #     return JsonResponse(rent_serializer.data)

    def createRent(self, request):
        # return JsonResponse("hola", safe=False)
        return JsonResponse(RentSerializer.create_rent(context=request.data, request=request), safe=False)

    def closeRent(self, request, id):
        serializer_context = {
            'id_rent': id,
            'id_bike': request.data['bike'],
            'id_user': request.user.id,
            'id_slot': request.data['slot'],
        }
        serializer = RentSerializer.close_rent(context=serializer_context)
        # return Response(serializer, content_type="application/json")
        return Response(serializer)

    def getRentByUser(self, request):
        return JsonResponse(RentSerializer.getRentByUser(request=request), safe=False)


class OnlyAdmin(viewsets.GenericViewSet):
    permission_classes = [IsAuthenticated, IsAdmin]

    def getRents(self, request):
        rent = Rent.objects.all()
        rent_serializer = RentSerializer(rent, many=True)
        return JsonResponse(rent_serializer.data, safe=False)

    def deleteRent(self, request, id):
        rent_data = request.data
        rent_serializer = RentSerializer(data=rent_data)
        if (rent_serializer.is_valid(raise_exception=True)):
            Rent.objects.get(id=id).delete()
        return JsonResponse({'message': 'Rent eliminada Correctamente', "Rent": rent_serializer.data}, status=status.HTTP_204_NO_CONTENT)
