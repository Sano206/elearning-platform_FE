<template>
  <div v-if="course">
    <div v-if="courseEdited && !newChapter">
      <div class="row">
        <div class="dropdown">
          <button
            class="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenu2"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span class="navbar-toggler-icon">Edit</span>
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
            <button class="dropdown-item" @click="selectCourse" type="button">
              Course
            </button>
            <div v-for="chapter in orderedChapters" :key="chapter.id">
              <button
                class="dropdown-item"
                @click="selectChapter(chapter)"
                type="button"
              >
                {{ chapter.chapterTitle }}
              </button>
            </div>
          </div>
        </div>
        <button
          class="btn m-1 btn-scheme ml-auto align-self-end"
          v-if="isInstructor"
          @click="createChapter"
        >
          Create new Chapter
        </button>
      </div>
      <div v-if="selectedCourse">
        <div class="form-group">
          <label for="title" class="form-label">Title:</label>
          <input
            type="text"
            maxlength="255"
            class="form-control"
            id="title"
            v-model="course.title"
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
            v-model="course.shortDescription"
          />
        </div>

        <div class="form-group">
          <label for="description" class="form-label">Description:</label>

          <textarea
            rows="10"
            type="text"
            class="form-control"
            id="description"
            v-model="course.description"
          />
        </div>

        <div class="form-group">
          <label for="language" class="form-label">Topic:</label>
          <select
            class="form-control"
            v-model="course.topic"
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
            v-model="course.thumbnail"
          />
        </div>

        <div class="form-group">
          <label for="fee" class="form-label">Fee:</label>
          <input
            type="number"
            class="form-control"
            id="fee"
            v-model="course.fee"
          />
        </div>

        <div class="form-group">
          <label for="language" class="form-label">Language:</label>
          <select
            class="form-control"
            v-model="course.language"
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

        <div>
          <button class="btn m-1 btn-dark" @click="updateCourse()">
            Update
          </button>
          <button class="btn m-1 btn-danger" @click="courseEdited = false">
            Cancel
          </button>
        </div>
      </div>

      <!--End of Course Edit-->

      <div v-if="!selectedCourse">
        <div class="course-chapter-wrapper">
          <course-chapter
            :courseChaptersAmount="course.courseChapters.length"
            :chapter="selectedChapter"
            :key="selectedChapter.id"
            @chapterUpdated="chapterUpdated"
          ></course-chapter>
        </div>
      </div>
    </div>

    <div v-else-if="course !== null && !newChapter">
      <course-card-detail />
      <button
        class="btn btn-scheme"
        v-if="isInstructor"
        @click="courseEdited = true"
      >
        Edit
      </button>
    </div>

    <div v-if="newChapter === true" class="row">
      <div class="container">
        <create-chapter-form
          :courseId="course.id"
          :courseChaptersAmount="course.courseChapters.length"
          @chapterCreated="chapterCreated"
        ></create-chapter-form>
        <button class="btn m-1 btn-danger" @click="newChapter = false">
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import CourseChapter from "@/components/course/CourseChapter";
import CreateChapterForm from "@/components/form/CreateChapterForm";
import {
  languages,
  singleCourseMixin,
  topicsMixin,
} from "@/components/mixins/courseMixin";
import { tokenMixin } from "@/components/mixins/tokenMixin";
import CourseCardDetail from "@/components/course/CourseCardDetail";
import _ from "lodash";

export default {
  name: "CourseCardDetailEditable",
  components: {
    CourseCardDetail,
    CourseChapter,
    CreateChapterForm,
  },
  mixins: [singleCourseMixin, tokenMixin, languages, topicsMixin],

  data() {
    return {
      course: null,
      courseEdited: false,
      newChapter: false,
      selectedChapter: {
        type: CourseChapter,
        default: null,
      },
      selectedCourse: {
        type: Boolean,
        default: true,
      },
    };
  },

  computed: {
    orderedChapters() {
      return _.orderBy(this.course.courseChapters, "position");
    },
  },

  watch: {
    $route() {
      this.fetchDetail();
      this.courseEdited = false;
    },
  },
  methods: {
    selectChapter(chapter) {
      this.selectedCourse = false;
      this.selectedChapter = chapter;
    },
    selectCourse() {
      this.selectedCourse = true;
      this.selectedChapter = null;
    },

    checkInstructor() {
      if (this.course.instructor.userID !== this.$auth.user.sub) {
        console.log(this.course.instructor);
        this.$router.push("/courses/" + this.course.id);
      }
    },

    createChapter() {
      this.newChapter = true;
      window.scrollTo(0, 0);
    },

    chapterUpdated() {
      this.fetchDetail();
    },

    updateCourse() {
      axios
        .put("/courses/" + this.course.id, {
          title: this.course.title,
          description: this.course.description,
          shortDescription: this.course.shortDescription,
          thumbnail: this.course.thumbnail,
          fee: this.course.fee,
          language: this.course.language,
          topic: this.course.topic,
        })
        .then((response) => {
          if (response.data === "") {
            alert("Cannot do!");
          } else {
            this.courseEdited = false;
            this.$emit("courseUpdated", response);
          }
        })
        .catch((error) => console.log(error));
    },

    chapterCreated() {
      this.fetchDetail();
      //this.courses.push(event);
      this.newChapter = false;
    },
  },

  updated() {
    this.checkInstructor();
  },
};
</script>

<style scoped>
.btn-scheme {
  background: #073b4c;
  color: white;
}
</style>
