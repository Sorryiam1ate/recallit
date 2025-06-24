from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from rest_framework import permissions, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView

from users.models import CustomUser
from users.serializers import UserSerializer


class UsersModelViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]
    
    def perform_create(self, serializer):
        user = serializer.save(is_active=False)

        uid = urlsafe_base64_encode(force_bytes(user.pk))
        token = default_token_generator.make_token(user)
        activation_link = (
            f"http://127.0.0.1:8000/activate/?uid={uid}&token={token}"
        )

        send_mail(
            subject="Подтверждение регистрации",
            message = (
                "Перейдите по ссылке для активации аккаунта:\n"
                f"{activation_link}"
            )
            from_email="noreply@example.com",
            recipient_list=[user.email],
            fail_silently=False,
        )

    
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
        return Response(
            {'avatar': None},
            status=status.HTTP_200_OK
        )
    
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
        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )
    

class ActivateUserView(APIView):
    def get(self, request):
        uidb64 = request.GET.get("uid")
        token = request.GET.get("token")
        try:
            uid = urlsafe_base64_decode(uidb64).decode()
            user = CustomUser.objects.get(pk=uid)
        except (
            TypeError, 
            ValueError, 
            OverflowError, 
            CustomUser.DoesNotExist
        ):
            return Response({"error": "Invalid user"}, status=400)

        if default_token_generator.check_token(user, token):
            user.is_active = True
            user.save()
            return Response(
                {"message": "Аккаунт активирован"}, status=200
            )
        else:
            return Response(
                {"error": "Неверный или просроченный токен"}, status=400
            )