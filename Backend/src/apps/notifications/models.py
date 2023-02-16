from django.db import models
from src.apps.user.models import User
from src.apps.core.models import TimestampedModel

# Create your models here.


class Noti(TimestampedModel, models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    desc = models.CharField(max_length=100, blank=False)
    type = models.CharField(max_length=100, blank=True)

    class Meta:
        verbose_name_plural = 'Notis'

    def __str__(self):
        return self.id
