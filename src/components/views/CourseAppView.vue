<template>
  <div v-if="enrollment">
    <div class="row no-gutters mb-3">
      <div class="col-12 col-md-8 col-lg-9">
        <content-video :videoSource="selectedChapter.content"> </content-video>
      </div>
      <div class="col-12 col-md-4 col-lg-3">
        <sidebar
          :chapters="enrollment.course.courseChapters"
          :progress="enrollment.progress"
          @chapterSelected="chapterSelected"
          @progressChange="updateProgressManually"
        />
      </div>
    </div>
    <div>
      <app-menu class="row mb-3" />
      <h2 class="row mb-2">{{ selectedChapter.chapterTitle }}</h2>
      <div class="description" v-html="selectedChapter.description"></div>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/app/Sidebar";
import AppMenu from "@/components/app/AppMenu";
import ContentVideo from "@/components/app/ContentVideo";
import { singleCourseMixin } from "@/components/mixins/courseMixin";
import axios from "axios";
import { tokenMixin } from "@/components/mixins/tokenMixin";

export default {
  name: "CourseAppView",
  components: { ContentVideo, AppMenu, Sidebar },
  mixins: [tokenMixin],

  data() {
    return {
      enrollment: null,
      selectedChapter: {
        type: Object,
        default: null,
      },
    };
  },

  methods: {
    chapterSelected(event) {
      this.selectedChapter = event;
      this.updateProgress();
    },

    getEnrolledCourses() {
      axios({
        url: "/enrollments/" + this.$route.params.courseId,
        method: "get",
      })
        .then((response) => (this.enrollment = response.data))
        .catch((error) => console.log(error));
    },

    updateProgress() {
      axios({
        url:
          "/enrollments/" +
          this.enrollment.course.id +
          "/" +
          this.selectedChapter.id,
        method: "put",
        data: {
          value: true,
        },
      })
        .then((response) => console.log(response.data))
        .catch((error) => console.log(error));
    },
    updateProgressManually(value, chapter) {
      axios({
        url: "/enrollments/" + this.enrollment.course.id + "/" + chapter,
        method: "put",
        data: {
          value: value,
        },
      })
        .then((response) => console.log(response.data))
        .catch((error) => console.log(error));
    },
  },

  mounted() {
    this.getEnrolledCourses();
  },
};
</script>

<style scoped>
</style>
