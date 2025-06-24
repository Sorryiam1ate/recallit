from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()
    

class Module(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='modules')
    is_public = models.BooleanField(default=False)

    def __str__(self):
        return self.title
    

class Card(models.Model):
    module = models.ForeignKey(Module, on_delete=models.CASCADE, related_name='cards')
    question = models.CharField(max_length=255) 
    answer = models.TextField() 
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.question
    

class StudyProgress(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='progress')
    card = models.ForeignKey(Card, on_delete=models.CASCADE, related_name='progress')
    last_studied = models.DateTimeField(auto_now=True)
    is_learned = models.BooleanField(default=False)

    class Meta:
        unique_together = ('user', 'card')