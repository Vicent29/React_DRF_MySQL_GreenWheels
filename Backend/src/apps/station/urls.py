from django.urls import path
from src.apps.station.views import StationView, OnlyAdmin

urlpatterns = [
    path('station', StationView.as_view({'get': 'getStations'})),
    path('station/<int:id>', StationView.as_view({'get': 'getOneStation'})),
    path('astation', OnlyAdmin.as_view({'post': 'createStation'})),
    path('astation/<int:id>', OnlyAdmin.as_view({'delete': 'deleteStation'})),
    path('stationmap', StationView.as_view({'get': 'getStationsMap'})),
    # path('restaurants', GetRestaurants.as_view()),
]
