<template>
  <div>
    <div class="form-group">
      <label for="title" class="form-label">Title:</label>
      <input
        type="text"
        maxlength="255"
        class="form-control"
        id="title"
        v-model="courseTitle"
      />
    </div>

    <div class="form-group">
      <label for="short-description" class="form-label"
        >Short description:</label
      >
      <input
        type="text"
        maxlength="120"
        class="form-control"
        id="short-description"
        v-model="courseShortDescription"
      />
    </div>

    <div class="form-group">
      <label for="description" class="form-label">Description:</label>

      <textarea
        rows="10"
        maxlength="14500"
        type="text"
        class="form-control"
        id="description"
        v-model="courseDescription"
      />
    </div>

    <div class="form-group">
      <label for="language" class="form-label">Topic:</label>
      <select
        class="form-control"
        v-model="courseTopic"
        name="topic"
        id="topic"
      >
        <option
          type="text"
          v-for="(topic, index) in topics"
          :value="topic"
          v-bind:key="index"
        >
          {{ topic }}
        </option>
      </select>
    </div>

    <div class="form-group">
      <label for="thumbnail" class="form-label">Thumbnail:</label>
      <input
        type="text"
        maxlength="255"
        class="form-control"
        id="thumbnail"
        v-model="thumbnail"
      />
    </div>

    <div class="form-group">
      <label for="fee" class="form-label">Fee:</label>
      <input type="number" class="form-control" id="fee" v-model="courseFee" />
    </div>

    <div class="form-group">
      <label for="language" class="form-label">Language:</label>
      <select
        class="form-control"
        v-model="courseLanguage"
        name="language"
        id="language"
      >
        <option
          type="text"
          v-for="(language, index) in languages"
          :value="language.name"
          v-bind:key="index"
        >
          {{ language.name }}
        </option>
      </select>
    </div>

    <button class="btn m-1 btn-scheme" @click="addCourse">Submit</button>
  </div>
</template>

<script>
import axios from "axios";
import { tokenMixin } from "@/components/mixins/tokenMixin";
import { languages, topicsMixin } from "@/components/mixins/courseMixin";

export default {
  name: "CreateCourseForm",
  props: {},

  mixins: [tokenMixin, languages, topicsMixin],

  data() {
    return {
      courseTitle: null,
      courseDescription: null,
      courseShortDescription: null,
      thumbnail: null,
      courseFee: null,
      courseLanguage: null,
      courseTopic: null,
      newCourse: null,
    };
  },

  methods: {
    async addCourse() {
      const token = await this.$auth.getTokenSilently();
      axios({
        url: "/courses",
        method: "post",
        headers: { Authorization: `Bearer ${token}` },
        data: {
          title: this.courseTitle,
          description: this.courseDescription,
          shortDescription: this.courseShortDescription,
          thumbnail: this.thumbnail,
          fee: this.courseFee,
          language: this.courseLanguage,
          topic: this.courseTopic,
        },
      })
        .then((response) => {
          this.$emit("courseCreated", response.data);
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
