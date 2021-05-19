<template>
  <div v-if="course">
    <div class="breadcrumb">
      /
      <router-link :to="/topic/ + course.topic">{{ course.topic }}</router-link>
    </div>
    <div class="d-flex flex-row no-gutters">
      <h1 class="header p-2">{{ course.title }}</h1>
      <button
        class="btn px-4 mt-auto ml-auto"
        v-if="isEnrolled || (justEnrolled && this.$auth.isAuthenticated)"
        @click="openCourse"
      >
        Enter the Course
      </button>
      <button
        class="btn px-4 mt-auto ml-auto"
        v-if="!isEnrolled && !justEnrolled && this.$auth.isAuthenticated"
        @click="enroll"
      >
        Enroll
      </button>
    </div>

    <div class="d-flex flex-row pb-2 pt-2">
      <h4>{{ course.instructor.name }} {{ course.instructor.surname }}</h4>
      <span class="ml-auto mr-4 text-black-50">{{ course.fee }} €</span>
    </div>

    <div class="d-flex flex-row pb-4">
      <h5 class="text-black-50">Course language: {{ course.language }}</h5>
    </div>

    <div v-html="course.description"></div>
  </div>
</template>

<script>
import {
  enrollCheck,
  enrollmentsMixin,
  singleCourseMixin,
} from "@/components/mixins/courseMixin";
import { tokenMixin } from "@/components/mixins/tokenMixin";

export default {
  name: "CourseCardDetail",
  components: {},
  mixins: [singleCourseMixin, tokenMixin, enrollCheck, enrollmentsMixin],

  data() {
    return {
      course: null,
    };
  },

  watch: {
    $route() {
      this.fetchDetail();
    },
  },
  methods: {
    openCourse() {
      this.$router.push("/app/" + this.course.id);
    },
  },
};
</script>

<style scoped>
button {
  background: #073b4c;
  color: white;
}

.header {
  border-bottom: #118ab2 solid 1px;
}
</style>
