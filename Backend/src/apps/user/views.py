from django.shortcuts import render

from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status, viewsets
from rest_framework.response import Response

from src.apps.user.models import User
from src.apps.user.serializers import UserSerializer
from rest_framework.views import APIView

# Create your views here.
# @api_view(['GET', 'POST', 'DELETE'])

class UserView(viewsets.GenericViewSet):
   def getUsers(self, request):
       user = User.objects.all()
       user_serializer = UserSerializer(user, many=True)
       return JsonResponse(user_serializer.data, safe=False)


   def getOneUser(self, request, id):
       user = User.objects.get(id=id)
       user_serializer = UserSerializer(user, many=False)
       return JsonResponse(user_serializer.data, safe=False)


   def createUser(self, request):
       user_data = request.data
       user_serializer = UserSerializer(data=user_data)
       if (user_serializer.is_valid(raise_exception=True)):
           user_serializer.save()
       return Response(user_serializer.data)


  
   def deleteUser(self, request, id):
       user_data = request.data
       user_serializer = UserSerializer(data=user_data)
       if (user_serializer.is_valid() == False):   
           User.objects.get(id=id).delete()
       return JsonResponse({'message': 'User eliminado Correctamente', "User": user_serializer.data}, status=status.HTTP_204_NO_CONTENT)
