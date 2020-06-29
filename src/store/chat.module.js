import firebase from "@/firebaseConfig";
const db = firebase;

const state = {
  onlineUsers: {}
};

const actions = {
  allUsers() {


    const ref = db
        .firestore()
        .collection("users")
        var user = [];
        ref.onSnapshot(snapshot => {
          // pull all groupchat conversations
          snapshot.docChanges().forEach((doc) => {
  
            let singleUser = {...doc.doc.data(), id: doc.id};
            user.push(singleUser);
  
          }); 
        });
        return user;

  },
  allConversations() {
    const ref = db.firestore().collection('groupchat');
      var messages = [];
      ref.onSnapshot(snapshot => {
        // pull all groupchat conversations
        snapshot.docChanges().forEach((key) => {

          let buildMessage = key.doc.data();
          messages.push(buildMessage);

        }); 
      });
      return messages;

  },
  currentLoggedInUsers() {
    return 1;
    // db.auth().onAuthStateChanged(function(user) {
    //   if (user) {
    //     console.log(user);
    //   } else {
    //     console.log('no user');
    //   }
    // });

    // db.auth().onAuthStateChanged((user) => {
    //   if (user) {
    //     console.log(user.uid);
    //   } else {
    //     console.log('a user just logeed-out');
    //   }
    // });
    
  },
  newMessage(context, payload) {
    return new Promise((resolve, reject) => {
      db
        .firestore()
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

};

const getters = {

};

export default {
  state,
  getters,
  actions,
  mutations,
};
