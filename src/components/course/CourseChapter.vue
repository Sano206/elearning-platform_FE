<template>
  <div>
    <div v-if="!chapterBeingEdited">
      <div class="d-flex flex-row no-gutters">
        <h3 class="header p-2">{{ localChapter.title }}</h3>
        <button
          class="btn px-4 mt-auto ml-auto btn-scheme"
          v-if="isInstructor"
          @click="chapterBeingEdited = true"
        >
          Edit
        </button>
      </div>

      <div v-html="localChapter.description"></div>
      <content-video :video-source="localChapter.content" />
    </div>
    <div v-else>
      <div class="form-group">
        <label for="title" class="form-label">Title:</label>
        <input
          type="text"
          class="form-control"
          id="title"
          v-model="localChapter.title"
        />
      </div>

      <div class="form-group">
        <label for="description" class="form-label">Description:</label>
        <textarea
          rows="10"
          type="text"
          class="form-control"
          id="description"
          v-model="localChapter.description"
        />
      </div>

      <div class="form-group">
        <label for="content" class="form-label">Content:</label>
        <input
          type="text"
          class="form-control"
          id="content"
          v-model="localChapter.content"
        />
      </div>

      <div class="form-group">
        <label for="position" class="form-label">Position:</label>
        <input
          type="number"
          :max="courseChaptersAmount"
          min="1"
          class="form-control"
          id="position"
          v-model="position"
        />
      </div>

      <button class="btn m-1 btn-dark" @click="updateChapter">Update</button>
      <button class="btn m-1 btn-danger" @click="chapterBeingEdited = false">
        Cancel
      </button>
    </div>
  </div>
</template>

<script>
import ContentVideo from "@/components/app/ContentVideo";
import { tokenMixin } from "@/components/mixins/tokenMixin";
import axios from "axios";

export default {
  name: "CourseChapter",
  components: { ContentVideo },
  props: {
    chapter: null,
    courseChaptersAmount: Number,
  },

  mixins: [tokenMixin],

  data() {
    return {
      chapterBeingEdited: false,
      localChapter: null,
      position: null,
    };
  },

  computed: {
    reducedPosition() {
      return this.position - 1;
    },
  },

  created() {
    this.init();
  },

  methods: {
    init() {
      this.localChapter = JSON.parse(JSON.stringify(this.chapter));
      this.position = this.chapter.position + 1;
    },

    updateChapter() {
      if (
        this.reducedPosition < 0 ||
        this.reducedPosition > this.courseChaptersAmount
      ) {
        return alert("Invalid position number");
      }
      axios
        .put(`/chapters/${this.localChapter.id}`, {
          title: this.localChapter.title,
          description: this.localChapter.description,
          content: this.localChapter.content,
          position: this.reducedPosition,
        })
        .then((response) => {
          this.chapterBeingEdited = false;
          this.$emit("chapterUpdated", response);
        })
        .catch((error) => alert(error.response.data.message));
    },
  },
};
</script>

<style scoped>
.btn-scheme {
  background: #073b4c;
  color: white;
}
</style>
