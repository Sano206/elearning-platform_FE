<template>
  <div class="course-card-wrapper">
    <div v-if="userEdited === localUser.id" @keyup.enter="updateUser(localUser)">
      <input type="text" v-model="localUser.name">
      <input type="text" v-model="localUser.surname">
      <input type="text" v-model="localUser.email">
      <input type="text" v-model="localUser.password">
      <button @click="updateUser(localUser)">Update</button>
    </div>
    <div v-else>
      <div class="course-title">
        {{ localUser.name }}
      </div>
      <p class="course-description">
        {{ localUser.surname }}
      </p>
      <span class="course-author">
      {{ localUser.email }}
    </span>
      <div
          v-for="item in localUser.enrollments"
          :key="item.id"
      >{{ item.course.title }}
      </div>
      <button @click="userEdited = localUser.id">Edit</button>
      <button @click="deleteUser(localUser)">Delete</button>
    </div>


  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UserCard",
  props: {
    user: {
      type: Object,
      default: null,
    }
  },
  data() {
    return {
      userEdited: null,
      localUser: null,
    }
  },

  created() {
    this.init();
  },

  methods: {
    init() {
      this.localUser = JSON.parse(JSON.stringify(this.user))
    },

    updateUser(user) {
      axios.put('https://elearningplatform.herokuapp.com/users/' + user.id, {
        name: this.localUser.name,
        surname: this.localUser.surname,
        email: this.localUser.email,
        password: this.localUser.password
      })
          .then((response) =>{
            this.userEdited = null;
            this.$emit('userUpdated', response)
          })
          .catch(error => console.log(error));
    },

    deleteUser(user) {
      try {
        axios.delete('https://elearningplatform.herokuapp.com/users/' + user.id)
        this.$emit('userDeleted', user.id)
      } catch (error) {
        console.log(error)
      }
    },

  },
}
</script>

<style scoped>

.course-card-wrapper {
  border: solid black;
  border-radius: 3px;
  display: flex;
  flex-direction: column;

  padding: 16px;
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.2);
}

.course-author {
  margin: 8px;
  padding-bottom: 16px;

  color: #FFA69E;
  border-bottom: 1px solid #FFA69E;
}

.course-description {
  display: flex;
  justify-content: center;
  flex-grow: 1;
}

.course-title {
  font-size: large;
}

</style>