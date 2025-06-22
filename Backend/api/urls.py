from rest_framework.routers import DefaultRouter
from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework import permissions

from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from api.views import PostViewSet
from users.views import UsersModelViewSet


router = DefaultRouter()
router.register(r'posts', PostViewSet)
router.register(r'users', UsersModelViewSet)

urlpatterns = [
    path('', include(router.urls)),

]