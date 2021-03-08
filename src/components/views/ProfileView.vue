<template>
  <div>
    <div>
      <img :src="$auth.user.picture">
      <h2>{{ $auth.user.name }}</h2>
      <p>{{ $auth.user.email }}</p>
    </div>

    <div>
      <pre>{{ JSON.stringify($auth.user, null, 2) }}</pre>
    </div>

    <create-user-form></create-user-form>

  </div>
</template>

<script>
import UserCard from "@/components/UserCard";
import CreateUserForm from "@/components/form/CreateUserForm";

export default {
  name: "ProfileView",
  components: {CreateUserForm, UserCard},
  data() {
    return {
      user:null,
    }
  }
}
</script>

<style scoped>

</style>