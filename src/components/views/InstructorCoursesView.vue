<template>
  <div>
    <div class="row">
      <div
          class="col-12 col-md-4"
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



  </div>
</template>

<script>
import CourseCard from "@/components/course/CourseCard";
import {tokenMixin} from "@/components/mixins/tokenMixin";

export default {
  name: "InstructorCoursesView",
  components: {
    CourseCard,
  },
  mixins:[tokenMixin],

  data() {
    return {
      courses:null,
    }
  },




  methods: {
    getMyCourses() {
      axios({
        url: '/courses/instructor',
        method: 'get',
      })
          .then(response => this.courses = response.data)
          .catch(error => console.log(error))
    }
  },

   mounted() {
     this.getMyCourses();
  },
}
</script>

<style scoped>

</style>
