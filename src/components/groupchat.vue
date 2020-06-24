<template>
  <div>
    <h2>Group Chat</h2>
    <div class="chat_box">
      <div class="chat_messages">
        <div class="font-sans flex text-left bg-blue-darker w-full py-8">
          <div class="overflow-hidden bg-white roundeds w-full leading-normal">
            <div class="block group hover:bg-blue p-4 border-b">
              <div class="flex">
                <div class="w-10 h-10 relative mb-4">
                  <div
                    class="group w-full h-full rounded-full overflow-hidden shadow-inner text-center bg-purple table cursor-pointer"
                  >
                    <span
                      class="hidden group-hover:table-cell text-white font-bold align-middle"
                      >KR</span
                    >
                    <img
                      src="https://pickaface.net/gallery/avatar/unr_random_180410_1905_z1exb.png"
                      alt="lovely avatar"
                      class="object-cover object-center w-full h-full visible group-hover:hidden"
                    />
                  </div>
                </div>
                <p
                  class="pl-4 pt-2 font-bold text-lg mb-1 text-black group-hover:text-white"
                >
                  Create from scratch
                </p>
              </div>

              <p class="chattext text-grey-darker mb-2 group-hover:text-white">
                Sunt exercitation sint reprehenderit enim pariatur nostrud
                commodo do cillum. Nulla sunt Lorem tempor incididunt
                exercitation anim eu ea esse cupidatat laborum Lorem velit
                mollit. Eiusmod cillum eiusmod tempor ullamco. Velit esse duis
                laboris officia esse eu reprehenderit dolor adipisicing nostrud
                nisi.
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
        <textarea
          class="resize-none w-full h-100 p-2 bg-gray-200 rounded-md"
          placeholder="Send a message . . ."
          v-model="message"
        autocomplete="message"
        >
        </textarea>
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

export default {
  name: "groupchat",
  data() {
    return {
      message: null,
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
      if(this.message) {
        this.$store.dispatch("newMessage", { message: this.message }).then(() => {
            this.message = null;
        });
      }
    },
  },
  created() {
      this.$store.dispatch('groupChatConversation');
  }
};
</script>

<style lang="scss" scoped>
h2 {
  font-size: 30px;
  font-weight: bold;
  margin-top: 30px;
}

.chattext {
  margin-left: 57px;
  margin-top: -10px;
  font-size: 16px;
}

textarea {
  font-size: 16px;
}

.submitBtn {
  margin-left: auto !important;
  display: block;
}
</style>
