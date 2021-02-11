<template>
  <div class="sidebar-container">
    <div class="sidebar-head">
      <span>
        Course chapters
      </span>
    </div>
    <div class="sidebar-items">
      <div v-for="chapter in chapters" :key="chapter.id">
        <div class="sidebar-item" @click="selectChapter(chapter)">
          <span>
          {{ chapter.chapterTitle }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  props:{
    chapters:null,
  },

  data(){
    return{
      selectedChapter:{
        type: Object,
        default: this.chapters[0],
      }
    }
  },
  methods:{
    selectChapter(chapter){
      this.$emit('chapterSelected', chapter)
    }
  }
}
</script>

<style scoped>

.sidebar-container{
  border: solid 2px lightgrey;
}

.sidebar-head{
  padding: 8px;
  padding-left: 15px;
  border-bottom: solid lightgrey;
  display: flex;
}

.sidebar-head span{
  font-size: 25px;
  justify-self: left;
}

.sidebar-items{
  max-height: 800px;
  overflow: auto;
}

.sidebar-item{
  padding: 6px;
  border-bottom: solid lightgrey;
  display: flex;
}

.sidebar-item span{
  font-size: 20px;
  justify-self: left;
}

</style>