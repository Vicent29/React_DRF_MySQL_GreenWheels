from django.db import models
from src.apps.core.models import TimestampedModel
from src.apps.slot.models import Slot
from src.apps.user.models import User

# Create your models here.


class IncidentSlot(TimestampedModel, models.Model):

    slot = models.ForeignKey(Slot, on_delete=models.CASCADE, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    desc = models.CharField(max_length=200, blank=True, default="")
    status = models.CharField(max_length=100, blank=True, default="sended")

    class Meta:
        verbose_name_plural = 'ISlots'

    def __str__(self):
        return self.id


class IncidentBike(TimestampedModel, models.Model):

    bike = models.ForeignKey(Slot, on_delete=models.CASCADE, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    desc = models.CharField(max_length=200, blank=True, default="")
    status = models.CharField(max_length=100, blank=True, default="sended")

    class Meta:
        verbose_name_plural = 'IBikes'

    def __str__(self):
        return self.id


class IncidentOther(TimestampedModel, models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    location = models.CharField(max_length=100, blank=True, default="")
    desc = models.CharField(max_length=200, blank=True, default="")
    status = models.CharField(max_length=100, blank=True, default="sended")

    class Meta:
        verbose_name_plural = 'IOthers'

    def __str__(self):
        return self.id
