from rest_framework import serializers


from api.models import User, Student


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("username", "email", "created_at", "updated_at")


class StudentSerializer(serializers.ModelSerializer):
    account = UserSerializer()

    class Meta:
        model = Student
        fields = "__all__"
