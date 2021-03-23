<template>
  <div class="view">

    <div
        class="row"
        v-for="user in users"
        :key="user.id"
    >
      <div class="card-wrapper">
        <user-card
            :user="user"
            @userUpdated="userupdated"
            @userDeleted="userdeleted"
        />
      </div>
    </div>

    <button @click="newUser = true">Create User</button>

    <div v-if="newUser" class="row">
      <create-user-form
          class="card-wrapper"
          :auth="$auth"
          @instructorCreated="instructorCreated"

      ></create-user-form>
    </div>


  </div>
</template>

<script>
import UserCard from "@/components/UserCard";
import CreateUserForm from "@/components/form/CreateUserForm";
import axios from "axios";

export default {
name: "UsersView",
  components:{
    CreateUserForm,
    UserCard,
  },
  data(){
    return{
      users: null,
      instructors: null,
      newUser: false,
    }
  },

  methods:{
    userupdated(event){
      let index = this.users.findIndex(user => user.id === event.id);
      this.users[index].name = event.name;
      this.users[index].surname = event.surname;
      this.users[index].email = event.email;
      this.users[index].password = event.password;
    },

    userCreated(event) {
      this.users.push(event)
      this.newUser = false
    },
    instructorCreated(event) {
      this.instructors.push(event)
      this.newUser = false
    },


    userdeleted(event){
      let index = this.users.findIndex(user => user.id === event)
      this.users.splice(index,1)
    }

  },

  created() {
    axios.get('/users')
        .then(response => this.users = response.data)
        .catch(error => console.log(error))

    axios.get('/instructors')
        .then(response => this.instructors = response.data)
        .catch(error => console.log(error))

  },
}
</script>

<style scoped>

.view{
  margin-bottom: auto;
}

</style>