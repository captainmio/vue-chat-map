import firebase from "@/firebaseConfig";
const db = firebase;

const state = {
  onlineUsers: {},
};

const actions = {
  allUsers() {
    const ref = db.firestore().collection("users");
    var user = [];
    ref.onSnapshot((snapshot) => {
      // pull all groupchat conversations
      snapshot.docChanges().forEach((doc) => {
        let singleUser = { ...doc.doc.data(), id: doc.doc.id };
        user.push(singleUser);
      });
    });
    return user;
  },
  allConversations() {
    const ref = db.firestore().collection("groupchat").orderBy("sendDate", "asc");
    var messages = [];
    ref.onSnapshot((snapshot) => {
      // pull all groupchat conversations
      snapshot.docChanges().forEach((key) => {
        let buildMessage = key.doc.data();
        messages.push(buildMessage);
      });
    });
    return messages;
  },
  pullCurrentLoggedInUsers() {
    db.database().ref('status').on('value', function(snapshot) {
      if (snapshot.val() == false) {
          return;
      }
    });
  },
  loggedMeIn(context, userId) {
  
    // setting up online status in realtime-database to make use of onDisconnect
    db.database().ref(`/status/${userId}`).set('online');


  },
  loggedMeOut(context, userId) {

    db.database()
      .ref("/status/" + userId) // Making a reference to a key-value pair in the old real-time database structure
      .onDisconnect() // Setting up the onDisconnect hook
      .set(
        "offline"
      );

  },
  newMessage(context, payload) {
    return new Promise((resolve, reject) => {
      db.firestore()
        .collection("groupchat")
        .add({
          sendDate: Date(),
          ...payload,
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

const mutations = {};

const getters = {};

export default {
  state,
  getters,
  actions,
  mutations,
};
