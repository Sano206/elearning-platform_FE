<template>
  <div>
    <div class="row">
      <div
          class="col-12 col-md-6 col-lg-4"
          v-for="course in courses"
          :key="course.id"
      >
        <div class="card-wrapper">
          <course-card :course="course" :enrollments="enrollments"/>
        </div>
      </div>
    </div>
    <div
        class="row mt-lg-5 justify-content-md-center align-items-center"
        v-if="courses.length === 0">
      <span class=" col col-lg-4 font-weight-bold">Sorry, no matching courses..</span>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import CourseCard from "@/components/course/CourseCard";
import {tokenMixin} from "@/components/mixins/tokenMixin";
import {enrollmentsMixin} from "@/components/mixins/courseMixin";

export default {
  name: "CoursesView",
  components: {
    CourseCard,
  },
  mixins: [tokenMixin, enrollmentsMixin],

  data() {
    return {
      courses: null,
      selectedTopic: null,
      searchString: null,
      filteredCourses: null,
    };
  },


  methods: {
    filterCourses() {
      if (this.selectedTopic !== null) {
        let filtered = []
        this.courses.forEach(course => {
          if (course.topic === this.selectedTopic) {
            filtered.push(course)
          }
        })
        return filtered
      } else {
        return this.courses
      }
    },

    searchCourses() {
        let filtered = []
        this.courses.forEach(course => {
          if (course.title.toLowerCase().includes(this.searchString.toLowerCase())) {
            filtered.push(course)
          }
        })
        return filtered
    },

    getCourses() {
      axios({
        url: "/courses",
        method: "get",
      })
          .then((response) =>{
                this.courses = response.data
                if (typeof (this.$route.params.topic) !== 'undefined') {
                  this.selectedTopic = this.$route.params.topic
                  this.courses = this.filterCourses()
                }else if (typeof (this.$route.params.substring) !== 'undefined'){
                  this.searchString = this.$route.params.substring
                  this.courses = this.searchCourses()
                }
              }
          )
          .catch((error) => console.log(error));
    },
  },

  mounted() {
    this.getCourses();
  }
};
</script>

<style scoped>
.card-wrapper {
  margin-bottom: 20px;
}

span{
  font-size: x-large;
  color: #118ab2;
}
</style>
