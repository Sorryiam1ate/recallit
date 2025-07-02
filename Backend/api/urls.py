from django.urls import include, path
from rest_framework.routers import DefaultRouter
from users.views import UsersModelViewSet

from api.views import ModuleModelViewSet, CardModelViewSet

router = DefaultRouter()
router.register(r'modules', ModuleModelViewSet)
router.register(r'cards', CardModelViewSet)
router.register(r'users', UsersModelViewSet)


urlpatterns = [
    path('', include(router.urls)),
]