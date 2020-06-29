<template>
  <div>
    <h2>Sign In Users</h2>
    <ul>
      <li v-for="(user, index) in getOnlineUsers" :key="index">{{ user.first_name }} {{ user.last_name }}</li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "signInUsers",
  computed: {
    ...mapGetters({
      user: "user",
      getOnlineUsers: "getOnlineUsers"
    }),
  },
  created() {

    this.$store.dispatch('checkChange', this.user.data.id);

    // console.log(this.getOnlineUsers);
      
  },
};
</script>

<style lang="scss" scoped>
  h2 {
    margin-top: 20px;
    font-size: 25px;
    margin-bottom: 20px;

  }
</style>
