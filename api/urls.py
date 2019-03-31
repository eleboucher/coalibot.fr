from django.urls import include, path
from rest_framework import routers
from api.views.user import UserViewSet

router = routers.SimpleRouter()
router.register(r"users", UserViewSet, basename="user")


urlpatterns = [path("", include(router.urls))]
