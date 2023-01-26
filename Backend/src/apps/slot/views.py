from django.shortcuts import render


from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status, viewsets
from rest_framework.response import Response


from src.apps.slot.models import Slot
from src.apps.slot.serializers import SlotSerializer
from rest_framework.views import APIView


# Create your views here.
# @api_view(['GET', 'POST', 'DELETE'])

class SlotView(viewsets.GenericViewSet):
   def getSlots(self, request):
       slot = Slot.objects.all()
       slot_serializer = SlotSerializer(slot, many=True)
       return JsonResponse(slot_serializer.data, safe=False)


   def getOneSlot(self, request, id):
       slot = Slot.objects.get(id=id)
       slot_serializer = SlotSerializer(slot, many=False)
       return JsonResponse(slot_serializer.data, safe=False)


   def createSlot(self, request):
       slot_data = request.data
       slot_serializer = SlotSerializer(data=slot_data)
       if (slot_serializer.is_valid(raise_exception=True)):
           slot_serializer.save()
       return Response(slot_serializer.data)


  
   def deleteSlot(self, request, id):
       Slot.objects.get(id=id).delete()
       return JsonResponse({'message': 'Eliminada Correctamente'}, status=status.HTTP_204_NO_CONTENT)