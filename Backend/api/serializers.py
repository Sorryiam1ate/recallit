
from django.contrib.auth import get_user_model
from rest_framework import serializers

from api.models import Module

User = get_user_model()

class ModuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Module
        fields = '__all__'
