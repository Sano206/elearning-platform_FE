<template>
  <div class="view">
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

    <button @click="newCourse = true">Create new Course</button>

    <div v-if="newCourse === true" class="row">
      <div class="card-wrapper">
        <create-course-form
            :instructors="instructors"
            @courseCreated="courseCreated"
        ></create-course-form>
      </div>
    </div>

    <p>{{token}}</p>

  </div>
</template>

<script>
import axios from "axios";
import CourseCard from "@/components/course/CourseCard";
import CreateCourseForm from "@/components/form/CreateCourseForm";

export default {
  name: "CoursesView",
  components: {
    CourseCard,
    CreateCourseForm,
  },
  data() {
    return {
      courses: null,
      instructors: null,
      newCourse: false,
    }
  },

  computed:{
    token(){
      return this.$store.getters.getToken
    }
  },

  methods: {
    courseCreated(event) {
      this.getCourses();
      this.courses.push(event);
      this.newCourse = false;
    },

    getCourses() {
      axios({
        url: '/courses',
        method: 'get',
      })
          .then(response => this.courses = response.data)
          .catch(error => console.log(error))
    }
  },

  created() {
    this.getCourses();
        axios({
      url: '/instructors',
      method: 'get'
    })
        .then(response => this.instructors = response.data)
        .catch(error => console.log(error))

  },
}
</script>

<style scoped>

</style>