import Profile from "views/Profile.js";
import Register from "views/Register.js";
import Login from "views/Login.js";
import StudentList from "views/Students";
import CourseList from "views/CourseList";
import { React } from 'react';
import { Logout } from "views/logout";
import CreateCourse from "views/CreateCourse";
import CoursePage from "views/Course";
import CreateLesson from "views/CreateLesson";
var routes = [
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: <Profile />,
    layout: "/admin",
    filter: "main",
  },
  {
    path: "/courses",
    name: "Courses",
    icon: "ni ni-bullet-list-67 text-red",
    component: <CourseList />,
    layout: "/admin",
    filter: "main",
  },
  {
    path: "/students",
    name: "Students",
    icon: "ni ni-hat-3",
    component: <StudentList />,
    layout: "/admin",
    filter: "main",
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: <Login />,
    layout: "/auth",
    filter: "main",
  },
  {
    path: "/logout",
    name: "Logout",
    icon: "ni ni-key-25 text-info",
    component: <Logout />,
    layout: "/auth",
    filter: "main",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: <Register />,
    layout: "/auth",
    filter: "main",
  },
  {
    path: "/create-course",
    name: "Create Course ",
    icon: "ni ni-paper-diploma text-orange",
    component: <CreateCourse />,
    layout: "/admin",
    filter: "utils",
  },
  {
    path: "/course-page/:courseid",
    name: "Course",
    icon: "ni ni-paper-diploma text-orange",
    component: <CoursePage />,
    layout: "/admin",
    filter: "utils",
  },
  {
    path: "/course-page/:lessonId/lesson-create-page",
    name: "Lesson creator",
    icon: "ni ni-paper-diploma text-orange",
    component: <CreateLesson />,
    layout: "/admin",
    filter: "utils",
  },
];

export default routes;
