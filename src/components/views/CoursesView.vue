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
            @courseCreated="courseCreated"
        ></create-course-form>
      </div>
    </div>


  </div>
</template>

<script>
import axios from "axios";
import CourseCard from "@/components/course/CourseCard";
import CreateCourseForm from "@/components/form/CreateCourseForm";
import {tokenMixin} from "@/components/mixins/tokenMixin";

export default {
  name: "CoursesView",
  components: {
    CourseCard,
    CreateCourseForm,
  },
  mixins:[tokenMixin],

  data() {
    return {
      courses: null,
      newCourse: false,
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
  },
}
</script>

<style scoped>

</style>