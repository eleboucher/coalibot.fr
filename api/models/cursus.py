from django.db import models
from django.contrib.postgres.fields import JSONField

from api.models.base import BaseModel
from api.models.user import Student


class Cursus(BaseModel):
    cursus_id = models.BigIntegerField(primary_key=True)
    name = models.CharField(max_length=50)
    slug = models.CharField(max_length=50)


class CursusUser(BaseModel):
    cursus_id = models.ForeignKey(Cursus, on_delete=models.DO_NOTHING)
    user_id = models.ForeignKey(Student, on_delete=models.DO_NOTHING)
    level = models.FloatField()
    skills = JSONField()
    grade = models.CharField(max_length=50, null=True)
    begin_at = models.DateField(null=True)
    end_at = models.DateField(null=True)
