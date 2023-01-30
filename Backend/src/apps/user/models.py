from django.db import models
from src.apps.core.models import TimestampedModel

# Create your models here.

class User(TimestampedModel, models.Model):
   uuid = models.CharField(max_length=36,unique=True, editable=False)
   first_name = models.CharField(max_length=30, blank=True)
   last_name= models.CharField(max_length=30, blank=True)
   email = models.EmailField(unique=True, blank=False)
   password = models.CharField(max_length=30, blank=False)
   is_active= models.BooleanField(blank=True, default=True)
   type= models.CharField(max_length=30, blank=True, default="client")

   class Meta:
       verbose_name_plural = 'Users'

   def __str__(self):
       return self.id
