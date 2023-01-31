from django.urls import path
from src.apps.slot.views import SlotView

urlpatterns = [
    path('slot', SlotView.as_view( {'get': 'getSlots', 'post': 'createSlot'})),
    path('slot/<int:id>', SlotView.as_view({'get': 'getOneSlot', 'delete': 'deleteSlot'})),
    path('slotnobike', SlotView.as_view( {'get': 'getSlotWithoutBike'})),
    # path('restaurants', GetRestaurants.as_view()),
]
