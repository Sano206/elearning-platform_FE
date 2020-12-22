<template>
  <div>
    <input type="text" placeholder="Title.." v-model="chapterTitle">
    <input type="text" placeholder="Description.." v-model="description">
    <input type="text" placeholder="Content.." v-model="content">
    <button @click="addChapter">Submit</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CreateChapterForm",
  props: {
    courseId: null,
  },
  data() {
    return {
      chapterTitle: null,
      description: null,
      content: null,
    }
  },

  methods: {
    addChapter() {
      axios.post('https://elearningplatform.herokuapp.com/courses/' + this.courseId + '/chapters', {
        chapterTitle: this.chapterTitle,
        description: this.description,
        content: this.content,
      })
          .then((response) => {
            this.$emit('chapterCreated', response.data)
          })
          .catch(error => console.log(error));
    },
  },
}
</script>

<style scoped>

</style>
