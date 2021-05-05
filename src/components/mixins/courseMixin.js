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
      for (let enrollment of this.enrollments) {
        if (enrollment.course.id === this.course.id) {
          return true;
        }
      }
      return false;
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
        .then((response) => {
          if (response.data === "") {
            alert("Already enrolled!");
          }
          this.justEnrolled = true;
        })
        .catch((error) => console.log(error));
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
        url: "/courses/topics",
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
