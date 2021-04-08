<template>
  <div class="course-card-wrapper">
    <div class="course-title">
      {{course.title}}
    </div>
    <p class="course-description">
      {{course.description}}
    </p>
    <button @click="showDetail">Detail</button>
    <button @click="openCourse">Vstup do kurzu</button>
    <button @click="enroll">Enroll</button>

  </div>

</template>

<script>
import {tokenMixin} from "@/components/mixins/tokenMixin";
import axios from "axios";

export default {
name: "CourseCard",
  props:{
    course:{
      type: Object,
      default: null,
    }
  },
  mixins:[tokenMixin],

  methods:{
    showDetail(){
      if(this.course.instructor.userID === this.$auth.user.sub){
        this.$router.push('/instructor/courses/'+this.course.id)
      }else{
        this.$router.push('/courses/'+this.course.id)
      }
    },

    openCourse(){
      this.$router.push('/courses/app/'+this.course.id)
    },

    enroll(){
      axios({
        method: 'post',
        url: '/enrollments',
        data: {
          courseId: this.course.id,
        }
      })
          .then(response => {
            if(response.data === ''){
              alert("Already enrolled!")
            }
          })
          .catch(error => console.log(error));
    },


  },


}
</script>

<style scoped>

.course-card-wrapper{
  border: solid black;
  border-radius: 3px;
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
}
</style>
