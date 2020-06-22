<template>
  <div class="Home">
    <div class="flex mb-6">
      <div class="w-2/3">
        <HereMap />
      </div>
      <div class="w-1/3">
        <!-- <a v-if="loginShow" href="#" @click="toggleForm()">Don't have an account yet? click to <strong>REGISTER</strong></a>
        <a v-if="!loginShow" href="#" @click="toggleForm()">Already have an account? click to <strong>LOGIN</strong></a> -->
        <button class="mb-2" v-if="loginShow" href="#" @click="toggleForm()">Don't have an account yet? click to <strong>REGISTER</strong></button>
        <button class="mb-2" v-if="!loginShow" href="#" @click="toggleForm()">Already have an account? click to <strong>LOGIN</strong></button>

          <Login v-if="loginShow"/>

          <register v-if="!loginShow"/>

      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import register from '@/components/register.vue';
import HereMap from "@/components/hereMap.vue";
import Login from "@/components/login.vue";

export default {
  name: 'Home',
  components: {
    register,
    HereMap,
    Login
  },
  data() {
    return {
      loginShow: true
    }
  },
  methods:{
    toggleForm() {
      this.loginShow = !this.loginShow;
    }
  }
}
</script>

<style>

</style>