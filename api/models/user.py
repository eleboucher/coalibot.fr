from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    username = models.CharField(max_length=20, unique=True, blank=False)
    email = models.CharField(max_length=200, unique=True, blank=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, **kwargs):
        super(User, self).save(**kwargs)
        cursus = Cursus.objects.filter(login=self.username)
        if cursus.exists():
            cursus.user = User
            cursus.save()


class Cursus(models.Model):
    login = models.CharField(max_length=20, unique=True, blank=False)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="student")
    level = models.FloatField()
    cursus = models.IntegerField()
    created_at = models.DateField()
    coalition = models.CharField(max_length=20)
