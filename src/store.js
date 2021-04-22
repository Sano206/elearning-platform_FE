import Vuex from "vuex";
import {getInstance} from "@/auth";
import Vue from "vue";

Vue.use(Vuex)


const store = new Vuex.Store({

    state: {
        token: null,
        isInstructor: false,
    },

    getters:{
        token(state) {
            return state.token;
        },
        isInstructor(state) {
            return state.isInstructor;
        }
    },

    mutations:{
        setToken(state, token) {
            state.token = token;
        },
        setInstructor(state, isInstructor) {
            state.isInstructor = isInstructor;
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
        },

        makeInstructorTrue(context){
            context.commit("setInstructor", true)
        }
    }
})

export default store
