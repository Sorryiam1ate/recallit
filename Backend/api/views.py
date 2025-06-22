from rest_framework import viewsets
from .models import Post
from .serializers import PostSerializer
from rest_framework.permissions import IsAuthenticated

class PostViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)  # ✅ обязательно с "_classes"
    queryset = Post.objects.all()
    serializer_class = PostSerializer