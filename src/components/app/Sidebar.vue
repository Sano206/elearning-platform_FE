<template>
  <div class="sidebar-container">
    <div class="sidebar-head">
      <span>
        Course chapters
      </span>
    </div>
    <div class="sidebar-items">
      <div v-for="(chapter, index) in chapters" :key="chapter.id">
        <sidebar-item
          :chapter=chapter
          :seen=progress[index]
          @progressChange="progressChange"
          @selectChapter="selectChapter"
        />
      </div>
    </div>
  </div>
</template>

<script>
import SidebarItem from "@/components/app/SidebarItem";
export default {
  name: "Sidebar",
  components: {SidebarItem},
  props: {
    chapters: null,
    progress: null,
  },

  data() {
    return {
      selectedChapter: {
        type: Object,
        default: null,
      }
    }
  },
  methods: {
    selectChapter(chapter) {
      this.$emit('chapterSelected', chapter)
    },

    progressChange(value, chapter){
      this.$emit('progressChange', value, chapter)
    }
  },

  created() {
    let index = this.progress.lastIndexOf(true)
    if(index === -1){
      index = 0
    }else if(index !== (this.progress.length-1)){
      index++
    }
    this.selectedChapter = this.chapters[index]
    this.selectChapter(this.chapters[index])
  }
}
</script>

<style scoped>

.sidebar-container {
  border: solid 2px lightgrey;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
}

.sidebar-head {
  padding: 8px;
  padding-left: 15px;
  border-bottom: solid lightgrey;
  display: flex;
}

.sidebar-head span {
  font-size: 25px;
  justify-self: left;
}

.sidebar-items {
  max-height: 800px;
  overflow: auto;
}


</style>
