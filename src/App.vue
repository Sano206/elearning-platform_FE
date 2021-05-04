<template>
  <div id="app">
    <app-nav
        role="navigation"
        :topics="topics"
    />

    <router-view
      v-if="token !== null"
      class="container"
      style="margin-top: 20px"
      :key="$route.fullPath"
    ></router-view>
    <loading class="container" v-else></loading>

    <app-footer></app-footer>
  </div>
</template>

<script>
import AppNav from "@/components/nav/AppNav";
import AppFooter from "@/components/AppFooter";
import { tokenMixin } from "@/components/mixins/tokenMixin";
import Loading from "@/components/Loading";
import {topicsMixin} from "@/components/mixins/courseMixin";

export default {
  name: "App",
  components: {
    Loading,
    AppNav,
    AppFooter,
  },



  mixins: [tokenMixin, topicsMixin],

  methods: {
    login() {
      this.$auth.loginWithRedirect();
    },
    // Log the user out
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin,
      });
    },


  },

  async created() {
    await this.$store.dispatch("retrieveTokenFromAuthz");
    for (let role of this.$auth.user["https:/e-learning-app.com/roles"]) {
      if (role === "instructor") {
        await this.$store.dispatch("makeInstructorTrue");
      }
      if (role === "admin") {
        await this.$store.dispatch("makeAdminTrue");
      }
    }
  },


};
</script>

<style>
html,
body,
#app,
.container {
  min-height: 100vh;
}

</style>
