import Vue from 'vue'
import VueRouter from 'vue-router'
// eslint-disable-next-line no-unused-vars
import axios from 'axios'
import App from './App.vue'
import UsersView from "@/components/UsersView";
import CoursesView from "@/components/course/CoursesView";
import CourseCardDetail from "@/components/course/CourseCardDetail";


Vue.config.productionTip = false
window.axios = require('axios');

Vue.use(VueRouter);

const routes = [
    {path: '/users', component: UsersView},
    {path: '/courses', component: CoursesView},
    {path: '/courses/:courseId', component: CourseCardDetail}
];

const router = new VueRouter({
    routes
})


new Vue({
    render: h => h(App),
    router,
    data() {
        return {
        }
    },


}).$mount('#app')