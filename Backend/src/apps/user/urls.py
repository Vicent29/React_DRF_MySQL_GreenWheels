from django.urls import path
from src.apps.user.views import UserView, UserRegLog

urlpatterns = [
    path('user', UserView.as_view({'get': 'getUsers', 'post': 'createUser'})),
    path('user/<int:id>',
         UserView.as_view({'get': 'getOneUser', 'delete': 'deleteUser'})),
    path('register', UserRegLog.as_view({'post': 'register'})),
    # path('login', UserRegLog.as_view({'post': 'login'}))
    # path('restaurants', GetRestaurants.as_view()),
]
