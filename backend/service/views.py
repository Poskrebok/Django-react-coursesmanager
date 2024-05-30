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
        limit = request.GET.get('limit', None)
        if limit is not None:
            try:
                limit = int(limit)
            except ValueError:
                return Response({'error': 'Invalid limit parameter. Must be an integer.'}, status=400)

            courses = Course.objects.all()[:limit]
        else:
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

class LessonDetailView(APIView):
    def get(self, request, lesson_id):
        try:
            lesson = Lesson.objects.get(id=lesson_id)
        except Lesson.DoesNotExist:
            return Response({'error': 'Lesson does not exist'}, status=404)

        serializer = LessonSerializer(lesson)
        return Response(serializer.data)

class CourseDetailView(APIView):
    def get(self, request, course_id):
        try:
            course = Course.objects.get(id=course_id)
        except Course.DoesNotExist:
            return Response({'error': 'Course does not exist'}, status=404)

        serializer = CourseSerializer(course)
        return Response(serializer.data)

class LessonsByCourseView(APIView):
    def get(self, request, course_id):
        try:
            course = Course.objects.get(id=course_id)
        except Course.DoesNotExist:
            return Response({'error': 'Course does not exist'}, status=404)

        lessons = Lesson.objects.filter(course=course)
        serializer = LessonSerializer(lessons, many=True)
        return Response(serializer.data)
    
class UserResultsView(APIView):
    def get(self, request, user_id):
        results = Results.objects.filter(id_user=user_id)
        serializer = ResultsSerializer(results, many=True)
        return Response(serializer.data)

class CourseResultsView(APIView):
    def get(self, request, course_id):
        results = Results.objects.filter(id_course=course_id)
        serializer = ResultsSerializer(results, many=True)
        return Response(serializer.data)

class LessonResultsView(APIView):
    def get(self, request, lesson_id):
        results = Results.objects.filter(id_lesson=lesson_id)
        serializer = ResultsSerializer(results, many=True)
        return Response(serializer.data)