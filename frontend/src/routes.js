import Profile from "views/Profile.js";
import Register from "views/Register.js";
import Login from "views/Login.js";
import StudentList from "views/Students";
import CourseList from "views/CourseList";
import { React } from 'react';
import { Logout } from "views/logout";
import CreateCourse from "views/CreateCourse";

var routes = [
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: <Profile />,
    layout: "/admin",
  },
  {
    path: "/create-course",
    name: "Create Course ",
    icon: "ni ni-paper-diploma text-orange",
    component: <CreateCourse />,
    layout: "/admin",
  },
  {
    path: "/courses",
    name: "Courses",
    icon: "ni ni-bullet-list-67 text-red",
    component: <CourseList />,
    layout: "/admin",
  },
  {
    path: "/students",
    name: "Students",
    icon: "ni ni-hat-3",
    component: <StudentList />,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: <Login />,
    layout: "/auth",
  },
  {
    path: "/logout",
    name: "Logout",
    icon: "ni ni-key-25 text-info",
    component: <Logout />,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: <Register />,
    layout: "/auth",
  },
];

export default routes;
