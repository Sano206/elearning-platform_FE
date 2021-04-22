<template>
  <li class="nav-item app-nav-link">
    <router-link class=" nav-link router-link-exact-active  router-link-active" v-if="$auth.isAuthenticated" :to=fullRoute>
      {{name}}
    </router-link>
  </li>
</template>

<script>
export default {
  name: "AppNavItem",
  props: {
    name: null,
    route: null,
  },
  computed:{
    fullRoute(){
      return '/'+this.route
    }
  }
}
</script>

<style scoped>


</style>
