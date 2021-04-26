<template>
  <div class="flex-row d-flex border-bottom sidebar-item">
          <span class="p-2 pointer"
                @click="selectChapter"
          >
          {{ chapter.chapterTitle }}
          </span>
    <button class="btn ml-auto mr-2 my-auto" @click="progressChange(false)" v-if="localSeen">✓</button>
    <button class="btn ml-auto mr-2 my-auto" @click="progressChange(true)" v-if="!localSeen">x</button>
  </div>
</template>

<script>
export default {
  name: "SidebarItem",
  props: {
    chapter: null,
    seen: false,
  },
  data() {
    return {
      localSeen: false
    }
  },

  created(){
    this.localSeen = this.seen
  },

  methods: {
    progressChange(value) {
      this.localSeen = !this.localSeen
      this.$emit('progressChange', value, this.chapter.id)
    },
    selectChapter(){
      this.$emit('selectChapter', this.chapter)
    }
  },
}
</script>

<style scoped>

.pointer {
  cursor: pointer;
}
.sidebar-item:hover {
  background-color: lightgrey;
}



</style>
