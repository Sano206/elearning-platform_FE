import Vue from 'vue'
// eslint-disable-next-line no-unused-vars
import axios from 'axios'
import App from './App.vue'

Vue.config.productionTip = false
window.axios = require('axios');

new Vue({
  render: h => h(App),

  data(){
    return{
      info: null,
      posts: null,
      comments: null
    }
  },




}).$mount('#app')