<template>
  <div class="navbar">
    <ul>
      <li>
        <router-link to="/courses">Courses</router-link>
      </li>
      <li>
        <router-link v-if="$auth.isAuthenticated" to="/profile">Profile</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "AppNav"
}
</script>

<style scoped>

/*.navbar{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
}*/
.navbar {

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

/* Change the link color to #111 (black) on hover */
li a:hover {
  background-color: #111;
}

</style>