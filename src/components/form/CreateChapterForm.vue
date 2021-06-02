<template>
  <div>
    <div class="form-group">
      <label for="title" class="form-label">Title:</label>
      <input type="text" class="form-control" id="title" v-model="title" />
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
        :max="numberOfChapters"
        min="1"
        class="form-control"
        id="position"
        v-model="position"
      />
    </div>

    <button class="btn btn-scheme" @click="addChapter">Submit</button>
    <button class="btn m-1 btn-danger" @click="cancelChapterCreation">
      Cancel
    </button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CreateChapterForm",
  data() {
    return {
      title: "",
      description: "",
      content: "",
      position: null,
      courseId: null,
      numberOfChapters: Number,
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
        this.reducedPosition > this.numberOfChapters
      ) {
        alert("Invalid position number");
      } else {
        axios
          .post(`/courses/${this.courseId}/chapters`, {
            title: this.title,
            description: this.description,
            content: this.content,
            position: this.reducedPosition,
          })
          .then(() => {
            this.$router.push({
              name: "instructorCourseDetail",
              params: { courseId: this.courseId },
            });
          })
          .catch((error) => alert(error.response.data.message));
      }
    },

    cancelChapterCreation() {
      this.$router.push({
        name: "instructorCourseDetail",
        params: { courseId: this.courseId },
      });
    },
  },

  created() {
    this.position = this.$route.params["numberOfChapters"] + 1;
    this.numberOfChapters = this.$route.params["numberOfChapters"] + 1;
    this.courseId = this.$route.params["courseId"];
  },
};
</script>

<style scoped>
.btn-scheme {
  background: #073b4c;
  color: white;
}
</style>
