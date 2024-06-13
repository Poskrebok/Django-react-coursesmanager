from django.db import models
from django.db.models import Avg
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    ROLE_CHOICES = (
        (0, 'Admin'),
        (1, 'Student'),
        (2, 'Teacher'),
    )
    role = models.PositiveSmallIntegerField(choices=ROLE_CHOICES, default=0)
    
class Course(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=255)
    description = models.TextField(max_length=1000)
    pass_rate = models.FloatField(default=0)
    def calculate_pass_rate(self):
        total_lessons = self.lesson_set.count()
        if total_lessons > 0:
            average_pass_rate = self.lesson_set.annotate(average_result=Avg('results__results')).aggregate(Avg('average_result'))['average_result__avg']
            self.pass_rate = average_pass_rate if average_pass_rate is not None else 0.0
        else:
            self.pass_rate = 0.0
        self.save()
        
class Lesson(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=255)
    description = models.TextField(max_length=1000)
    video_link = models.CharField(max_length=255)
    questions = models.JSONField()
    
class Results(models.Model):
    id_user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    id_course = models.ForeignKey(Course, on_delete=models.CASCADE)
    id_lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)
    results = models.BigIntegerField()
    


# Create your models here.
