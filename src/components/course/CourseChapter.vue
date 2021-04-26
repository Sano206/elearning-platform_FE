<template>
  <div>
    <div v-if="!chapterEdited">
      <div class="d-flex flex-row no-gutters">
        <h3 class="header p-2">{{ localChapter.chapterTitle }}</h3>
        <button class="btn px-4 mt-auto ml-auto btn-scheme" v-if="isInstructor" @click="chapterEdited = true">Edit</button>
      </div>

      <div v-html="localChapter.description"></div>
      <content-video :video-source="localChapter.content"/>
    </div>
    <div v-else>

      <div class="form-group">
        <label for="title" class="form-label">Title:</label>
        <input type="text" class="form-control" id="title" v-model="localChapter.chapterTitle">
      </div>

      <div class="form-group">
        <label for="description" class="form-label">Description:</label>
        <textarea rows="10" type="text" class="form-control" id="description" v-model="localChapter.description"/>
      </div>

      <div class="form-group">
        <label for="content" class="form-label">Content:</label>
        <input type="text" class="form-control" id="content" v-model="localChapter.content">
      </div>

      <button class="btn m-1 btn-dark" @click="updateChapter">Update</button>
      <button class="btn m-1 btn-danger" @click="chapterEdited = false">Cancel</button>

    </div>

  </div>
</template>

<script>
import ContentVideo from "@/components/app/ContentVideo";
import {tokenMixin} from "@/components/mixins/tokenMixin";
import axios from "axios";
export default {
  name: "CourseChapter",
  components: {ContentVideo},
  props:{
    chapter: null,
  },

  mixins: [tokenMixin],


  data(){
    return{
      chapterEdited:false,
      localChapter: null,
    }
  },

  created(){
    this.init();
  },

  methods:{
    init(){
      this.localChapter = JSON.parse(JSON.stringify(this.chapter));
    },

    updateChapter() {
      axios.put('/chapters/' + this.localChapter.id, {
        chapterTitle: this.localChapter.chapterTitle,
        description: this.localChapter.description,
        content: this.localChapter.content,
      })
          .then((response) => {
            if (response.data === "") {
              alert("Cannot do!")
            } else {
              this.chapterEdited = false;
              this.$emit('chapterUpdated', response)
            }
          })
          .catch(error => console.log(error));

    },
  }
}
</script>

<style scoped>
.btn-scheme {
  background: #073b4c;
  color: white;
}
</style>
