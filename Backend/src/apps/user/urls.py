from django.urls import path
from src.apps.user.views import UserView

urlpatterns = [
    path('user', UserView.as_view( {'get': 'getUsers', 'post': 'createUser'})),
    path('user/<int:id>', UserView.as_view({'get': 'getOneUser', 'delete': 'deleteUser'})),
    # path('restaurants', GetRestaurants.as_view()),
]
