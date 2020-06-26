<template>
  <div>
    <h2>Group Chat</h2>
    <div class="chat_box">
      <div class="chat_messages overflow-scroll" v-chat-scroll>
        <div
          class="font-sans flex text-left bg-blue-darker w-full"
          v-for="(chat, index) in groupchat"
          :key="index"
        >
          <div class="bg-white roundeds w-full leading-normal">
            <div class="block group hover:bg-blue p-4 border-b">
              <div class="flex">
                <div class="w-10 h-10 relative mb-4">
                  <div
                    class="group w-full h-full rounded-full shadow-inner text-center bg-purple table cursor-pointer"
                  >
                    <img
                      v-if="chat.gender == 'Male'"
                      src="https://pickaface.net/gallery/avatar/unr_random_180410_1905_z1exb.png"
                      alt="men avatar"
                      class="object-cover object-center w-full h-full visible group-hover:hidden"
                    />
                    <img
                      v-if="chat.gender == 'Female'"
                      src="https://pickaface.net/gallery/avatar/unr_hiiiiiiiiii_200626_2306_9a1ms7.png"
                      alt="women avatar"
                      class="object-cover object-center w-full h-full visible group-hover:hidden"
                    />
                  </div>
                </div>
                <p
                  class="pl-4 pt-2 font-bold text-lg mb-1 text-black group-hover:text-white"
                >
                  {{ chat.first_name }} {{ chat.last_name }}
                </p>
              </div>

              <p class="chattext text-grey-darker mb-2 group-hover:text-white">
                {{ chat.message }}
              </p>
            </div>

            <!-- <a href="#" class="block group hover:bg-blue p-4">
                            <p class="font-bold text-lg mb-1 text-black group-hover:text-white">Fork</p>
                            <p class="text-grey-darker mb-2 group-hover:text-white">Start a project base on the source of an existing one.</p>
                        </a> -->
          </div>
        </div>
      </div>
    </div>
    <div class="userInputBox p-4">
      <form
        autocomplete="off"
        novalidate
        class="md-layout m-0"
        @submit.prevent="submitMessage"
      >
        <input type="text"
          class="resize-none w-full h-100 p-2 bg-gray-200 rounded-md textboxy"
          placeholder="Send a message . . ."
          v-model="message"
          autocomplete="message"
        >
        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded submitBtn mt-2"
        >
          Submit
        </button>
      </form>
    </div>
  </div>
</template>

<script>
// import firebase from "@/firebaseConfig";
import { mapGetters } from "vuex";

import firebase from "@/firebaseConfig";
const db = firebase;

export default {
  name: "groupchat",
  data() {
    return {
      message: null,
      groupchat: [],
    };
  },
  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: "user",
    }),
  },
  methods: {
    submitMessage() {
      if (this.message) {
        this.$store
          .dispatch("newMessage", {
            message: this.message,
            first_name: this.user.data.first_name,
            last_name: this.user.data.last_name,
            id: this.user.data.id,
            gender: this.user.data.gender,
          })
          .then(() => {
            this.message = null;
          });

        this.scrollBottom();
      }
    },
    scrollBottom() {
      // var chatContainer = this.$el.querySelector(".chat_messages");
      // chatContainer.scrollTop = chatContainer.lastElementChild.offsetTop;
    },
  },
  created() {
    var self = this;
    const convo = db.database().ref("groupchat");

    convo.on("value", (snapshot) => {
      var messages = [];
      let data = snapshot.val();
      Object.keys(data).forEach((key) => {
        messages.push(data[key]);
        messages.msg_id = key;
      });

      self.groupchat = messages;
    });
    this.scrollBottom();
  },
};
</script>

<style lang="scss" scoped>
h2 {
  font-size: 30px;
  font-weight: bold;
  margin-top: 30px;
  margin-bottom: 30px;
}

.chattext {
  margin-left: 57px;
  margin-top: -10px;
  font-size: 16px;
}

.textboxy {
  font-size: 16px;
}

.submitBtn {
  margin-left: auto !important;
  display: block;
}

.chat_messages {
  height: 600px;
}
</style>
