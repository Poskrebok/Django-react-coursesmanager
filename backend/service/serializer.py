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
    
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username','email','role']

class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = ['id', 'name', 'description', 'video_link', 'questions', 'course_id']
        
class CourseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Course
        fields = ['id', 'name', 'description', 'pass_rate']

class CourseSerializerReceiver(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['name', 'description', 'pass_rate']  # Include pass_rate if it needs to be set during creation.
    
    def create(self, validated_data):
        # Other custom creation logic can be added here if needed
        return Course.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.description = validated_data.get('description', instance.description)
        return instance

class LessonSerializerReciver(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = ['name', 'description', 'video_link', 'questions', 'course_id']  # Include pass_rate if it needs to be set during creation.
    
    def create(self, validated_data):
        # Other custom creation logic can be added here if needed
        return Lesson.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.description = validated_data.get('description', instance.description)
        instance.video_link = validated_data.get('video_link', instance.video_link)
        instance.questions = validated_data.get('questions', instance.questions)
        instance.course_id = validated_data.get('course_id', instance.course_id)
        return instance

class ResultsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Results
        fields = ['id_user', 'id_course', 'id_lesson', 'results']
        
