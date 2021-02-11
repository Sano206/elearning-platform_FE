import Vue from 'vue'
import VueRouter from 'vue-router'
// eslint-disable-next-line no-unused-vars
import axios from 'axios'
import App from './App.vue'
import UsersView from "@/components/views/UsersView";
import CoursesView from "@/components/views/CoursesView";
import CourseCardDetail from "@/components/course/CourseCardDetail";
import CourseAppView from "@/components/views/CourseAppView";


Vue.config.productionTip = false
window.axios = require('axios');
axios.defaults.baseURL = '//localhost:8080'

Vue.use(VueRouter);

const routes = [
    {path: '/users', component: UsersView},
    {path: '/courses', component: CoursesView},
    {path: '/courses/:courseId', component: CourseCardDetail},
    {path: '/courses/app/:courseId', component: CourseAppView}
];

const router = new VueRouter({
    routes
})


new Vue({
    render: h => h(App),
    router,



}).$mount('#app')