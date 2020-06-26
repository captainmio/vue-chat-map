<template>
  <form
    autocomplete="off"
    novalidate
    class="md-layout m-0"
    @submit.prevent="submitForm"
  >
    <md-card
      class="center-card md-layout-item md-size-80 md-small-size-900 p-4 mx-auto"
    >
      <md-card-header>
        <div class="md-title font-bold">Login Form</div>
        <div class="title"></div>
      </md-card-header>

      <md-card-content>
        <div class="form">
          <md-field :class="getValidationClass('email')">
            <label>E-mail</label>
            <md-input
              v-model="form.email"
              autofocus
              autocomplete="email"
            ></md-input>
            <span class="md-error" v-if="!$v.form.email.required"
              >Email is required</span
            >
          </md-field>

          <md-field md-has-password :class="getValidationClass('password')">
            <label>Password</label>
            <md-input
              v-model="form.password"
              type="password"
              autocomplete="password"
            ></md-input>
            <span class="md-error" v-if="!$v.form.password.required"
              >Password is required</span
            >
          </md-field>
        </div>

        <div class="actions md-layout md-alignment-center-space-between">
          <md-button class="md-raised md-primary" type="submit"
            >Log in</md-button
          >
        </div>

        <div class="loading-overlay" v-if="loading">
          <md-progress-spinner
            md-mode="indeterminate"
            :md-stroke="2"
          ></md-progress-spinner>
        </div>
      </md-card-content>
    </md-card>
    <md-snackbar :md-active.sync="loginAuth">
      {{ message }}
    </md-snackbar>
  </form>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

import router from "../router"; 

export default {
  name: "login",
  mixins: [validationMixin],
  data() {
    return {
      form: {
        email: null,
        password: null,
      },
      loading: false,
      loginAuth: false,
      message: null,
    };
  },
  validations: {
    form: {
      email: {
        required,
      },
      password: {
        required,
      },
    },
  },
  methods: {
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];

      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty,
        };
      }
    },
    submitForm() {
      this.$v.$touch();
      this.loading = true;
      if (!this.$v.$invalid) {
        this.loginUser();
      } else {
        this.closeLoading();
      }
    },
    loginUser() {
      this.$store
        .dispatch("login", {
          email_address: this.form.email,
          password: this.form.password,
        })
        .then((data) => {
          if (data == "success") {
            router.push('Dashboard');          
            this.closeLoading();
          } else {
            this.snackBarPop("error", data);          
            this.closeLoading();
          }

        })
        .catch((error) => {
          this.snackBarPop("error", error);
          this.closeLoading();
        });
    },
    snackBarPop(messageType, message) {
      window.setTimeout(() => {
        this.message = message;
        this.loginAuth = true;
        this.sending = false;
        if (messageType == "success") {
          this.clearForm();
        }
      }, 100);
    },
    closeLoading() {   
        this.loading = false;
    }
  },
};
</script>

<style lang="scss" scoped>
.centered-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 100vh;
  .title {
    text-align: center;
    margin-bottom: 30px;
    img {
      margin-bottom: 16px;
      max-width: 80px;
    }
  }
  .actions {
    .md-button {
      margin: 0;
    }
  }
  .form {
    margin-bottom: 60px;
  }

  .md-content {
    z-index: 1;
    padding: 40px;
    width: 100%;
    max-width: 400px;
    position: relative;
  }
  .loading-overlay {
    z-index: 10;
    top: 0;
    left: 0;
    right: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.md-error {
  // opacity: 1 !important;
  margin-top: 15px !important;
  color: red !important;
}

// https://codesource.io/build-a-chat-app-with-vuejs-and-firebase-realtime-database/
// https://www.djamware.com/post/5d63586ee8e5fff670f31169/vuejs-tutorial-building-firebase-realtime-chat-web-app
// https://www.npmjs.com/package/vue-chat-scroll
</style>

