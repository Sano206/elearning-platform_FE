<template>
  <div class="video-wrapper">
    <LazyYoutube
      ref="video"
      :src="videoSource"
      maxWidth="100%"
      :customTitle="title"
    />
  </div>
</template>

<script>
import { LazyYoutube } from "vue-lazytube";
export default {
  name: "ContentVideo",
  components: {
    LazyYoutube,
  },
  props: {
    videoSource: null,
    title: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped>
.video-wrapper {
  position: relative;
  padding-bottom: 56.25%;
  height: 0px;
}

iframe {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
}
</style>
