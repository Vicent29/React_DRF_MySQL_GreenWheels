from django.urls import path
from src.apps.station.views import StationView, OnlyAdmin

urlpatterns = [
    path('station', StationView.as_view({'get': 'getStations'})),
    path('station/<int:id>', StationView.as_view({'get': 'getOneStation'})),
    path('stationmap', StationView.as_view({'get': 'getStationsMap'})),
    path('astation', OnlyAdmin.as_view({'post': 'createStation'})),
    path('astation/<int:id>', OnlyAdmin.as_view({'delete': 'deleteStation'})),
    path('aupdate/<str:slug>', OnlyAdmin.as_view({'put': 'updateStation'})),
]
