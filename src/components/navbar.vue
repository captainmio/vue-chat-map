<template>
  <nav class="flex items-center justify-between flex-wrap bg-teal-500 p-6">
    <div class="flex items-center flex-shrink-0 text-white mr-6">
      <span class="font-semibold text-xl tracking-tight"
        >Welcome {{ this.user.data.first_name }}</span
      >
    </div>
    <div class="block lg:hidden">
      <button
        class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
        @click="toggleNavButton"
      >
        <svg
          class="fill-current h-3 w-3"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </button>
    </div>
    <div
      id="navigation_bar"
      :class="toggleVal ? '' : 'blockVal'"
      class="w-full flex-grow lg:flex lg:items-center lg:w-auto"
    >
      <div class="text-sm lg:flex-grow">
        <a
          href="#responsive-header"
          class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
        >
          Docs
        </a>
        <a
          href="#responsive-header"
          class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
        >
          Examples
        </a>
        <a
          href="#responsive-header"
          class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white"
        >
          Blog
        </a>
      </div>
      <div>
        <md-dialog-confirm
          :md-active.sync="signOutConfirm"
          md-content="Are you sure you want to sign-out?"
          md-confirm-text="Yes"
          md-cancel-text="No"
          @md-confirm="signOut"
          @md-cancel="signOutCancel"
        />
        <md-button class="md-accent md-raised" @click="signOutConfirm = true"
          >Sign-out</md-button
        >
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
import router from "../router";

export default {
  name: "navbar",
  data: function() {
    return {
      toggleVal: false,
      signOutConfirm: false,
    };
  },
  methods: {
    toggleNavButton() {
      this.toggleVal = !this.toggleVal;
    },
    signOut() {
      this.$store.dispatch("Logout").then(() => {
        router.push("Home");
      });
    },
    signOutCancel() {
      this.signOutConfirm = false;
    },
  },
  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: "user",
    }),
  },
};
</script>

<style lang="scss" scoped>
.md-theme-default {
  nav {
    a {
      color: #fff !important;
      text-decoration: none;
      text-align: left !important;
    }
  }
}

.blockVal {
  @media (max-width: 768px) {
    display: none !important;
  }
}
</style>
