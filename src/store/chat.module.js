import firebase from "@/firebaseConfig";
const db = firebase;

const state = {
  onlineUsers: {},
};

const actions = {
  checkChange(context, userId) {

    // Monitor connection state on browser tab
    db.database()
      .ref(".info/connected")
      .on("value", function(snap) {
        if (snap.val()) {
          // if we lose network then remove this user from the list
          context.dispatch("loggedMeIn", userId);
        } else {
          // client has lost network
          context.dispatch("loggedMeOut", userId);
        }
      });


    db.database()
    .ref("status").on("child_added", function () {
      context.dispatch("pullCurrentLoggedInUsers");
      
    });
    
    // update the UI to show that a user has left (gone offline)
    db.database()
    .ref("status").on("child_removed", function() {
      context.dispatch("pullCurrentLoggedInUsers");
    });
    
    // update the UI to show that a user's status has changed
    db.database()
    .ref("status").on("child_changed", function() {
      context.dispatch("pullCurrentLoggedInUsers");
    });
  },
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
  pullCurrentLoggedInUsers(context) {
    db.database().ref('status').on('value', function(snapshot) {
      // if (. == false) {
      //     return;
      // }
      var userList = [];
      snapshot.forEach(function(childSnapshot){
        // console.log(childSnapshot.val());
        if(childSnapshot.val() == "online") {
          userList.push(childSnapshot.key);
        }
      });

      var onlineUsers = [];
      userList.forEach(data => {
        context.dispatch('getUserByID', data, { root: true }).then(data => {
          // console.log(data);
          onlineUsers.push(data);
        });
      });

      context.commit('SET_ONLINE_USERS', onlineUsers);
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

const mutations = {
  SET_ONLINE_USERS(state, value) {
    state.onlineUsers = value;
    console.log(1);
    console.log(state.onlineUsers);
  },
};

const getters = {
  getOnlineUsers(state) {
    return state.onlineUsers;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
