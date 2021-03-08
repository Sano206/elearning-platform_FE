import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
// eslint-disable-next-line no-unused-vars
import axios from 'axios'
// Import the Auth0 configuration
import {domain, clientId, audience} from "../auth_config.json";

// Import the plugin here
import {Auth0Plugin, getInstance} from "./auth";
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

Vue.use(Vuex)

const routes = [
    {path: '/users', component: UsersView},
    {path: '/courses', component: CoursesView},
    {path: '/courses/:courseId', component: CourseCardDetail},
    {path: '/courses/app/:courseId', component: CourseAppView},
    {path: "/profile", name: "profile", component: ProfileView, beforeEnter: authGuard},
];

const router = new VueRouter({
    routes
});

Vue.use(Auth0Plugin, {
    domain,
    clientId,
    audience,
    onRedirectCallback: appState => {
        router.push(
            appState && appState.targetUrl
                ? appState.targetUrl
                : window.location.pathname
        );
    }
});


export const store = new Vuex.Store({
/*    state: {
        token: null,
    },
    mutations: {
        setToken(state, newToken){
            state.token = newToken
        }
    },
/!*
    actions:{
        async loadToken({commit}, newToken) {
            console.log(token)
            console.log(response)
            commit("setToken", response)
        }
    },*!/

    getters: {
        getToken: state => {
            return state.token
        }
    }*/
    state: {
        token: null
    },

    getters:{
        token(state) {
            return state.token;
        }
    },

    mutations:{
        setToken(state, token) {
            state.token = token;
        }
    },

    actions:{
        retrieveTokenFromAuthz(context) {
            return new Promise((resolve, reject) => {
                const instance = getInstance();
                instance.$watch("loading", loading => {
                    if (loading === false && instance.isAuthenticated) {
                        instance
                            .getTokenSilently()
                            .then(authToken => {
                                context.commit("setToken", authToken);
                                resolve(authToken);
                            })
                            .catch(error => {
                                reject(error);
                            });
                    }
                });
            });
        }
    }
})

axios.defaults.headers.common = {
    "Authorization": `Bearer ${store.getters.token}`,
};


new Vue({
    render: h => h(App),
    router,
    store,




}).$mount('#app')