<template>
  <div>
    <div class="form-group">
      <label for="title" class="form-label">Title:</label>
      <input
        type="text"
        class="form-control"
        id="title"
        v-model="chapterTitle"
      />
    </div>

    <div class="form-group">
      <label for="description" class="form-label">Description:</label>
      <textarea
        rows="10"
        type="text"
        class="form-control"
        id="description"
        v-model="description"
      />
    </div>

    <div class="form-group">
      <label for="content" class="form-label">Content:</label>
      <input type="text" class="form-control" id="content" v-model="content" />
    </div>

    <div class="form-group">
      <label for="position" class="form-label">Position:</label>
      <input
        type="number"
        :max="courseChaptersAmount + 1"
        min="1"
        class="form-control"
        id="position"
        v-model="position"
      />
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
    courseChaptersAmount: Number,
  },
  data() {
    return {
      chapterTitle: null,
      description: null,
      content: null,
      position: null,
    };
  },

  computed: {
    reducedPosition() {
      return this.position - 1;
    },
  },

  methods: {
    addChapter() {
      if (
        this.reducedPosition < 0 ||
        this.reducedPosition > this.courseChaptersAmount
      ) {
        alert("Invalid position number");
      } else {
        axios
          .post("/courses/" + this.courseId + "/chapters", {
            chapterTitle: this.chapterTitle,
            description: this.description,
            content: this.content,
            position: this.reducedPosition,
          })
          .then((response) => {
            this.$emit("chapterCreated", response.data);
          })
          .catch((error) => console.log(error));
      }
    },
  },

  created() {
    this.position = this.courseChaptersAmount + 1;
  },
};
</script>

<style scoped>
.btn-scheme {
  background: #073b4c;
  color: white;
}
</style>
