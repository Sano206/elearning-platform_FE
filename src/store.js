import Vuex from "vuex";
import { getInstance } from "@/auth";
import Vue from "vue";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    token: null,
    isInstructor: false,
    isAdmin: false,
  },

  getters: {
    token(state) {
      return state.token;
    },
    isInstructor(state) {
      return state.isInstructor;
    },
    isAdmin(state) {
      return state.isAdmin;
    },
  },

  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setInstructor(state, isInstructor) {
      state.isInstructor = isInstructor;
    },
    setAdmin(state, isAdmin) {
      state.isAdmin = isAdmin;
    },
  },

  actions: {
    retrieveTokenFromAuthz(context) {
      return new Promise((resolve, reject) => {
        const instance = getInstance();
        instance.$watch("loading", (loading) => {
          if (loading === false && instance.isAuthenticated) {
            instance
              .getTokenSilently()
              .then((authToken) => {
                context.commit("setToken", authToken);
                resolve(authToken);
              })
              .catch((error) => {
                reject(error);
              });
          }
        });
      });
    },

    makeInstructorTrue(context) {
      context.commit("setInstructor", true);
    },
    makeAdminTrue(context) {
      context.commit("setAdmin", true);
    },
  },
});

export default store;
