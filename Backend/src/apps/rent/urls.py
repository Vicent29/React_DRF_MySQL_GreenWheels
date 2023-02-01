from django.urls import path
from src.apps.rent.views import RentView

urlpatterns = [
    path('rent', RentView.as_view( {'get': 'getRents', 'post': 'createRent'})),
    path('rent/<int:id>', RentView.as_view({'get': 'getOneRent', 'delete': 'deleteRent' , 'put': 'closeRent'})),
]
