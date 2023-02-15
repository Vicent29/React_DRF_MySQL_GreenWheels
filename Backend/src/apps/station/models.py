from django.db import models
from src.apps.core.models import TimestampedModel

# Create your models here.

class Station(TimestampedModel, models.Model):
   slug = models.SlugField(max_length=100,unique=True, editable=False)
   name = models.CharField(unique=True, max_length=255, blank=False, default='')
   long = models.FloatField(blank=True, default='-0.608426')
   lat = models.FloatField(blank=True, default='38.821635')
   img = models.CharField(max_length=255, blank=True, default='img.png')
   active = models.BooleanField(blank=True, default=True)

   class Meta:
       verbose_name_plural = 'Stations'

   def __str__(self):
       return self.id