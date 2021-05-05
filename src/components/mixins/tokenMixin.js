export const tokenMixin = {
  computed: {
    token() {
      return this.$store.getters.token;
    },
    isInstructor() {
      return this.$store.getters.isInstructor;
    },
    isAdmin() {
      return this.$store.getters.isAdmin;
    },
  },

  mounted() {
    if(this.$auth.isAuthenticated){
      window.axios.defaults.headers.common = {
        Authorization: `Bearer ${this.token}`,
      }
    }
  },
};
