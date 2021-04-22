<template>
  <div id="app">
      <app-nav role="navigation"></app-nav>


      <router-view v-if="token !== null" class="container" style="margin-top: 20px"></router-view>
      <loading class="container" v-else></loading>

      <app-footer></app-footer>


    </div>
</template>

<script>

import AppNav from "@/components/nav/AppNav";
import AppFooter from "@/components/AppFooter";
import axios from "axios";
import {store} from "@/main";
import {tokenMixin} from "@/components/mixins/tokenMixin";
import Loading from "@/components/Loading";



export default {
  name: 'App',
  components: {
    Loading,
    AppNav,
    AppFooter,
  },

  mixins:[tokenMixin],

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
  },

  async created() {
    await this.$store.dispatch("retrieveTokenFromAuthz")
    for(let role of (this.$auth.user["https:/e-learning-app.com/roles"])) {
      if (role === "instructor") {
        await this.$store.dispatch("makeInstructorTrue")
      }
    }
  },



  /*  async mounted() {
      console.log("before")
      const token = await this.$auth.getTokenSilently()
      console.log(this.$auth.isAuthenticated)
      console.log(token)
      if(this.$auth.isAuthenticated){
        console.log("start")
        //const token = await this.$auth.getTokenSilently()
        console.log("mid")
        this.$store.commit("setToken", "token")
        console.log("finnish")
      }
    }*/

}
</script>

<style>

html, body, #app, .container{
  min-height: 100vh;
}


/*#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}*/

/*.router-view{
  position: absolute;
  left: 0;
  width: 100%;
  overflow: auto;
}*/

/*body{
  width: 100%;
  margin: 0;
}*/
/*

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
*/

</style>
