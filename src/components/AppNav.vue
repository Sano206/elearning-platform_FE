<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">Home</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link class="nav-link" to="/courses">Courses</router-link>
        </li>
        <li class="nav-item active">
          <router-link class="nav-link" v-if="$auth.isAuthenticated" to="/myCourses">My Courses</router-link>
        </li>
        <li class="nav-item active">
          <router-link class="nav-link" v-if="$auth.isAuthenticated && isInstructor" to="/instructor/courses">Instructor courses</router-link>
        </li>
        <li class="nav-item active">
          <router-link class="nav-link" v-if="$auth.isAuthenticated" to="/profile">Profile</router-link>
        </li>
        <li class="nav-item active">
          <form class="form-inline my-2 my-lg-0">
            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
        </li>
      </ul>
      <div v-if="!$auth.loading">
        <button type="button" class="btn btn-primary" v-if="!$auth.isAuthenticated" @click="login">Log in</button>
        <button type="button" class="btn btn-secondary" v-if="$auth.isAuthenticated" @click="logout">Log out</button>
      </div>

    </div>
  </nav>
</template>

<script>
import {tokenMixin} from "@/components/mixins/tokenMixin";

export default {
  name: "AppNav",

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
}
</script>

<style scoped>

/*.navbar{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
}*/
/*.navbar {

  width: 100%;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
}

li {
  float: left;
}

li a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

!* Change the link color to #111 (black) on hover *!
li a:hover {
  background-color: #111;
}*/

</style>
