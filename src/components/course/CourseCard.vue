<template>
  <div class="card">
    <div class="wrapper">
      <img class="card-img-top" :src="course.thumbnail" alt="Card Image" />
    </div>
    <div
      class="card-header pb-0 pb-lg-0 header-height d-flex align-items-center justify-content-center"
    >
      <h5
        class="card-title flex-grow-1 d-flex align-items-center justify-content-center"
      >
        <a @click="showDetail">{{ course.title }}</a>
      </h5>
    </div>
    <div class="card-body flex-column h-100">
      <p class="card-text my-auto">{{ course.shortDescription }}</p>
    </div>
  </div>
</template>

<script>
import { tokenMixin } from "@/components/mixins/tokenMixin";
import { enrollCheck } from "@/components/mixins/courseMixin";

export default {
  name: "CourseCard",
  props: {
    course: {
      type: Object,
      default: null,
    },
    enrollments: null,
    myCourses: {
      type: Boolean,
      default: false,
    },
  },
  mixins: [tokenMixin, enrollCheck],

  methods: {
    showDetail() {
      if (!this.$auth.isAuthenticated) {
        this.$router.push({
          name: "courseDetail",
          params: { courseId: this.course.id },
        });
      } else if (
        this.course.instructor.userID === this.$auth.user.sub ||
        this.isAdmin
      ) {
        this.$router.push({
          name: "instructorCourseDetail",
          params: { courseId: this.course.id },
        });
      } else {
        this.$router.push({
          name: "courseDetail",
          params: { courseId: this.course.id },
        });
      }
    },
  },
};
</script>

<style scoped>
button {
  background: #073b4c;
  color: white;
}

h5 {
  cursor: pointer;
  word-break: break-all;
}

.header-height {
  height: 73px;
}

.wrapper {
  position: relative;
  overflow: hidden;
}

.wrapper:after {
  content: "";
  display: block;
  padding-top: 70%;
}

.wrapper img {
  width: auto;
  height: 100%;
  max-width: none;
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
}

@media only screen and (max-width: 768px) {
  p {
    height: 3em;
  }
}

p {
  content: "";
  height: 5em;
  display: block;
  overflow: hidden;
}
</style>
