from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    ROLE_CHOICES = (
        (0, 'Admin'),
        (1, 'Student'),
        (2, 'Teacher'),
    )
    role = models.PositiveSmallIntegerField(choices=ROLE_CHOICES, default=0)
    
class Course(models.Model):
    id = models.BigIntegerField(primary_key=True)
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    pass_rate = models.FloatField()

class Lesson(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    id = models.BigIntegerField(primary_key=True)
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    video_link = models.CharField(max_length=255)
    questions = models.JSONField()


# Create your models here.
