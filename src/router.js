import Vue from "vue";
import VueRouter from "vue-router";
import UsersView from "@/components/views/UsersView";
import CoursesView from "@/components/views/CoursesView";
import MyCoursesView from "@/components/views/MyCoursesView";
import CourseCardDetail from "@/components/course/CourseCardDetail";
import InstructorCoursesView from "@/components/views/InstructorCoursesView";
import CourseCardDetailEditable from "@/components/course/CourseCardDetailEditable";
import CourseAppView from "@/components/views/CourseAppView";
import ProfileView from "@/components/views/ProfileView";
import {authGuard} from "@/auth/authGuard";
import store from "@/store";


Vue.use(VueRouter);

const routes = [
    {path: '/users', component: UsersView},
    {path: '/courses', component: CoursesView},
    {path: '/myCourses', component: MyCoursesView},
    {path: '/courses/:courseId', component: CourseCardDetail},
    {path: '/instructor/courses',
        component: InstructorCoursesView,
        beforeEnter: (to, from, next) => {
            if (!store.getters.isInstructor) {
                next("/courses")
            }else{
                next()
            }
    }},
    {path: '/instructor/courses/:courseId',
        component: CourseCardDetailEditable,
        beforeEnter: (to, from, next) =>{
            if (!store.getters.isInstructor) {
                next("/courses")
            }else{
                next()
            }
        }},
    {path: '/courses/app/:courseId', component: CourseAppView},
    {path: "/profile", name: "profile", component: ProfileView, beforeEnter: authGuard},
];

const router = new VueRouter({
    routes
});

export default router
