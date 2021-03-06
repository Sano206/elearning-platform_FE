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
    <loading v-if="isLoading" />
    <div
      class="row mt-lg-5 justify-content-md-center align-items-center"
      v-else-if="courses.length === 0"
    >
      <span class="col col-lg-4 font-weight-bold"
        >Sorry, no matching courses..</span
      >
    </div>
  </div>
</template>

<script>
import axios from "axios";
import CourseCard from "@/components/course/CourseCard";
import { tokenMixin } from "@/components/mixins/tokenMixin";
import { enrollmentsMixin } from "@/components/mixins/courseMixin";
import Loading from "@/components/Loading";

export default {
  name: "CoursesView",
  components: {
    Loading,
    CourseCard,
  },
  mixins: [tokenMixin, enrollmentsMixin],

  data() {
    return {
      courses: [],
      selectedTopic: null,
      searchString: null,
      filteredCourses: null,
      isLoading: true,
    };
  },

  methods: {
    filterCourses() {
      if (this.selectedTopic !== null) {
        return this.courses.filter((c) => c.topic === this.selectedTopic);
      } else {
        return this.courses;
      }
    },

    searchCourses() {
      return this.courses.filter((c) =>
        c.title.toLowerCase().includes(this.searchString.toLowerCase())
      );
    },

    getCourses() {
      axios({
        url: "/courses",
        method: "get",
      })
        .then((response) => {
          this.courses = response.data;
          if (typeof this.$route.params.topic !== "undefined") {
            this.selectedTopic = this.$route.params.topic;
            this.courses = this.filterCourses();
          } else if (typeof this.$route.params.substring !== "undefined") {
            this.searchString = this.$route.params.substring;
            this.courses = this.searchCourses();
          }
          this.isLoading = false;
        })
        .catch((error) => console.log(error));
    },
  },

  created() {
    this.getCourses();
  },
};
</script>

<style scoped>
.card-wrapper {
  margin-bottom: 20px;
}

span {
  font-size: x-large;
  color: #118ab2;
}
</style>
