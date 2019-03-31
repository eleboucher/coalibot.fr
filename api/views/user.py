from rest_framework.viewsets import ReadOnlyModelViewSet
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.response import Response

from api.models import User, Student
from api.serializers.user import StudentSerializer, UserSerializer


class UserViewSet(ReadOnlyModelViewSet):
    serializer_class = StudentSerializer

    def get_queryset(self):
        return Student.objects.filter(account=self.request.user)
