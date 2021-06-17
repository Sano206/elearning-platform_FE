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
import CreateChapterForm from "@/components/form/CreateChapterForm";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: CoursesView,
  },
  {
    path: "/topic/:topic?",
    name: "topicFilter",
    component: CoursesView,
  },
  {
    path: "/title/:substring?",
    name: "titleFilter",
    component: CoursesView,
  },
  {
    path: "/user/courses",
    name: "myCourses",
    component: MyCoursesView,
    beforeEnter: authGuard,
  },
  {
    path: "/detail/:courseId",
    name: "courseDetail",
    component: CourseCardDetail,
  },
  {
    path: "/instructor/courses",
    name: "instructorCourses",
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
    name: "instructorCourseDetail",
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
    path: "/instructor/courses/:courseId/:numberOfChapters/newChapter",
    name: "newChapter",
    component: CreateChapterForm,
    beforeEnter: (to, from, next) => {
      if (!store.getters.isInstructor) {
        next("/");
      } else {
        next();
      }
    },
  },
  {
    path: "/course/:courseId",
    name: "courseApp",
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
