from django.urls import path
from src.apps.bike.views import BikeView

urlpatterns = [
    path('bike', BikeView.as_view( {'get': 'getBikes', 'post': 'createBike'})),
    path('bike/<int:id>', BikeView.as_view({'get': 'getOneBike', 'delete': 'deleteBike'})),
    # path('restaurants', GetRestaurants.as_view()),
]
