import Vue from 'vue'
import VueRouter from 'vue-router'
// eslint-disable-next-line no-unused-vars
import axios from 'axios'
// Import the Auth0 configuration
import {domain, clientId} from "../auth_config.json";

// Import the plugin here
import {Auth0Plugin} from "./auth";
import App from './App.vue'
import UsersView from "@/components/views/UsersView";
import CoursesView from "@/components/views/CoursesView";
import CourseCardDetail from "@/components/course/CourseCardDetail";
import CourseAppView from "@/components/views/CourseAppView";
import ProfileView from "@/components/views/ProfileView";
import {authGuard} from "@/auth/authGuard";


Vue.config.productionTip = false
window.axios = require('axios');
axios.defaults.baseURL = '//localhost:8080'
//axios.defaults.baseURL = 'https://elearningplatform.herokuapp.com'

Vue.use(VueRouter);

const routes = [
    {path: '/users', component: UsersView},
    {path: '/courses', component: CoursesView},
    {path: '/courses/:courseId', component: CourseCardDetail},
    {path: '/courses/app/:courseId', component: CourseAppView},
    {path: "/profile", name: "profile", component: ProfileView, beforeEnter: authGuard}
];

const router = new VueRouter({
    routes
});

Vue.use(Auth0Plugin, {
    domain,
    clientId,
    onRedirectCallback: appState => {
        router.push(
            appState && appState.targetUrl
                ? appState.targetUrl
                : window.location.pathname
        );
    }
});


new Vue({
    render: h => h(App),
    router,


}).$mount('#app')