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

  </div>
</template>

<script>
import axios from "axios";
import CourseCard from "@/components/course/CourseCard";
import CreateCourseForm from "@/components/form/CreateCourseForm";

export default {
  name: "CoursesView",
  components:{
    CourseCard,
    CreateCourseForm,
  },
  data(){
    return{
      courses: null,
      instructors: null,
      newCourse: false,
    }
  },
  methods:{
    courseCreated(event){
      this.getCourses();
      this.courses.push(event);
      this.newCourse = false;
    },

    getCourses(){
        axios.get('/courses')
            .then(response => this.courses = response.data)
            .catch(error => console.log(error))
    }
  },

  created() {
    this.getCourses();
    axios.get('/instructors')
        .then(response => this.instructors = response.data)
        .catch(error => console.log(error))
  },
}
</script>

<style scoped>

</style>