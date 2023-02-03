from rest_framework import permissions

class IsAdmin(permissions.BasePermission):
    message = 'You are not staff'
    def has_permission(self, request, view):
        return request.user.type == "admin"