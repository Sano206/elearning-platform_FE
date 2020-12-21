<template>
  <div>
    <div>
      <input type="text" v-model="userName">
      <input type="text" v-model="userSurname">
      <input type="text" v-model="userEmail">
      <input type="text" v-model="userPassword">
      <button @click="addUser">Submit</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CreateUserForm",
  props:{

  },

  data() {
    return {
      userName: null,
      userSurname: null,
      userEmail: null,
      userPassword: null,
      newUser: null,
    }
  },

  methods: {
    addUser() {
      axios.post('https://elearningplatform.herokuapp.com/users', {
        name: this.userName,
        surname: this.userSurname,
        email: this.userEmail,
        password: this.userPassword,
        introduction: "",
        qualification: "",
      })
          .catch(error => console.log(error));
      this.$emit('userCreated', this.newUser= {
            name: this.userName,
            surname: this.userSurname,
            email: this.userEmail,
            password: this.userPassword,
            introduction: "",
            qualification: "",
          });

    },
  },

}
</script>

<style scoped>

</style>