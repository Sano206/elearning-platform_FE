import Vue from "vue";
import axios from "axios";
// Import the Auth0 configuration
import { domain, clientId, audience } from "../auth_config.json";

import store from "@/store";
import router from "@/router";
// Import the plugin here
import { Auth0Plugin } from "./auth";
import App from "./App.vue";

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

// Import Bootstrap an BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

// Make BootstrapVue available thr
// oughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

Vue.config.productionTip = false;
window.axios = require("axios");
axios.defaults.baseURL = "//localhost:8080";
//axios.defaults.baseURL = "https://elearningplatform.herokuapp.com";

Vue.use(Auth0Plugin, {
  domain,
  clientId,
  audience,
  onRedirectCallback: (appState) => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    );
  },
});

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
