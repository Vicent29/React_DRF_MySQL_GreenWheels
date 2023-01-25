from django.urls import path
from src.apps.stations.views import StationView

urlpatterns = [
    path('station', StationView.as_view( {'get': 'getStations', 'post': 'createStation'})),
    path('station/<int:id>', StationView.as_view({'get': 'getOneStation', 'delete': 'deleteStation'})),
    # path('restaurants', GetRestaurants.as_view()),
]
