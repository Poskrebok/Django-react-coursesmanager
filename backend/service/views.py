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
from django.contrib.auth import get_user_model

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

class UserListView(APIView):
    permission_classes = [IsAuthenticated]
        
    def get_queryset(self):
        queryset = CustomUser.objects.all()
        role = self.request.query_params.get('role')

        if role:
            queryset = queryset.filter(role=role)

        return queryset
    
    def get(self, request):
        data = UserSerializer(self.get_queryset(),many = True)
        return Response(data.data)
        
            

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

class CourseCreateView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        serializer = CourseSerializerReceiver(data=request.data)  
        if serializer.is_valid():
            course = serializer.save()
            response_data = {
                'message': 'Course created successfully',
                'course_id': course.id  
            }
            return Response(response_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class LessonCreateView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        serializer = LessonSerializerReciver(data=request.data)  
        if serializer.is_valid():
            lesson = serializer.save()
            response_data = {
                'message': 'Lesson created successfully',
                'lesson_id': lesson.id  
            }
            return Response(response_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class CourseDetailView(APIView):
    permission_classes = [IsAuthenticated]  
    def get(self, request, course_id):
        try:
            course = Course.objects.get(id=course_id)
        except Course.DoesNotExist:
            return Response({'error': 'Course does not exist'}, status=404)

        serializer = CourseSerializer(course)
        return Response(serializer.data)

class LessonsByCourseView(APIView):
    permission_classes = [IsAuthenticated]  
    def get(self, request, course_id):
        try:
            course = Course.objects.get(id=course_id)
        except Course.DoesNotExist:
            return Response({'error': 'Course does not exist'}, status=404)

        lessons = Lesson.objects.filter(course=course)
        serializer = LessonSerializer(lessons, many=True)
        return Response(serializer.data)
    
class UserResultsView(APIView):
    permission_classes = [IsAuthenticated]  
    def get(self, request, user_id):
        results = Results.objects.filter(id_user=user_id)
        serializer = ResultsSerializer(results, many=True)
        return Response(serializer.data)

class CourseResultsView(APIView):
    permission_classes = [IsAuthenticated]  
    def get(self, request, course_id):
        results = Results.objects.filter(id_course=course_id)
        serializer = ResultsSerializer(results, many=True)
        return Response(serializer.data)

class LessonResultsView(APIView):
    permission_classes = [IsAuthenticated]  
    def get(self, request, lesson_id):
        results = Results.objects.filter(id_lesson=lesson_id)
        serializer = ResultsSerializer(results, many=True)
        return Response(serializer.data)