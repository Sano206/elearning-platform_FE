<template>
  <div>
    <div class="row">
      <div
          class="col-12 col-md-6 col-lg-4"
          v-for="enrollment in enrollments"
          :key="enrollment.course.id"
      >
        <div class="card-wrapper">
          <course-card
              :course="enrollment.course"
              :enrollments="enrollments"
              :myCourses="true"
          />
        </div>
      </div>
    </div>



  </div>
</template>

<script>
import CourseCard from "@/components/course/CourseCard";
import {tokenMixin} from "@/components/mixins/tokenMixin";
import {enrollmentsMixin} from "@/components/mixins/courseMixin";

export default {
  name: "MyCoursesView",
components: {
    CourseCard,
  },
  mixins:[tokenMixin, enrollmentsMixin],

  data() {
    return {
    }
  },



}
</script>

<style scoped>

</style>
