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
import LessonPage from "views/Lesson";
import CourseProceed from "views/CourseProceeding";
import IndexPage from "views/main";
/* 0 - admin
1 - student
2 - teacher
 */
var routes = [
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: <Profile />,
    layout: "/admin",
    filter: "main",
    role: "all"
  },
  {
    path: "/courses",
    name: "Courses",
    icon: "ni ni-bullet-list-67 text-red",
    component: <CourseList />,
    layout: "/admin",
    filter: "main",
    role: "all"
  },
  {
    path: "/students",
    name: "Students",
    icon: "ni ni-hat-3",
    component: <StudentList />,
    layout: "/admin",
    filter: "main",
    role: "2"
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: <Login />,
    layout: "/auth",
    filter: "main",
    role: "all"
  },
  {
    path: "/logout",
    name: "Logout",
    icon: "ni ni-key-25 text-info",
    component: <Logout />,
    layout: "/auth",
    filter: "main",
    role: "all"
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: <Register />,
    layout: "/auth",
    filter: "main",
    role: "all"
  },
  {
    path: "/create-course",
    name: "Create Course ",
    icon: "ni ni-paper-diploma text-orange",
    component: <CreateCourse />,
    layout: "/admin",
    filter: "utils",
    role: "all"
  },
  {
    path: "/course-page/:courseid",
    name: "Course",
    icon: "ni ni-paper-diploma text-orange",
    component: <CoursePage />,
    layout: "/admin",
    filter: "utils",
    role: "all"
  },
  {
    path: "/course-page/:courseid/lesson-create-page",
    name: "Lesson creator",
    icon: "ni ni-paper-diploma text-orange",
    component: <CreateLesson />,
    layout: "/admin",
    filter: "utils",
    role: "all"
  },
  {
    path: "/course-page/:courseid/:lessonid",
    name: "Lesson manager",
    icon: "ni ni-paper-diploma text-orange",
    component: <LessonPage />,
    layout: "/admin",
    filter: "utils",
    role: "all"
  },
  {
    path: "/course-page/:courseid/proceed",
    name: "Course",
    icon: "ni ni-paper-diploma text-orange",
    component: <CourseProceed />,
    layout: "/admin",
    filter: "utils",
    role: "all"
  },
  {
    path: "/index",
    name: "Course",
    icon: "ni ni-paper-diploma text-orange",
    component: <IndexPage />,
    layout: "/admin",
    filter: "utils",
    role: "all"
  }
];

export default routes;
