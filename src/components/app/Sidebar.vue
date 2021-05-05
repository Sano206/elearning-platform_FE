<template>
  <div class="sidebar-container">
    <div class="sidebar-head">
      <span> Course chapters </span>
    </div>
    <div class="sidebar-items">
      <div v-for="(chapter) in chapters" :key="chapter.id">
        <sidebar-item
          :chapter="chapter"
          :progress="localProgress"
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
  components: { SidebarItem },
  props: {
    chapters: null,
    progress: null,
  },

  data() {
    return {
      selectedChapter: {
        type: Object,
        default: null,
      },
      localProgress: null,
    };
  },
  methods: {
    selectChapter(chapter) {
      this.$emit("chapterSelected", chapter);
      this.localProgress.push(this.selectedChapter.id);
    },

    progressChange(value, chapter) {
      this.$emit("progressChange", value, chapter);
    },

    findLastSeen() {
      for (let i = this.chapters.length-1; i >= 0; i--) {
        if (this.progress.includes(this.chapters[i].id)) {
          return i;
        }
      }
      return 0;
    },
  },

  created() {
    let index = this.findLastSeen();
    console.log(index)
    if (this.progress.length !== 0 && index !== this.chapters.length - 1) {
      index++;
    }
    this.localProgress = this.progress;
    this.selectedChapter = this.chapters[index];
    this.selectChapter(this.chapters[index]);
  },
};
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
