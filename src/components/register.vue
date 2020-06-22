<template>
  <div class="flex mb-6">
    <div class="w-1/2">
      <HereMap />
    </div>
    <div class="w-1/2">
      <form
        autocomplete="off"
        novalidate
        class="md-layout m-0"
        @submit.prevent="validateForm"
      >
        <md-card
          class="center-card md-layout-item md-size-50 md-small-size-100"
        >
          <md-card-header>
            <div class="md-title font-bold">Register User</div>
          </md-card-header>

          <md-card-content>
            <div class="md-layout md-gutter">
              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('firstName')">
                  <label for="first-name">First Name</label>
                  <md-input
                    name="first-name"
                    id="first-name"
                    autocomplete="given-name"
                    v-model="form.firstName"
                    :disabled="sending"
                    @keypress="alphaOnly($event)"
                  />
                  <span class="md-error" v-if="!$v.form.firstName.required"
                    >The first name is required</span
                  >
                  <span
                    class="md-error"
                    v-else-if="!$v.form.firstName.minlength"
                    >Invalid first name</span
                  >
                </md-field>
              </div>

              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('lastName')">
                  <label for="last-name">Last Name</label>
                  <md-input
                    name="last-name"
                    id="last-name"
                    autocomplete="family-name"
                    v-model="form.lastName"
                    :disabled="sending"
                    @keypress="alphaOnly($event)"
                  />
                  <span class="md-error" v-if="!$v.form.lastName.required"
                    >The last name is required</span
                  >
                  <span class="md-error" v-else-if="!$v.form.lastName.minlength"
                    >Invalid last name</span
                  >
                </md-field>
              </div>
            </div>

            <div class="md-layout md-gutter">
              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('gender')">
                  <label for="gender">Gender</label>
                  <md-select
                    name="gender"
                    id="gender"
                    v-model="form.gender"
                    md-dense
                    :disabled="sending"
                  >
                    <md-option disabled></md-option>
                    <md-option value="Male">Male</md-option>
                    <md-option value="Female">Female</md-option>
                  </md-select>
                  <span class="md-error">The gender is required</span>
                </md-field>
              </div>

              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('age')">
                  <label for="age">Age</label>
                  <md-input
                    type="text"
                    id="age"
                    name="age"
                    autocomplete="age"
                    v-model="form.age"
                    maxlength="2"
                    :disabled="sending"
                    @keypress="isNumber($event)"
                  />
                  <span class="md-error" v-if="!$v.form.age.required"
                    >The age is required</span
                  >
                  <span class="md-error" v-else-if="!$v.form.age.maxlength"
                    >Invalid age</span
                  >
                </md-field>
              </div>
            </div>

            <md-field :class="getValidationClass('email')">
              <label for="email">Email</label>
              <md-input
                type="email"
                name="email"
                id="email"
                autocomplete="email"
                v-model="form.email"
                :disabled="sending"
              />
              <span class="md-error" v-if="!$v.form.email.required"
                >The email is required</span
              >
              <span class="md-error" v-else-if="!$v.form.email.email"
                >Invalid email</span
              >
            </md-field>

            <md-field
              :class="getValidationClass('password')"
              :md-toggle-password="false"
            >
              <label>Password</label>
              <md-input
                v-model="form.password"
                type="password"
                name="password"
                id="password"
                autocomplete="password"
                ref="password"
              ></md-input>
              <span class="md-error" v-if="!$v.form.password.required"
                >The password is required</span
              >
            </md-field>

            <md-field
              :class="getValidationClass('confirmPassword')"
              :md-toggle-password="false"
            >
              <label>Confirm Password</label>
              <md-input
                v-model="form.confirmPassword"
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                autocomplete="confirmPassword"
              ></md-input>
              <span class="md-error" v-if="!$v.form.confirmPassword.required"
                >The Confirm Password is required</span
              >
              <span
                class="md-error"
                v-if="!$v.form.confirmPassword.sameAsPassword"
                >password doesn't match</span
              >
            </md-field>
          </md-card-content>

          <md-progress-bar md-mode="indeterminate" v-if="sending" />

          <md-card-actions>
            <md-button type="submit" class="md-primary" :disabled="sending"
              >Create user</md-button
            >
          </md-card-actions>
        </md-card>

        <md-snackbar :md-active.sync="userSaved">
          {{ message }}
        </md-snackbar>
      </form>
    </div>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import {
  required,
  email,
  minLength,
  maxLength,
  sameAs,
} from "vuelidate/lib/validators";

import HereMap from "@/components/hereMap.vue"

export default {
  name: "register",
  mixins: [validationMixin],
  components: {
      HereMap
  },
  data: () => ({
    form: {
      firstName: null,
      lastName: null,
      gender: null,
      age: null,
      email: null,
      password: null,
      confirmPassword: null,
    },
    userSaved: false,
    sending: false,
    lastUser: null,
    message: "",
  }),
  validations: {
    form: {
      firstName: {
        required,
        minLength: minLength(3),
      },
      lastName: {
        required,
        minLength: minLength(3),
      },
      age: {
        required,
        maxLength: maxLength(3),
      },
      gender: {
        required,
      },
      email: {
        required,
        email,
      },
      password: {
        required,
      },
      confirmPassword: {
        required,
        sameAsPassword: sameAs("password"),
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
    clearForm() {
      this.$v.$reset();
      this.form.firstName = null;
      this.form.lastName = null;
      this.form.age = null;
      this.form.gender = null;
      this.form.email = null;
      this.form.password = null;
      this.form.confirmPassword = null;
    },
    validateForm() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.registerUser();
      }
    },
    isNumber: function(evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    alphaOnly(event) {
      var inputValue = event.which ? event.which : event.keyCode;
      if(!(inputValue >= 65 && inputValue <= 120) && (inputValue != 32 && inputValue != 0)) { 
          event.preventDefault(); 
      }
    },
    registerUser() {
      this.sending = true;
      this.$store
        .dispatch("register", {
          first_name: this.form.firstName,
          last_name: this.form.lastName,
          age: this.form.age,
          gender: this.form.gender,
          email_address: this.form.email,
          password: this.form.password,
        })
        .then((data) => {
          console.log(data);
          if (data == 'success') {
            this.snackBarPop(
              "success",
              "The user " +
                this.form.firstName +
                " " +
                this.form.lastName +
                " was saved with success!"
            );
          } else {
            this.snackBarPop("error", data);
          }
        })
        .catch((error) => {
          this.snackBarPop("error", error);
        });
    },
    snackBarPop(messageType, message) {
      window.setTimeout(() => {
        this.message = message;
        this.userSaved = true;
        this.sending = false;
        if (messageType == "success") {
          this.clearForm();
        }
      }, 1500);
    },
  },
};
</script>

<style lang="scss" scoped>
.md-progress-bar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}

.center-card {
  margin: 0 auto;
}
</style>
