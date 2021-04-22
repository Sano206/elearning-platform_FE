<template>

  <div class="card" >
    <img class="card-img-top" src="../../assets/witcher.jpg" alt="Card Image">
    <div class="card-body">
      <h5 class="card-title "><a @click="showDetail">{{ course.title }}</a></h5>
      <p class="card-text">{{
          course.shortDescription
        }}</p>
      <button class="btn m-1" @click="openCourse">Vstup do kurzu</button>
      <button class="btn m-1" v-if="!isEnrolled && !justEnrolled" @click="enroll">Enroll</button>
    </div>
  </div>

</template>

<script>
import {tokenMixin} from "@/components/mixins/tokenMixin";
import axios from "axios";

export default {
  name: "CourseCard",
  props: {
    course: {
      type: Object,
      default: null,
    },
    enrollments: null,
  },
  mixins: [tokenMixin],

  data() {
    return {
      justEnrolled: false,
    }
  },

  computed: {
    isEnrolled() {
      for (let enrollment of this.enrollments) {
        if (enrollment.course.id === this.course.id) {
          return true
        }
      }
      return false
    },
  },

  methods: {
    showDetail() {
      if (this.course.instructor.userID === this.$auth.user.sub) {
        this.$router.push('/instructor/courses/' + this.course.id)
      } else {
        this.$router.push('/courses/' + this.course.id)
      }
    },

    openCourse() {
      this.$router.push('/courses/app/' + this.course.id)
    },


    enroll() {
      axios({
        method: 'post',
        url: '/enrollments',
        data: {
          courseId: this.course.id,
        }
      })
          .then(response => {
            if (response.data === '') {
              alert("Already enrolled!")
            }
            this.justEnrolled = true;
          })
          .catch(error => console.log(error));
    },


  },


}
</script>

<style scoped>
button{
  background: #073b4c;
  color: white;
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
