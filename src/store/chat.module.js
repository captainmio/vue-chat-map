import firebase from "@/firebaseConfig";
const db = firebase;

const state = {
    groupChatConversation: {}
};

const actions = {

  newMessage(context, payload) {
    // create a data (Message) to groupchat collection
    return new Promise((resolve, reject) => {
      // didn't use firestore on this part as i need a real time database result so i used firebase Realtime Database
      db.database()
        .ref("groupchat")
        .push({
              sendDate: Date(), ...payload
            })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err.message);
        });
    });
  },
};

const mutations = {
    SET_GROUPCHAT_CONVERSATION(state, value) {
        state.groupChatConversation = value;
    }
};

const getters = {
  groupChatConversation(state) {
    return state.groupChatConversation;
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
};
