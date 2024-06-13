const BASE_URL = 'http://localhost:8000'; // Adjust the base URL as per your API endpoint

export const URLS = {
  BASE: `${BASE_URL}`,
  LOGOUT: `${BASE_URL}/logout/`,
  HOME: `${BASE_URL}/home/`,
  TOKEN: `${BASE_URL}/token/`,
  REFRESH: `${BASE_URL}/token/refresh/`,
  REGISTER: `${BASE_URL}/api/register/`,
  COURSES: `${BASE_URL}/courses/`,
  LESSONS: `${BASE_URL}/lessons/`,
  COURSESLIMITED: `${BASE_URL}/courses?limit=10`,
  STUDENTSLIMITED: `${BASE_URL}/users?role=1`,
  CREATECOURSE: `${BASE_URL}/courses/add_new`,
  COURSEDEATILEDVIEW: `${BASE_URL}/courses/<int:course_id>/`,
  COURSELESSONSTABLE: `${BASE_URL}/courses/<int:course_id>/lessons/`,
  COURSESENDRESULTS: `${BASE_URL}/courses/reciveLessonResults/`,
  GETROLE: `${BASE_URL}/userRole`,
  GETPROFILE: `${BASE_URL}/profile`,
  COUNTCOURSES: `${BASE_URL}/getCoursesByUser`,
  COUNTSRUDENTS: `${BASE_URL}/getStudentsByTeacher`,
  
};

