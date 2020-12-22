<template>
  <div>
    <p>{{localChapter.chapterTitle}}</p>
    <p>{{localChapter.description}}</p>
    <p>{{localChapter.content}}</p>
  </div>
</template>

<script>
export default {
  name: "CourseChapter",
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