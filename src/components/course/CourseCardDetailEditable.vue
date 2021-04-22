<template>
  <div v-if="course" class="course-detail-wrapper">
    <div v-if="courseEdited === true">
      <input type="text" v-model="course.title">
      <input type="text" v-model="course.description">
      <input type="text" v-model="course.fee">
      <input type="text" v-model="course.language">
      <button @click="updateCourse()">Update</button>
      <button @click="courseEdited = false">Cancel</button>
    </div>
    <div v-else-if="course !== null">
      <p>{{course.title}}</p>
      <p>{{course.description}}</p>
      <p>{{course.fee}}</p>
      <p>{{course.language}}</p>
      <button v-if="isInstructor" @click="courseEdited = true">Edit</button>
    </div>


    <div class="course-chapter-wrapper">
      <div
          v-for="chapter in course.courseChapters"
          :key="chapter.id"
      >
        <course-chapter
          :chapter="chapter"
          ></course-chapter>
      </div>
    </div>


    <button v-if="isInstructor" @click="newChapter = true">Create new Chapter</button>

    <div v-if="newChapter === true" class="row">
      <div class="course-chapter-wrapper">
        <create-chapter-form
            :courseId="course.id"
            @chapterCreated="chapterCreated"
        ></create-chapter-form>
      </div>
    </div>


  </div>
</template>

<script>
import axios from "axios";
import CourseChapter from "@/components/course/CourseChapter";
import CreateChapterForm from "@/components/form/CreateChapterForm";
import {singleCourseMixin} from "@/components/mixins/courseMixin";
import {tokenMixin} from "@/components/mixins/tokenMixin";
import store from "@/store";

export default {              //TODO:fix render - top div v-if
  name: "CourseCardDetailEditable",
  components:{
    CourseChapter,
    CreateChapterForm
  },
  mixins:[singleCourseMixin, tokenMixin],

  data(){
    return{
      course:null,
      courseEdited:{
        type: Boolean,
        default: false,
      },
      newChapter: false,
    }
  },



  watch:{
    '$route' (){
      this.fetchDetail();
      this.courseEdited = false;
    }
  },
  methods:{
    checkInstructor(){
      if(this.course.instructor.userID !== this.$auth.user.sub){
        console.log(this.course.instructor)
        this.$router.push('/courses/'+this.course.id)
      }
    },

    updateCourse() {
      axios.put('/courses/' + this.course.id, {
        title: this.course.title,
        description: this.course.description,
        fee: this.course.fee,
        language: this.course.language
      })
          .then((response) =>{
            if(response.data === ""){
              alert("Cannot do!")
            }else{
              this.courseEdited = false;
              this.$emit('courseUpdated', response)
            }
          })
          .catch(error => console.log(error));

    },

    chapterCreated(){
      this.fetchDetail();
      //this.courses.push(event);
      this.newChapter = false;
    }
  },


  updated() {
    this.checkInstructor()
  }


}


</script>

<style scoped>

.course-detail-wrapper{
  overflow: scroll;
}

</style>
