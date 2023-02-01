from django.db import models
from src.apps.bike.models import Bike
from src.apps.user.models import User
from src.apps.core.models import TimestampedModel
import datetime
# Create your models here.

class Rent(TimestampedModel, models.Model):

   bike = models.ForeignKey(Bike, on_delete=models.CASCADE)
   user = models.ForeignKey(User, on_delete=models.CASCADE)
   data_ini = models.DateTimeField(editable=False, default=datetime.datetime.now)
   data_fin = models.DateTimeField(editable=True, default=datetime.datetime.now)
   cost = models.FloatField(max_length=255, blank=True, default=0, null=True)

   class Meta:
       verbose_name = 'rent'
       verbose_name_plural = 'rents'

   def __str__(self):
       return self.id

    
 