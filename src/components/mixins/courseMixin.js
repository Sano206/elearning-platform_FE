import axios from "axios";

export const singleCourseMixin = {
  methods: {
    fetchDetail() {
      axios
        .get("/courses/" + this.$route.params.courseId)
        .then((response) => (this.course = response.data))
        .catch((error) => console.log(error));
    },
  },

  mounted() {
    this.fetchDetail();
  },
};

export const enrollmentsMixin = {
  data() {
    return {
      enrollments: [],
    };
  },

  methods: {
    getEnrolledCourses() {
      axios({
        url: "/enrollments",
        method: "get",
      })
        .then((response) => (this.enrollments = response.data))
        .catch((error) => console.log(error));
    },
  },

  mounted() {
    if (this.$auth.isAuthenticated) {
      this.getEnrolledCourses();
    }
  },
};

export const enrollCheck = {
  data() {
    return {
      justEnrolled: false,
    };
  },

  computed: {
    isEnrolled() {
      return this.enrollments.some((e) => e.course.id === this.course.id);
    },
  },

  methods: {
    enroll() {
      axios({
        method: "post",
        url: "/enrollments",
        data: {
          courseId: this.course.id,
        },
      })
        .then(() => (this.justEnrolled = true))
        .catch((error) => {
          if (error.response.status === 403) {
            alert(
              "To access the courses, please fill out your user information."
            );
          } else {
            alert(error.response.data.message);
          }
        });
    },
  },
};

export const languages = {
  data() {
    return {
      languages: [],
    };
  },

  methods: {
    fetchLanguages() {
      fetch("languages.json")
        .then((response) => response.json())
        .then((json) => (this.languages = json))
        .catch((error) => console.log(error));
    },
  },

  created() {
    this.fetchLanguages();
  },
};

export const topicsMixin = {
  data() {
    return {
      topics: {
        type: Array,
        default: [],
      },
      course: null,
    };
  },
  methods: {
    getTopics() {
      axios({
        url: "/topics",
        method: "get",
      })
        .then((response) => {
          this.topics = response.data;
        })
        .catch((error) => console.log(error));
    },
  },

  created() {
    this.getTopics();
  },
};
