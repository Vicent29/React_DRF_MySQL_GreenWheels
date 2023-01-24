from django.db import models

# Create your models here.


class Station(models.Model):
    # slug = models.SlugField(max_length=100,unique=True, editable=False)
    name = models.CharField(unique=True, max_length=255,
                            blank=False, default='')
    location = models.CharField(max_length=255, blank=False, default='')

    def __str__(self):
        return str(self.id)
