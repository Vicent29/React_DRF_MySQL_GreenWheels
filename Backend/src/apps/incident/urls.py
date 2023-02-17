from django.urls import path
from src.apps.incident.views import OnlyAdmin, Incident

urlpatterns = [
    path('aIncBikes', OnlyAdmin.as_view({'get': 'getAllIncidentsBikes'})),
    path('aIncSlots', OnlyAdmin.as_view({'get': 'getAllIncidentsSlots'})),
    path('aIncOthers', OnlyAdmin.as_view({'get': 'getAllIncidentsOthers'})),
    path('IncBikes', Incident.as_view({'post': 'createIBike'})),
    path('IncSlots', Incident.as_view({'post': 'createISlot'})),
    path('IncOthers', Incident.as_view({'post': 'createIOther'})),
    path('allInc', OnlyAdmin.as_view({'get': 'getAllIncidents'})),
    path('closeInc', OnlyAdmin.as_view({'post': 'closeIncidence'})),
    
    # path('restaurants', GetRestaurants.as_view()),
]
