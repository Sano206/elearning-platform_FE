<template>
  <div>
    <div v-if="isLoaded">
      <img :src="$auth.user.picture" />

      <form>
        <div class="form-group">
          <label for="name" class="form-label">Name:</label>
          <input
            type="text"
            class="form-control"
            id="name"
            v-model="authUser.given_name"
          />
        </div>
        <div class="form-group">
          <label for="surname" class="form-label">Surname:</label>
          <input
            type="text"
            class="form-control"
            id="surname"
            v-model="authUser.family_name"
          />
        </div>
        <div class="col-auto" v-if="!isInstructor">
          <button @click="updateUser" class="btn btn-primary mb-3">
            Save user info
          </button>
        </div>

        <div v-if="isInstructor">
          <div class="form-group">
            <label for="introduction" class="form-label">Introduction:</label>
            <textarea
              rows="3"
              class="form-control"
              id="introduction"
              v-model="instructorInfo.introduction"
            ></textarea>
          </div>
          <div class="form-group">
            <label for="qualification" class="form-label">Qualification:</label>
            <textarea
              rows="3"
              class="form-control"
              id="qualification"
              v-model="instructorInfo.qualification"
            ></textarea>
          </div>
          <div class="col-auto">
            <button @click="updateInstructor" class="btn btn-primary mb-3">
              Save user info
            </button>
          </div>
        </div>

        <div class="col-auto" v-if="!isInstructor && !makeInstructor">
          <button
            @click="makeInstructor = !makeInstructor"
            class="btn btn-primary mb-3"
          >
            Make instructor
          </button>
        </div>

        <div v-if="makeInstructor">
          <div class="form-group">
            <label for="newIntroduction" class="form-label"
              >Introduction:</label
            >
            <textarea
              rows="3"
              class="form-control"
              id="newIntroduction"
              v-model="newIntroduction"
            ></textarea>
          </div>
          <div class="form-group">
            <label for="newQualification" class="form-label"
              >Qualification:</label
            >
            <textarea
              rows="3"
              class="form-control"
              id="newQualification"
              v-model="newQualification"
            ></textarea>
          </div>
          <div class="col-auto">
            <button @click="createInstructor" class="btn btn-primary mb-3">
              Create instructor
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { tokenMixin } from "@/components/mixins/tokenMixin";

export default {
  name: "ProfileView",
  data() {
    return {
      authUser: null,
      instructorInfo: null,
      makeInstructor: false,
      newIntroduction: null,
      newQualification: null,
      isLoaded: false,
    };
  },
  mixins: [tokenMixin],

  mounted() {
    this.authUser = this.$auth.user;
    this.fetchInstructorInfo();
  },

  methods: {
    updateUser() {
      axios({
        method: "put",
        url: "/users",
        data: {
          name: this.authUser.given_name,
          surname: this.authUser.family_name,
        },
      }).catch((error) => console.log(error));
    },

    updateInstructor() {
      axios({
        method: "put",
        url: "/instructors",
        data: {
          name: this.authUser.given_name,
          surname: this.authUser.family_name,
          introduction: this.instructorInfo.introduction,
          qualification: this.instructorInfo.qualification,
        },
      })
        .then(() => location.reload())
        .catch((error) => console.log(error));
    },
    createInstructor() {
      axios({
        method: "post",
        url: "/instructors",
        data: {
          name: this.authUser.given_name,
          surname: this.authUser.family_name,
          introduction: this.newIntroduction,
          qualification: this.newQualification,
        },
      })
        .then(() => location.reload())
        .catch((error) => console.log(error));
    },

    async fetchInstructorInfo() {
      await axios
        .get("/instructors")
        .then((response) => {
          if (response.data !== "") {
            this.instructorInfo = response.data;
          }
        })
        .catch((error) => console.log(error));
      this.isLoaded = true;
    },
  },
};
</script>

<style scoped></style>
