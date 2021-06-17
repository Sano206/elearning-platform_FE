import Vuex from "vuex";
import { getInstance } from "@/auth";
import Vue from "vue";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    token: null,
    isInstructor: false,
    isAdmin: false,
    isUser: false,
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
    isUser(state) {
      return state.isUser;
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
    setUser(state, isUser) {
      state.isUser = isUser;
    },
  },

  actions: {
    retrieveTokenFromAuth0(context) {
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
    makeUserTrue(context) {
      context.commit("setUser", true);
    },
  },
});

export default store;
