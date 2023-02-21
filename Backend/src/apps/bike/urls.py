from django.urls import path
from src.apps.bike.views import BikeView, OnlyAdmin

urlpatterns = [
    path('bike', BikeView.as_view( {'get': 'getBikes'})),
    path('bike/<int:id>', BikeView.as_view({'get': 'getOneBike'})),
    path('bikebystation/<int:id>', BikeView.as_view({'get': 'getBikesByStation'})),
    path('abike', OnlyAdmin.as_view( {'post': 'createBike'})), 
    path('abike/<int:id>', OnlyAdmin.as_view({'delete': 'deleteBike'})),
    path('abikestatus/<int:id>', OnlyAdmin.as_view({'put': 'changeStatus'})),
    path('aupdate/<int:id>', OnlyAdmin.as_view( {'put': 'updateBike'})), 

]
