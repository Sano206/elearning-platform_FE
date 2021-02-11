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
import axios from "axios";
import Sidebar from "@/components/app/Sidebar";
import AppMenu from "@/components/app/AppMenu";
import ContentVideo from "@/components/app/ContentVideo";

export default {
  name: "CourseAppView",
  components: {ContentVideo, AppMenu, Sidebar},

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
    fetchDetail(){
      axios.get('/courses/'+ this.$route.params.courseId)
          .then(response => this.course = response.data)
          .catch(error => console.log(error))
    },

    chapterSelected(event){
      this.selectedChapter=event;
    }
  },

  created(){
    this.fetchDetail()
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