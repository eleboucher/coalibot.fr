from django.db import models
from api.models.user import Student
from api.models.base import BaseModel


class Coalition(BaseModel):
    coalition_id = models.BigIntegerField(primary_key=True)
    name = models.CharField(max_length=50)
    slug = models.CharField(max_length=50)
    image_url = models.CharField(max_length=200)
    color = models.CharField(max_length=8)
    score = models.BigIntegerField()


class CoalitionUser(BaseModel):
    user = models.ForeignKey(Student, on_delete=models.DO_NOTHING)
    coalition = models.ForeignKey(Coalition, on_delete=models.DO_NOTHING)
    score = models.BigIntegerField()
    rank = models.BigIntegerField()
