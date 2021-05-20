<template>
  <div id="app">
    <app-nav role="navigation" :topics="topics" />

    <div
      class="alert alert-primary text-center"
      role="alert"
      v-if="$auth.isAuthenticated && this.isUser === false"
    >
      To access the courses, please fill out your user information.
    </div>

    <loading
      class="container"
      v-if="$auth.isAuthenticated && token === null"
    ></loading>

    <router-view
      v-else
      class="container"
      style="margin-top: 20px"
      :key="$route.fullPath"
    ></router-view>

    <!--    <div-->
    <!--        v-if="!$auth.isAuthenticated"-->
    <!--        class="container"-->
    <!--        style="margin-top: 20px"-->
    <!--    >-->
    <!--      <courses-view/>-->
    <!--    </div>-->

    <app-footer></app-footer>
  </div>
</template>

<script>
import AppNav from "@/components/nav/AppNav";
import AppFooter from "@/components/AppFooter";
import { tokenMixin } from "@/components/mixins/tokenMixin";
import Loading from "@/components/Loading";
import { topicsMixin } from "@/components/mixins/courseMixin";

export default {
  name: "App",
  components: {
    // CoursesView,
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
      } else if (role === "admin") {
        await this.$store.dispatch("makeAdminTrue");
      } else if (role === "user") {
        await this.$store.dispatch("makeUserTrue");
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
