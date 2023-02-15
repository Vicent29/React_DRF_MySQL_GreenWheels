from django.urls import path
from src.apps.user.views import UserView, UserRegLog, OnlyAdmin,UserTk,ProfileView

urlpatterns = [
    path('user', UserView.as_view({'post': 'createUser'})),
    path('usertk', UserTk.as_view({'get': 'getUserTk'})),
    path('auser', OnlyAdmin.as_view({'get': 'getUsers'})),
    path('user/isadmin', OnlyAdmin.as_view({'get': 'checkadmin'})),
    path('auser/<int:id>', OnlyAdmin.as_view({'delete': 'deleteUser'})),
    path('user/<int:id>', UserView.as_view({'get': 'getOneUser'})),
    path('register', UserRegLog.as_view({'post': 'register'})),
    path('login', UserRegLog.as_view({'post': 'login'})),
    path('logout', UserTk.as_view({'post': 'logout'})),

    path('profile', ProfileView.as_view( {'get': 'getProfiles', 'post': 'createProfile'})),
    path('profile/<int:id>', ProfileView.as_view({'get': 'getOneProfile', 'delete': 'deleteProfile'})),
    
]
