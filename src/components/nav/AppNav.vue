<template>
  <nav
    class="font-weight-bold navbar sticky-top navbar-expand-lg navbar-light py-3"
    style="background-color: #118ab2"
  >
    <router-link class="navbar-brand" to="/">Home</router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item app-nav-link dropdown">
          <div
            class="nav-link dropdown-toggle router-link-exact-active router-link-active"
            id="navbarDropdownMenuLink"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Topics
          </div>

          <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <div v-for="(topic, index) in topics" v-bind:key="index">
              <router-link class="dropdown-item" :to="/topic/ + topic">{{
                topic
              }}</router-link>
            </div>
          </div>
        </li>

        <app-nav-item route="user/courses" name="My Courses"></app-nav-item>

        <app-nav-item
          v-if="isInstructor"
          route="instructor/courses"
          name="Instructor courses"
        ></app-nav-item>

        <app-nav-item route="profile" name="Profile"></app-nav-item>

        <li class="nav-item active">
          <form class="form-inline my-2 my-lg-0">
            <input
              class="form-control mr-sm-2"
              type="search"
              placeholder="Search courses.."
              aria-label="Search"
              v-model="substring"
            />
            <button
              class="btn text-light my-2 my-sm-0"
              style="background: #073b4c"
              type="submit"
              @click="searchCourses"
            >
              Search
            </button>
          </form>
        </li>
      </ul>
      <div class="nav-item" v-if="!$auth.loading">
        <button
          type="button"
          class="btn btn-primary"
          v-if="!$auth.isAuthenticated"
          @click="login"
        >
          Log in
        </button>
        <button
          type="button"
          class="btn btn-secondary"
          v-if="$auth.isAuthenticated"
          @click="logout"
        >
          Log out
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
import { tokenMixin } from "@/components/mixins/tokenMixin";
import AppNavItem from "@/components/nav/AppNavItem";

export default {
  name: "AppNav",
  components: { AppNavItem },
  mixins: [tokenMixin],
  props: {
    topics: null,
  },
  data() {
    return {
      substring: "",
    };
  },

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
    searchCourses() {
      this.$router.push("/title/" + this.substring);
    },
  },
};
</script>

<style scoped>
input {
  background: #118ab2;
  border: #073b4c solid 2px;
}

::placeholder {
  color: white;
}

* {
  font-size: large;
}
</style>
