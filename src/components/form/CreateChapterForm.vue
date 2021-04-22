<template>
  <div>
    <div class="form-group">
      <label for="title" class="form-label">Title:</label>
      <input type="text" class="form-control" id="title" v-model="chapterTitle">
    </div>

    <div class="form-group">
      <label for="description" class="form-label">Description:</label>
      <textarea rows="10" type="text" class="form-control" id="description" v-model="description"/>
    </div>

    <div class="form-group">
      <label for="content" class="form-label">Content:</label>
      <input type="text" class="form-control" id="content" v-model="content">
    </div>

    <button class="btn btn-scheme" @click="addChapter">Submit</button>
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
      axios.post('/courses/' + this.courseId + '/chapters', {
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
.btn-scheme {
  background: #073b4c;
  color: white;
}
</style>
