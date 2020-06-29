<template>
  <div>
    Sign In Users
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import firebase from "@/firebaseConfig";
const db = firebase;

export default {
  name: "signInUsers",
  computed: {
    ...mapGetters({
      user: "user",
    }),
  },
  mounted() {
    var self = this;

    // Monitor connection state on browser tab
    db.database()
      .ref(".info/connected")
      .on("value", function(snap) {
        if (snap.val()) {
          // if we lose network then remove this user from the list
          self.$store.dispatch("loggedMeIn", self.user.data.id);
        } else {
          // client has lost network
          self.$store.dispatch("loggedMeOut", self.user.data.id);
        }
      });


      db.database()
      .ref(".info/connected").on("child_added", function () {
        console.log('added');
      });
      
      // update the UI to show that a user has left (gone offline)
      db.database()
      .ref(".info/connected").on("child_removed", function() {
        console.log('removed');
      });
      
      // update the UI to show that a user's status has changed
      db.database()
      .ref(".info/connected").on("child_changed", function() {
        console.log('changed');
      });
  },
};
</script>

<style></style>
