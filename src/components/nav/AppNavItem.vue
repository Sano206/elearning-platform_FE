<template>
  <li class="nav-item app-nav-link">
    <router-link
      class="nav-link router-link-exact-active router-link-active"
      v-if="$auth.isAuthenticated"
      :to="{ name: this.route }"
    >
      {{ name }}
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
};
</script>

<style scoped></style>
