<template>
  <div>
    <div class="row">
      <div
          class="col-12 col-md-4"
          v-for="enrollment in enrollments"
          :key="enrollment.course.id"
      >
        <div class="card-wrapper">
          <course-card
              :course="enrollment.course"
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
  name: "MyCoursesView",
components: {
    CourseCard,
  },
  mixins:[tokenMixin],

  data() {
    return {
      enrollments:null,
    }
  },



  methods: {
    getMyCourses() {
      axios({
        url: '/enrollments',
        method: 'get',
      })
          .then(response => this.enrollments = response.data)
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
