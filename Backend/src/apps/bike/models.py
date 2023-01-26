from django.db import models
from src.apps.slot.models import Slot

# Create your models here.


class Bike(models.Model):
    slug = models.SlugField(max_length=100, unique=True, editable=False)
    slot = models.ForeignKey(Slot, on_delete=models.CASCADE)
    status = models.BooleanField(blank=True, default=True)
    pfm = models.FloatField(max_length=255, blank=True, default=0.05)
    img_bike = models.CharField(max_length=100,blank=True, default='img')

    class Meta:
        verbose_name_plural = 'Bikes'

    def __str__(self):
        return self.id