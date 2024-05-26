from django.http import JsonResponse
from rest_framework import serializers
from django.contrib.auth.forms import UserCreationForm
from .models import *


class RegistrationSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'password', 'password2', 'role']
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def create(self, validated_data):
        password = validated_data.pop('password')
        password2 = validated_data.pop('password2')
        if password != password2:
            raise serializers.ValidationError({'password2': 'Passwords must match.'})
        user = CustomUser.objects.create_user(password=password, **validated_data)
        return user 

class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = ['id', 'name', 'description', 'video_link', 'questions', 'course_id']

class CourseSerializer(serializers.ModelSerializer):
    lessons = LessonSerializer(many=True, read_only=True)

    class Meta:
        model = Course
        fields = ['id', 'name', 'description', 'pass_rate']