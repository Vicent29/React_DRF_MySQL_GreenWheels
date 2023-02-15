from django.urls import path
from src.apps.rent.views import RentView, OnlyAdmin

urlpatterns = [
    path('rent', RentView.as_view({'get': 'getRentByUser','post': 'createRent'})),
    path('rent/<int:id>', RentView.as_view({'get': 'getOneRent', 'put': 'closeRent'})),
    path('arent', OnlyAdmin.as_view({'get': 'getRents'})),
    path('arent/<int:id>', OnlyAdmin.as_view({'delete': 'deleteRent'})),

]
