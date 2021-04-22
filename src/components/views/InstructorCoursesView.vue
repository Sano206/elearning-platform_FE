<template>
  <div>
    <div v-if="courses !== null && !newCourse">
      <div class="row">
        <div
            class="col-12 col-md-6 col-lg-4"
            v-for="course in courses"
            :key="course.id"
        >
          <div class="card-wrapper">
            <course-card
                :course="course"
                :enrollments="enrollments"
            />
          </div>
        </div>
      </div>
    </div>

    <button v-if="!newCourse" @click="newCourse = true">Create new Course</button>

    <div v-if="newCourse" class="row">
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
import {enrollmentsMixin} from "@/components/mixins/courseMixin";


export default {
  name: "InstructorCoursesView",
  components: {
    CourseCard,
    CreateCourseForm,
  },
  mixins: [tokenMixin, enrollmentsMixin],

  data() {
    return {
      courses: null,
      newCourse: false,
    }
  },


  methods: {
    getMyCourses() {
      axios({
        url: '/courses/instructor',
        method: 'get',
      })
          .then(response => {
            this.courses = response.data
            console.log({courses: this.courses})
          })
          .catch(error => console.log(error))
    },

    courseCreated(event) {
      this.getMyCourses();
      this.courses.push(event);
      this.newCourse = false;
    },
  },

/*  updated() {
    this.getMyCourses()
  },*/

  mounted() {
    this.getMyCourses();
  },
}
</script>

<style scoped>

</style>
