<template>
  <div class="course-card-wrapper" @click="showDetail">
    <div class="course-title">
      {{course.title}}
    </div>
    <p class="course-description">
      {{course.description}}
    </p>
  </div>

</template>

<script>
export default {
name: "CourseCard",
  props:{
    course:{
      type: Object,
      default: null,
    }
  },

  methods:{
    showDetail(){
      this.$router.push('/courses/'+this.course.id)
    }
  },


}
</script>

<style scoped>

.course-card-wrapper{
  border: solid black;
  border-radius: 3px;
  display: flex;
  flex-direction: column;

  padding: 16px;
  box-shadow: 0px 5px 10px 0px rgba(0,0,0,0.2);
}

.course-author{
  margin: 8px;
  padding-bottom: 16px;

  color: #FFA69E;
  border-bottom: 1px solid #FFA69E;
}

.course-description {
  display: flex;
  justify-content: center;
  flex-grow: 1;
}

.course-title {
  font-size: large;
}
</style>