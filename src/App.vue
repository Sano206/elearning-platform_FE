<template>
  <div id="app">
    <app-nav></app-nav>

    <router-view></router-view>

    <app-footer></app-footer>

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
  margin-top: 60px;
}

.row {
  display: flex;
  flex-wrap: wrap;
}

.col {
  display: flex;
  flex-direction: column;

    &-1-1 {
      flex: 0 0 100%;
      max-width: 100%;
    }

    &-1-2 {
      flex: 0 0 50%;
      max-width: 50%;
    }

    &-1-3 {
      flex: 0 0 33%;
      max-width: 33%;
    }

    &-1-4 {
      flex: 0 0 25%;
      max-width: 25%;
  }
  @media only screen and (max-width: 768px) {
    max-width: 50%;
    flex: 0 0 50%;
  }

  @media only screen and (max-width: 450px) {
    max-width: 100%;
    flex: 0 0 100%;
  }
}

.card-wrapper {
  display: flex;
  align-items: stretch;
  flex: 1 1 auto;
  margin: 10px;
}

</style>
