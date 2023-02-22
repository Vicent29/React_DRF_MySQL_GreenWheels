from django.shortcuts import render

from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import serializers
from rest_framework import status, viewsets
from rest_framework.exceptions import NotFound
from rest_framework.response import Response
from rest_framework.permissions import (
    AllowAny, IsAuthenticatedOrReadOnly, IsAuthenticated, IsAdminUser,)
from src.apps.core.permissions import IsAdmin

from src.apps.user.models import User, ProfileUsr
from src.apps.user.serializers import UserSerializer, ProfileSerializer
from rest_framework.views import APIView

# Create your views here.
# @api_view(['GET', 'POST', 'DELETE'])


def checkChatIDpy(id, text):
    return UserSerializer.checkChatIDpy(id, text)


class UserView(viewsets.GenericViewSet):
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

    def checkChatID(self, request):
        return JsonResponse(UserSerializer.checkChatID(context=request.data), safe=False)


class OnlyUser(viewsets.GenericViewSet):
    permission_classes = [IsAuthenticated]

    def getUserTk(self, request):
        request.user = UserSerializer.getUserTk(request.user.id)
        return JsonResponse(request.user, safe=False)

    def logout(self, request):
        if request.user:
            request.user = None
        return Response("Logout Backend user success")

    def updateUser(self, request):
        current_user = request.user
        update_data = request.data
        serializer_user = UserSerializer.updateUser(current_user, update_data)
        return Response(serializer_user)


class OnlyAdmin(viewsets.GenericViewSet):
    permission_classes = [IsAuthenticated, IsAdmin]

    def checkadmin(self, request):
        return JsonResponse(UserSerializer.to_user_admin(request.user))

    def getUsers(self, request):
        user = User.objects.all()
        user_serializer = UserSerializer(user, many=True)
        return JsonResponse(user_serializer.data, safe=False)

    def deleteUser(self, request, id):
        user_data = request.data
        user_serializer = UserSerializer(data=user_data)
        if (user_serializer.is_valid() == False):
            User.objects.get(id=id).delete()
        return JsonResponse({'message': 'User eliminado Correctamente', "User": user_serializer.data}, status=status.HTTP_204_NO_CONTENT)

    def allchatID(self, request):
        return Response(UserSerializer.allchatID())
    
    def changeStatus(self, request, id):
        serializer_user = UserSerializer.changeStatus(id)
        return Response(serializer_user)


class UserRegLog(viewsets.GenericViewSet):
    # permission_classes = (AllowAny)
    serializer_class = UserSerializer

    def register(self, request):

        email = request.data['email']
        password = request.data['password_one']
        first_name = request.data['first_name']
        last_name = request.data['last_name']

        serializer_context = {
            'email': email,
            'password': password,
            'first_name': first_name,
            'last_name': last_name
        }

        serializer = UserSerializer.register(serializer_context)
        return Response(serializer, status=status.HTTP_200_OK)

    def login(self, request):
        permission_classes = (AllowAny,)

        email = request.data['email']
        password = request.data['password']

        serializer_context = {
            'email': email,
            'password': password,
        }

        serializer = UserSerializer.login(serializer_context)
        return Response(serializer, status=status.HTTP_200_OK)


class ProfileView(viewsets.GenericViewSet):
    def getProfiles(self, request):
        profile = ProfileUsr.objects.all()
        profile_serializer = ProfileSerializer(profile, many=True)
        return JsonResponse(profile_serializer.data, safe=False)

    def getOneProfile(self, request, id):
        profile = ProfileUsr.objects.get(id=id)
        profile_serializer = ProfileSerializer(profile, many=False)
        return JsonResponse(profile_serializer.data, safe=False)

    def createProfile(self, request):
        profile_data = request.data
        profile_serializer = ProfileSerializer(data=profile_data)
        if (profile_serializer.is_valid(raise_exception=True)):
            profile_serializer.save()
        return Response(profile_serializer.data)



    def deleteProfile(self, request, id):
        profile_data = request.data
        profile_serializer = ProfileSerializer(data=profile_data)
        if (profile_serializer.is_valid() == False):
            ProfileUsr.objects.get(id=id).delete()
        return JsonResponse({'message': 'Profile eliminado Correctamente', "Profile": profile_serializer.data}, status=status.HTTP_204_NO_CONTENT)
