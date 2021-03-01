<template>
  <div class="main-container">

    <div class="grid-container">
      <div class="content">
       <content-video
       :videoSource="selectedChapter.content">
       </content-video>
      </div>
      <div class="sidebar">
        <sidebar :chapters = course.courseChapters
        @chapterSelected="chapterSelected">
        </sidebar>
      </div>
      <div class="menu">
        <app-menu></app-menu>
      </div>
      <div class="description" v-text="selectedChapter.description"></div>
    </div>


  </div>
</template>

<script>
import Sidebar from "@/components/app/Sidebar";
import AppMenu from "@/components/app/AppMenu";
import ContentVideo from "@/components/app/ContentVideo";
import {singleCourseMixin} from "@/components/mixins/courseMixin";

export default {
  name: "CourseAppView",
  components: {ContentVideo, AppMenu, Sidebar},
  mixins:[singleCourseMixin],

  data(){
    return{
      course:null,
      selectedChapter:{
        type: Object,
        default: null,
      },
    }
  },

  methods:{

    chapterSelected(event){
      this.selectedChapter=event;
    }
  },

}
</script>

<style scoped>



.content{
  grid-area: content;
  background-color: black;
  max-width: 100%;
}

.sidebar{
  grid-area: sidebar;
  background-color: white;

}
.menu{
  grid-area: menu;
  border-bottom: solid lightgrey 2px;
}
.description{
  grid-area: description;

}

.grid-container{
  max-width: 1700px;
  display: grid;
  grid-template-columns: 75% 25%;
  grid-template-rows: auto auto auto;
  grid-template-areas:
    "content sidebar"
    "menu ."
    "description .";
  margin: auto;
}

.main-container{
  align-content: center;
}

</style>