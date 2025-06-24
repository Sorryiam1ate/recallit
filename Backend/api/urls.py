from django.urls import include, path
from rest_framework.routers import DefaultRouter
from users.views import UsersModelViewSet

from api.views import ModelViewSet

router = DefaultRouter()
router.register(r'modules', ModelViewSet)
router.register(r'users', UsersModelViewSet)

urlpatterns = [
    path('', include(router.urls)),
]