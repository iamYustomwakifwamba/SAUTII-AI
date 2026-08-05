from django.db import models
from django.conf import settings


class Jingle(models.Model):

    STATUS_CHOICES = [
        ("draft", "Draft"),
        ("processing", "Processing"),
        ("completed", "Completed"),
        ("failed", "Failed"),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="jingles")
    title = models.CharField(max_length=200, default="Untitled Jingle")


    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="draft")

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


    def __str__(self):
        return self.title

class JingleMessage(models.Model):

    ROLE_CHOICES = (
        ("user", "User"),
        ("assistant", "Assistant")
    )

    jingle = models.ForeignKey(Jingle, related_name="messages", on_delete=models.CASCADE)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    content = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)

class JingleAudio(models.Model):

    jingle = models.ForeignKey(Jingle, related_name="audio", on_delete=models.CASCADE)
    file = models.FileField(upload_to="jingles/")
    version = models.IntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)