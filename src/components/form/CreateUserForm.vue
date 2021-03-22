<template>

  <div class="user-form">
    <input type="text" placeholder="Name.." v-model="userName">
    <input type="text" placeholder="Surname.." v-model="userSurname">
    <input type="text" placeholder="Email.." v-model="userEmail">
    <input type="text" placeholder="Password.." v-model="userPassword">
    <input type="text" placeholder="Introduction.." v-model="introduction">
    <input type="text" placeholder="Qualification.." v-model="qualification">
    <button @click="addUser">Add User</button>
    <button @click="addInstructor">Add Instructor</button>
  </div>

</template>

<script>
import axios from "axios";

export default {
  name: "CreateUserForm",
  props:{
    auth: {
      type: Object,
      default: null,
    }
  },

  data() {
    return {
      userName: null,
      userSurname: null,
      userEmail:null,
      userPassword: null,
      introduction: null,
      qualification: null,
    }
  },

  methods: {
    async addInstructor() {
      const token = await this.$auth.getTokenSilently();
      axios({
        method: 'post',
        url: '/instructors',
        headers:{
          Authorization: `Bearer ${token}`
        },
        data: {
          introduction: this.introduction,
          qualification: this.qualification,
        }
      })
          .then((response) => {
            this.$emit('userCreated', response.data)
          })
          .catch(error => console.log(error));
    },
    /*addUser() {
      axios.post('/users', {
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
    },*/
  },

}
</script>

<style scoped>

.user-form{
  display: flex;
}

</style>