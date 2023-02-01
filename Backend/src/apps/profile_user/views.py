from django.http.response import JsonResponse
from rest_framework import status, viewsets
from rest_framework.response import Response

from src.apps.profile_user.models import Profile
from src.apps.profile_user.serializers import ProfileSerializer
from rest_framework.views import APIView

# Create your views here.
# @api_view(['GET', 'POST', 'DELETE'])

class ProfileView(viewsets.GenericViewSet):
   def getProfiles(self, request):
       profile = Profile.objects.all()
       profile_serializer = ProfileSerializer(profile, many=True)
       return JsonResponse(profile_serializer.data, safe=False)


   def getOneProfile(self, request, id):
       profile = Profile.objects.get(id=id)
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
           Profile.objects.get(id=id).delete()
       return JsonResponse({'message': 'Profile eliminado Correctamente', "Profile": profile_serializer.data}, status=status.HTTP_204_NO_CONTENT)

