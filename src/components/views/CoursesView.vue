<template>
  <div>
    <div class="row">
      <div
        class="col-12 col-md-6 col-lg-4"
        v-for="course in courses"
        :key="course.id"
      >
        <div class="card-wrapper">
          <course-card :course="course" :enrollments="enrollments" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import CourseCard from "@/components/course/CourseCard";
import { tokenMixin } from "@/components/mixins/tokenMixin";
import { enrollmentsMixin } from "@/components/mixins/courseMixin";

export default {
  name: "CoursesView",
  components: {
    CourseCard,
  },
  mixins: [tokenMixin, enrollmentsMixin],

  data() {
    return {
      courses: null,
    };
  },

  methods: {
    getCourses() {
      axios({
        url: "/courses",
        method: "get",
      })
        .then((response) => (this.courses = response.data))
        .catch((error) => console.log(error));
    },
  },

  mounted() {
    this.getCourses();
  },
};
</script>

<style scoped>
.card-wrapper {
  margin-bottom: 20px;
}
</style>
