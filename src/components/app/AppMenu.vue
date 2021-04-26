<template>
  <div>
    <app-menu-item name="Overview"/>
    <app-menu-item name="Resources"/>
    <app-menu-item name="Whatever"/>
  </div>
</template>

<script>
import AppMenuItem from "@/components/app/AppMenuItem";
export default {
  name: "AppMenu",
  components: {AppMenuItem}
}
</script>

<style scoped>

li{
  display: inline;
  padding: 15px;
  font-size: 30px;
  float: left;
}


</style>
