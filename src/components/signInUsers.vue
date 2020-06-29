<template>
  <div>
      Sign In Users
  </div>
</template>

<script>
export default {
    name: "signInUsers",
    mounted() {
        this.$store
          .dispatch("currentLoggedInUsers");
    }
}
</script>

<style>

</style>