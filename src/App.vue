<template>
  <div id="app">
      <app-nav class="app-nav"></app-nav>

      <router-view class="router-view"></router-view>

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


}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 50px;
}

.router-view{
  position: absolute;
  left: 0;
  width: 100%;
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
