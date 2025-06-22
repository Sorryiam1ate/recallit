
from rest_framework import serializers
from api.models import Post
from users.models import CustomUser

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'
