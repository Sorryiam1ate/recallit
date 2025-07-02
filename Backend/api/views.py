from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from drf_spectacular.utils import extend_schema_view, extend_schema
from api.permissions import IsAuthorOrReadOnly
from rest_framework.exceptions import PermissionDenied

from .models import Module, Card
from .serializers import ModuleSerializer, CardSerializer

@extend_schema_view(
    list=extend_schema(tags=["📦 Модули"]),
    retrieve=extend_schema(tags=["📦 Модули"]),
    create=extend_schema(tags=["📦 Модули"]),
    update=extend_schema(tags=["📦 Модули"]),
    partial_update=extend_schema(tags=["📦 Модули"]),
    destroy=extend_schema(tags=["📦 Модули"]),
)
class ModuleModelViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated & IsAuthorOrReadOnly]
    queryset = Module.objects.all()
    serializer_class = ModuleSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


@extend_schema_view(
    list=extend_schema(tags=["📦 Карты"]),
    retrieve=extend_schema(tags=["📦 Карты"]),
    create=extend_schema(tags=["📦 Карты"]),
    update=extend_schema(tags=["📦 Карты"]),
    partial_update=extend_schema(tags=["📦 Карты"]),
    destroy=extend_schema(tags=["📦 Карты"]),
)
class CardModelViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated & IsAuthorOrReadOnly]
    queryset = Card.objects.all()
    serializer_class = CardSerializer

    def perform_create(self, serializer):
        module = serializer.validated_data.get("module")

        if module.author != self.request.user:
            raise PermissionDenied("Вы не являетесь автором этого модуля.")

        serializer.save(author=self.request.user)