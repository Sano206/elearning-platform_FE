<template>
  <div id="app">
    <div class="app-container">
      <app-nav class="app-nav"></app-nav>
      <div v-if="!$auth.loading">
        <!-- show login when not authenticated -->
        <button v-if="!$auth.isAuthenticated" @click="login">Log in</button>
        <!-- show logout when authenticated -->
        <button v-if="$auth.isAuthenticated" @click="logout">Log out</button>
      </div>
      <router-view class="router-view"></router-view>

    </div>

      <app-footer class="app-footer"></app-footer>
    </div>
</template>

<script>

import AppNav from "@/components/AppNav";
import AppFooter from "@/components/AppFooter";



export default {
  name: 'App',
  components: {
    AppNav,
    AppFooter,
  },

  methods: {
    login() {
      this.$auth.loginWithRedirect();
    },
    // Log the user out
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin
      });
    },
  }

}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  //margin: 50px;
}

/*.router-view{
  position: absolute;
  left: 0;
  width: 100%;
  overflow: auto;
}*/

body{
  width: 100%;
  margin: 0;
}

.app-container{
  min-height: 98vh;
}

.router-view{
  width: 100%;
  overflow: auto;
}

  @media only screen and (max-width: 768px) {
    max-width: 50%;
    flex: 0 0 50%;
  }

  @media only screen and (max-width: 450px) {
    max-width: 100%;
    flex: 0 0 100%;
  }


.card-wrapper {
  display: flex;
  align-items: stretch;
  flex: 1 1 auto;
  margin: 10px;
}

</style>
