from django.urls import path
from src.apps.profile_user.views import ProfileView

urlpatterns = [
    path('profile', ProfileView.as_view( {'get': 'getProfiles', 'post': 'createProfile'})),
    path('profile/<int:id>', ProfileView.as_view({'get': 'getOneProfile', 'delete': 'deleteProfile'})),
]
