<template>

  <div class="user-form">
    <input type="text" placeholder="Name.." v-model="userName">
    <input type="text" placeholder="Surname.." v-model="userSurname">
    <input type="text" placeholder="Email.." v-model="userEmail">
    <input type="text" placeholder="Password.." v-model="userPassword">
    <button @click="addUser">Add User</button>
    <button @click="addInstructor">Add Instructor</button>
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
    }
  },

  methods: {
    async addUser() {
      const token = await this.$auth.getTokenSilently();
      axios({
        method: 'post',
        url: '/users',
        headers:{
          Authorization: `Bearer ${token}`
        },
        data: {
          name: this.$auth.user.given_name,
          surname: this.$auth.user.family_name,
          email: this.$auth.user.email,
          password: "null",
        }
      })
          .then((response) => {
            this.$emit('userCreated', response.data)
          })
          .catch(error => console.log(error));
    },
    addInstructor() {
      axios.post('/instructors', {
        name: this.userName,
        surname: this.userSurname,
        email: this.userEmail,
        password: this.userPassword,
        introduction: "Nejaky uvod o typkovi",
        qualification: "Co vsetko vie",
      })
          .then((response) => {
            this.$emit('instructorCreated', response.data)
          })
          .catch(error => console.log(error));
    },
  },

}
</script>

<style scoped>

.user-form{
  display: flex;
}

</style>