from django.db import models
from src.apps.station.models import Station
from src.apps.core.models import TimestampedModel


# Create your models here.

class Slot(TimestampedModel, models.Model):
   slug = models.SlugField(max_length=100,unique=True, editable=False)
   station = models.ForeignKey(Station, on_delete=models.CASCADE)
   active = models.BooleanField(blank=False, default=True)
   

   class Meta:
       verbose_name_plural = 'Slots'

   def __str__(self):
       return self.id