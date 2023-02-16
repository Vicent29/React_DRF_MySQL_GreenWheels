from django.conf import settings
import jwt
from datetime import datetime, timedelta
from django.db import models
from src.apps.core.models import TimestampedModel
from django.contrib.auth.models import (
    AbstractBaseUser, BaseUserManager, PermissionsMixin
)
# Create your models here.


class UserManager(BaseUserManager):
    def create_user(self, first_name, last_name, email, password=None, type='client'):
        """Create and return a `User` with an email, username and password."""

        user = self.model(first_name=first_name,
                          last_name=last_name,
                          email=self.normalize_email(email),
                          type=type)
        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, first_name, email, password):
        if password is None:
            raise TypeError('Superusers must have a password.')

        user = self.create_user(first_name, email, password)
        user.is_superuser = True
        user.is_staff = True
        user.save()

        return user


class User(AbstractBaseUser, TimestampedModel, models.Model):
    uuid = models.CharField(max_length=36, unique=True, editable=False)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    email = models.EmailField(unique=True, blank=False)
    password = models.CharField(max_length=200, blank=False)
    is_active = models.BooleanField(blank=True, default=True)
    type = models.CharField(max_length=30, blank=True, default="client")
    chatID = models.CharField(max_length=100, blank=True, default="")

    objects = UserManager()

    class Meta:
        verbose_name_plural = 'Users'

    def __str__(self):
        return self.id

    @property
    def token(self):
        """
        Allows us to get a user's token by calling `user.token` instead of
        `user.generate_jwt_token().
        The `@property` decorator above makes this possible. `token` is called
        a "dynamic property".
        """
        return self._generate_jwt_token(10)

    @property
    def refresh_token(self):
        return self._generate_jwt_token(60)

    def _generate_jwt_token(self, h):
        """
        Generates a JSON Web Token that stores this user's ID and has an expiry
        date set to 1 days into the future.
        """
        dt = datetime.now() + timedelta(minutes=h)

        token = jwt.encode({
            'id': self.pk,
            'exp': dt.utcfromtimestamp(dt.timestamp())
        }, settings.SECRET_KEY, algorithm='HS256')

        return token.decode('utf-8')


class ProfileUsr(TimestampedModel, models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    avatar = models.CharField(
        max_length=100, blank=True, default='https://i.postimg.cc/T3g6d9nk/image.png')
    biography = models.CharField(
        max_length=100, blank=True, default='User active with rent bikes')
    notis = models.IntegerField(blank=True, default=0)

    class Meta:
        verbose_name_plural = 'Profiles'

    def __str__(self):
        return self.id
