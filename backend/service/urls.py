from django.urls import include, path
from django.urls import re_path
from . import views

urlpatterns = [
    path('accounts/', include("django.contrib.auth.urls")),
    path('home/', views.HomeView.as_view(), name ='home'),
    path('logout/', views.LogoutView.as_view(), name ='logout'),
    path('api/register/', views.UserRegistrationView.as_view(), name='registration'),
    re_path(r'^courses/(?:page-(?P<page_number>\d+)/)?$', views.CourseView.as_view(), name='course_list'),
    path('courses/add_new', views.CourseCreateView.as_view(), name='course-detail'),
    path('courses/<int:course_id>/lessons/', views.LessonsByCourseView.as_view(), name='lessons-by-course'),
    path('courses/<int:course_id>/create-lesson/', views.LessonCreateView.as_view(), name='lessons-by-course'),
    path('results/user/<int:user_id>/', views.UserResultsView.as_view(), name='user-results'),
    path('results/course/<int:course_id>/', views.CourseResultsView.as_view(), name='course-results'),
    path('results/lesson/<int:lesson_id>/', views.LessonResultsView.as_view(), name='lesson-results'),
    path('courses/reciveLessonResults/',views.ReciveLessonResultsView.as_view(), name='get_results'),
    path('profile', views.GetProfileData.as_view(), name='get_profiel_data'),
    path('users', views.UserListView.as_view(), name='user-list-with-role'),
    path('userRole',views.GetUserRole.as_view(),name='user-role'),
    path('getCoursesByUser', views.GetCourseByUser.as_view(), name = 'user-driven-course'),
    path('getStudentsByTeacher', views.getStudentsByTeacher.as_view(), name = 'user-driven-course'),
]

