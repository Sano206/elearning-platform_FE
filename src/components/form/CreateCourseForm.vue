<template>
  <div class="course-form">
    <input type="text" placeholder="Title.." v-model="courseTitle">
    <input type="text" placeholder="Description.." v-model="courseDescription">
    <input type="text" placeholder="Short Description.." v-model="courseShortDescription">
    <input type="text" placeholder="thumbnail.." v-model="thumbnail">
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
  },

  mixins:[tokenMixin],

  data() {
    return{
      courseTitle:null,
      courseDescription: null,
      courseShortDescription:null,
      thumbnail:null,
      courseFee: null,
      courseLanguage: null,
      newCourse: null,
    }
  },


  methods:{

    async addCourse(){
      const token =await this.$auth.getTokenSilently()
      axios({
        url: '/courses',
        method: 'post',
        headers:{"Authorization": `Bearer ${token}`},
        data: {
          title: this.courseTitle,
          description: this.courseDescription,
          courseShortDescription: this.courseShortDescription,
          thumbnail: this.thumbnail,
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
