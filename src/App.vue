<template>
  <div id="app">
    <button @click="getUsers">Get Users</button>
    <button @click="getCourses">Get Courses</button>
    <div
        class="row"
        v-for="course in courses"
        :key="course.id"
    >
      <div class="card-wrapper">
        <course-card
            :course="course"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import CourseCard from "@/components/CourseCard";

export default {
  name: 'App',
  components: {
    CourseCard
  },

  data(){
    return{
      users: null,
      courses: null,
    }
  },

  methods:{
    getUsers(){
      axios.get('https://elearningplatform.herokuapp.com/users')
          .then(response => this.users = response.data)
      .catch(error => console.log(error))
    },

    getCourses(){
      axios.get('https://elearningplatform.herokuapp.com/courses')
          .then(response => this.courses = response.data)
          .catch(error => console.log(error))
    }
  }

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
