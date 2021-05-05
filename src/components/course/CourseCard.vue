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
      <button class="btn m-1" v-if="myCourses" @click="openCourse">
        Enter the Course
      </button>
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
      if (
        !this.$auth.isAuthenticated ||
        !(this.course.instructor.userID === this.$auth.user.sub)
      ) {
        this.$router.push("/detail/" + this.course.id);
      } else if (this.course.instructor.userID === this.$auth.user.sub) {
        this.$router.push("/instructor/courses/" + this.course.id);
      }
    },

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

/*
.course-card-wrapper{
  border: solid black;
  border-radius: 8px;
  display: flex;
  flex-direction: column;

  padding: 16px;
  box-shadow: 0px 5px 10px 0px rgba(0,0,0,0.2);
}

.course-author{
  margin: 8px;
  padding-bottom: 16px;

  color: #FFA69E;
  border-bottom: 1px solid #FFA69E;
}

.course-description {
  display: flex;
  justify-content: center;
  flex-grow: 1;
}

.course-title {
  font-size: large;
}*/
</style>
