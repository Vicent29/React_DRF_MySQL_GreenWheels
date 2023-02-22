from django.urls import path
from src.apps.slot.views import SlotView, OnlyAdmin

urlpatterns = [
    path('slot', SlotView.as_view({'get': 'getSlots'})),
    path('slot/<int:id>', SlotView.as_view({'get': 'getOneSlot'})),
    path('slotnobike', SlotView.as_view({'get': 'getSlotWithoutBike'})),
    path('aslot', OnlyAdmin.as_view({'post': 'createSlot'})),
    path('aslot/<int:id>', OnlyAdmin.as_view({'delete': 'deleteSlot', 'put': 'updateSlot'})),
    # path('restaurants', GetRestaurants.as_view()),
]
