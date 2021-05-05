<template>
  <div class="col-4 col-md-3 col-lg-3 menu-item">
    <span class="font-weight-normal px-2 pointer">
      {{ name }}
    </span>
  </div>
</template>

<script>
export default {
  name: "AppMenuItem",
  props: {
    name: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped>
span {
  font-size: 35px;
  border-bottom: #118ab2 solid 1px;
}

.pointer {
  cursor: pointer;
  border-radius: 6px;
}

.menu-item:hover {
  background-color: lightgrey;
}
</style>
