import Vue from "vue";
import VueRouter from "vue-router";
import CoursesView from "@/components/views/CoursesView";
import MyCoursesView from "@/components/views/MyCoursesView";
import CourseCardDetail from "@/components/course/CourseCardDetail";
import InstructorCoursesView from "@/components/views/InstructorCoursesView";
import CourseCardDetailEditable from "@/components/course/CourseCardDetailEditable";
import CourseAppView from "@/components/views/CourseAppView";
import ProfileView from "@/components/views/ProfileView";
import { authGuard } from "@/auth/authGuard";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: CoursesView },
  { path: "/topic/:topic?", component: CoursesView },
  { path: "/title/:substring?", component: CoursesView },
  {
    path: "/user/courses",
    component: MyCoursesView,
    beforeEnter: authGuard,
  },
  { path: "/detail/:courseId", component: CourseCardDetail },
  {
    path: "/instructor/courses",
    component: InstructorCoursesView,
    beforeEnter: (to, from, next) => {
      if (!store.getters.isInstructor) {
        next("/");
      } else {
        next();
      }
    },
  },
  {
    path: "/instructor/courses/:courseId",
    component: CourseCardDetailEditable,
    beforeEnter: (to, from, next) => {
      if (!store.getters.isInstructor) {
        next("/");
      } else {
        next();
      }
    },
  },
  {
    path: "/app/:courseId",
    component: CourseAppView,
    beforeEnter: authGuard,
  },
  {
    path: "/profile",
    name: "profile",
    component: ProfileView,
    beforeEnter: authGuard,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
