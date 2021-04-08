<template>
  <div v-if="course" class="course-detail-wrapper">

    <div>
      <p>{{course.title}}</p>
      <p>{{course.description}}</p>
      <p>{{course.fee}}</p>
      <p>{{course.language}}</p>
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

  </div>
</template>

<script>
import axios from "axios";
import CourseChapter from "@/components/course/CourseChapter";
import CreateChapterForm from "@/components/form/CreateChapterForm";
import {singleCourseMixin} from "@/components/mixins/courseMixin";
import {tokenMixin} from "@/components/mixins/tokenMixin";

export default {              //TODO:fix render - top div v-if
  name: "CourseCardDetail",
  components:{
    CourseChapter,
    CreateChapterForm
  },
  mixins:[singleCourseMixin, tokenMixin],

  data(){
    return{
      course:null,
    }
  },
  watch:{
    '$route' (){
      this.fetchDetail();
    }
  },
  methods:{

  },

}


</script>

<style scoped>

.course-detail-wrapper{
  overflow: scroll;
}

</style>
