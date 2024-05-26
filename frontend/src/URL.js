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
};

export const FrontURLS = {
  LOGIN : `/login`,
  LOGOUT : `/logout`,
  REGISTER : `/Register`,
  HOME : `/`,
  COURSE : `/Courses`,
  LESSON : `/Lesson`,
  LESSONBUILDER : `/lessonBuilder`,
  PROFILE : `/profile`,
}