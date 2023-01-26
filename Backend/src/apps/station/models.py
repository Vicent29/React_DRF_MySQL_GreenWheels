from django.db import models

# Create your models here.

class Station(models.Model):
   slug = models.SlugField(max_length=100,unique=True, editable=False)
   name = models.CharField(unique=True, max_length=255, blank=False, default='')
   long = models.IntegerField(blank=True, default='10')
   lat = models.IntegerField(blank=True, default='11')
   img = models.CharField(max_length=255, blank=True, default='img.png')

   class Meta:
       verbose_name_plural = 'Stations'

   def __str__(self):
       return self.id