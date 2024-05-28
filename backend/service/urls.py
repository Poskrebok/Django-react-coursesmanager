from django.urls import include, path
from django.urls import re_path as url
from . import views

urlpatterns = [
    path('accounts/', include("django.contrib.auth.urls")),
    path('home/', views.HomeView.as_view(), name ='home'),
    path('logout/', views.LogoutView.as_view(), name ='logout'),
    path('api/register/', views.UserRegistrationView.as_view(), name='registration'),
    path('courses/', views.CourseView.as_view(), name='course-list'),
    path('lessons/', views.LessonView.as_view(), name='lesson-list'),
    path('lessons/<int:lesson_id>/', views.LessonDetailView.as_view(), name='lesson-detail'),
    path('courses/<int:course_id>/', views.CourseDetailView.as_view(), name='course-detail'),
    path('courses/<int:course_id>/lessons/', views.LessonsByCourseView.as_view(), name='lessons-by-course'),
    path('results/user/<int:user_id>/', views.UserResultsView.as_view(), name='user-results'),
    path('results/course/<int:course_id>/', views.CourseResultsView.as_view(), name='course-results'),
    path('results/lesson/<int:lesson_id>/', views.LessonResultsView.as_view(), name='lesson-results'),
]

