from django.db import models
from django.contrib.auth.models import AbstractUser
from api.models.base import BaseModel


class User(AbstractUser):
    username = models.CharField(max_length=20, unique=True, blank=False)
    email = models.CharField(max_length=200, unique=True, blank=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, **kwargs):
        super(User, self).save(**kwargs)
        student = Student.objects.filter(login=self.username)
        if student.exists():
            student.account = User
            student.save()


class Student(BaseModel):
    user_id = models.BigIntegerField(primary_key=True, unique=True)
    login = models.CharField(max_length=20, unique=True, blank=False)
    account = models.OneToOneField(
        User, on_delete=models.DO_NOTHING, related_name="student", null=True, blank=True
    )
