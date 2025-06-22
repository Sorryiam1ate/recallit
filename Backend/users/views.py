from rest_framework.views import APIView
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from users.models import CustomUser
from rest_framework.permissions import AllowAny, IsAuthenticated
from users.serializers import UserSerializer
from rest_framework import viewsets


class UsersModelViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]
    
    @action(detail=False, methods=['post'], url_path='avatar')
    def upload_avatar(self, request):
        return self._update_avatar(request)
    
    @action(detail=False, methods=['put'], url_path='avatar')
    def update_avatar(self, request):
        return self._update_avatar(request)
    
    @action(detail=False, methods=['delete'], url_path='avatar')
    def delete_avatar(self, request):
        user = request.user
        user.avatar.delete(save=True)
        return Response({'avatar': None}, status=status.HTTP_200_OK)
    
    def _update_avatar(self, request):
        serializer = UserSerializer(
            instance=request.user,
            data=request.data,
            partial=True,
            context={'only_avatar': True}
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)