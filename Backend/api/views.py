from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import Module
from .serializers import ModuleSerializer


class ModelViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = Module.objects.all()
    serializer_class = ModuleSerializer