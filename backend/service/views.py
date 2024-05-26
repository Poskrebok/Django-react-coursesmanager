from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from rest_framework import permissions
from .serializer import *
from .models import *

class HomeView(APIView):
   permission_classes = [IsAuthenticated]   
   def get(self, request):
       if(request.user.role == 1):
           print("is student")
       else:
           print("is teacher") 
       content = {'message': 'Welcome to the JWT Authentication page using React Js and Django!'}   
       return Response(content)
   
class LogoutView(APIView):     
    permission_classes = [IsAuthenticated]     
    def post(self, request):
        try:               
            refresh_token = request.data["refresh_token"]              
            token = RefreshToken(refresh_token)               
            token.blacklist()               
            return Response(status=status.HTTP_205_RESET_CONTENT)          
        except Exception as e:               
            return Response(status=status.HTTP_400_BAD_REQUEST)
        

class UserRegistrationView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = RegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            response_data = {
                'message': 'User registered successfully',
                'user_id': user.id
            }
            return Response(response_data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CourseView(APIView):
    permission_classes = [IsAuthenticated]  
    def get(self, request):
        courses = Course.objects.all()
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CourseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

class LessonView(APIView):
    permission_classes = [IsAuthenticated]  
    def get(self, request):
        lessons = Lesson.objects.all()
        serializer = LessonSerializer(lessons, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = LessonSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    
    """ добавить enpdoint для выкачки одного курса и одного урока """