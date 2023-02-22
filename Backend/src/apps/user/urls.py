from django.urls import path
from src.apps.user.views import UserView, UserRegLog, OnlyAdmin,OnlyUser,ProfileView

urlpatterns = [
    path('user', UserView.as_view({'post': 'createUser'})),
    path('usertk', OnlyUser.as_view({'get': 'getUserTk'})),
    path('auser', OnlyAdmin.as_view({'get': 'getUsers'})),
    path('user/isadmin', OnlyAdmin.as_view({'get': 'checkadmin'})),
    path('auser/<int:id>', OnlyAdmin.as_view({'delete': 'deleteUser'})),
    path('user/<int:id>', UserView.as_view({'get': 'getOneUser'})),
    path('register', UserRegLog.as_view({'post': 'register'})),
    path('login', UserRegLog.as_view({'post': 'login'})),
    path('user/update', OnlyUser.as_view({'put': 'updateUser'})),
    path('logout', OnlyUser.as_view({'post': 'logout'})),
    path('allchatid', OnlyAdmin.as_view({'get': 'allchatID'})),
    path('checkid', UserView.as_view({'post': 'checkChatID'})),
    path('astatus/<int:id>', OnlyAdmin.as_view({'put': 'changeStatus'})),

    path('profile', ProfileView.as_view( {'get': 'getProfiles', 'post': 'createProfile'})),
    path('profile/<int:id>', ProfileView.as_view({'get': 'getOneProfile', 'delete': 'deleteProfile'})),
    
]
