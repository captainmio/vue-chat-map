import firebase from "@/firebaseConfig";
const db = firebase;

const state = {
    groupChatConversation: {}
};

const actions = {
  groupChatConversation(context) {
    // pull all group chat conversation to
    return db
      .firestore()
      .collection("groupchat")
      .get()
      .then(function(querySnapshot) {
        var value_all = [];
        querySnapshot.forEach(function(doc) {
          if (doc.id) {
            value_all.push(doc.data());
          }
        });
        context.commit('SET_GROUPCHAT_CONVERSATION', value_all);
      })
      .catch(() => {
        console.log(
          "Error occured when trying to fetch Group Chat conversation"
        );
      });
  },
  newMessage(context, payload) {
    // create a data (Message) to groupchat collection
    return new Promise((resolve, reject) => {
      db.firestore()
        .collection("groupchat")
        .add({
          user: "Waelhi",
          message: payload.message,
          sendDate: Date(),
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

const getters = {};

export default {
  state,
  getters,
  actions,
  mutations,
};
