<template>
  <div class="course-form">
    <input type="text" placeholder="Title.." v-model="courseTitle">
    <input type="text" placeholder="Description.." v-model="courseDescription">
    <input type="number" placeholder="Fee.." v-model.number="courseFee">
    <input type="text" placeholder="Language.." v-model="courseLanguage">
    <button @click="addCourse">Submit</button>
  </div>
</template>

<script>
import axios from "axios";
import {tokenMixin} from "@/components/mixins/tokenMixin";

export default {
name: "CreateCourseForm",
  props:{
    instructors: null,
  },

  mixins:[tokenMixin],

  data() {
    return{
      courseTitle:null,
      courseDescription: null,
      courseFee: null,
      courseLanguage: null,
      newCourse: null,
    }
  },


  methods:{

    fullName(instructor){
      return instructor.user.name +' '+ instructor.user.surname
    },

    addCourse(){
      axios({
        url: '/courses',
        method: 'post',
        data: {
          title: this.courseTitle,
          description: this.courseDescription,
          fee: this.courseFee,
          language: this.courseLanguage,
        }
      })
          .then((response) => {
            this.$emit('courseCreated', response.data)})
          .catch(error => console.log(error));
    }
  }

}
</script>

<style scoped>

</style>