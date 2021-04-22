<template>
  <div>
    <h3>{{localChapter.chapterTitle}}</h3>
    <div v-html="localChapter.description"></div>
    <content-video :video-source="localChapter.content"/>
  </div>
</template>

<script>
import ContentVideo from "@/components/app/ContentVideo";
export default {
  name: "CourseChapter",
  components: {ContentVideo},
  props:{
    chapter: null,
  },

  data(){
    return{
      localChapter: null,
    }
  },

  created(){
    this.init();
  },

  methods:{
    init(){
      this.localChapter = JSON.parse(JSON.stringify(this.chapter));
    }
  }
}
</script>

<style scoped>

</style>
