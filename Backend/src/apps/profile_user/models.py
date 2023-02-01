from django.db import models
from src.apps.user.models import User
from src.apps.core.models import TimestampedModel

# Create your models here.


class Profile(TimestampedModel, models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    avatar = models.CharField(max_length=100,blank=True, default='https://i.postimg.cc/W41QygPj/descarga.png')
    biography = models.CharField(max_length=100,blank=True, default='User active with rent bikes')

    class Meta:
        verbose_name_plural = 'Profiles'

    def __str__(self):
        return self.id