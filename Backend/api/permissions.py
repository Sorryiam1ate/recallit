from rest_framework.permissions import BasePermission, SAFE_METHODS

class IsAuthorOrReadOnly(BasePermission):
    """
    Позволяет редактировать/удалять объект только автору.
    Чтение разрешено всем (если нужно) или только авторизованным.
    """

    def has_object_permission(self, request, view, obj):
        # Разрешаем GET, HEAD, OPTIONS всем (если нужно)
        if request.method in SAFE_METHODS:
            return True

        # Остальные методы — только автору
        return obj.author == request.user