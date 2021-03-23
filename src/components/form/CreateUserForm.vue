<template>

  <div class="user-form">
    <input type="text" placeholder="Name.." v-model="userName">
    <input type="text" placeholder="Surname.." v-model="userSurname">
    <input type="text" placeholder="Introduction.." v-model="introduction">
    <input type="text" placeholder="Qualification.." v-model="qualification">
    <button @click="addInstructor">Add Instructor</button>
  </div>

</template>

<script>
import axios from "axios";
import {tokenMixin} from "@/components/mixins/tokenMixin";

export default {
  name: "CreateUserForm",
  props:{
    auth: {
      type: Object,
      default: null,
    }
  },
  mixins:[tokenMixin],

  data() {
    return {
      userName: null,
      userSurname: null,
      introduction: null,
      qualification: null,
    }
  },

  methods: {
    addInstructor() {
      axios({
        method: 'post',
        url: '/instructors',
        data: {
          name: this.userName,
          surname: this.userSurname,
          introduction: this.introduction,
          qualification: this.qualification,
        }
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