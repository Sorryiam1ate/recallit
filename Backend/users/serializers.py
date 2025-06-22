# users/serializers.py

from rest_framework import serializers
from .models import CustomUser
import base64

class UserSerializer(serializers.ModelSerializer):
    avatar_base64 = serializers.SerializerMethodField(read_only=True)
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'password', 'full_name', 'avatar', 'avatar_base64']
        read_only_fields = ['id', 'avatar_base64']

    
    def create(self, validated_data):
        password = validated_data.pop('password')
        user = CustomUser(**validated_data)
        user.set_password(password)
        user.save()
        return user


    def get_avatar_base64(self, obj):
        if obj.avatar and hasattr(obj.avatar, 'path'):
            try:
                with open(obj.avatar.path, 'rb') as image_file:
                    encoded = base64.b64encode(image_file.read()).decode('utf-8')
                    return f"data:image/jpeg;base64,{encoded}"
            except Exception:
                return None
        return None

    def to_representation(self, instance):
        """Если сериализатор используется только с полем avatar — сократить вывод."""
        rep = super().to_representation(instance)
        only_avatar = self.context.get('only_avatar')
        if only_avatar:
            return {'avatar': rep.get('avatar_base64')}
        return rep